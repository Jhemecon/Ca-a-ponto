"""Extrai trechos candidatos do acervo, valida (sem o símbolo tem que dar erro) e seleciona os melhores.
Uso: ACERVO=/caminho/do/acervo python3 gerar_trechos.py [semente] [trechos por grupo]"""
import difflib, os, re, ast, io, tokenize, json, random, hashlib, textwrap, sys
import tree_sitter as ts, tree_sitter_c as tc, tree_sitter_java as tj

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.environ.get('ACERVO', 'acervo')  # pasta com os códigos-fonte (.c, .java, .py)
EXCLUIR = ('ciesa-turma-python', 'HelpDesk-Pro', 'CIESASOLUTIONS', 'YOLO', 'Álgebra Linear I', '.git', '.idea')
PARSERS = {'c': ts.Parser(ts.Language(tc.language())), 'java': ts.Parser(ts.Language(tj.language()))}
PROIBIDO = re.compile(r'senha|password|token|api[_-]?key|secret|@|https?://|cpf|telefone|e-?mail|whatsapp|jhem|conde|souza|jo[aã]o|matr[ií]cula|cv2', re.I)
FASES = {  # nome: (tamanhos, máx. de caracteres por linha, profundidade mínima)
    'facil': ((4, 5), 46, 0),
    'medio': ((8, 9, 10), 52, 1),
    'dificil': ((11, 12), 62, 2),
}
SEMENTE = int(sys.argv[1]) if len(sys.argv) > 1 else 42
POR_GRUPO = int(sys.argv[2]) if len(sys.argv) > 2 else 6
rnd = random.Random(SEMENTE)


def sem_comentarios_c(t):
    out, i, n, estado = [], 0, len(t), None
    while i < n:
        c = t[i]; d = t[i + 1] if i + 1 < n else ''
        if estado is None:
            if c == '/' and d == '/':
                while i < n and t[i] != '\n': i += 1
                continue
            if c == '/' and d == '*': estado = 'bloco'; i += 2; continue
            if c in '"\'': estado = c
            out.append(c); i += 1
        elif estado == 'bloco':
            if c == '*' and d == '/': estado = None; i += 2
            else:
                if c == '\n': out.append('\n')
                i += 1
        else:
            out.append(c)
            if c == '\\': out.append(d); i += 2; continue
            if c == estado or c == '\n': estado = None
            i += 1
    return ''.join(out)


def sem_comentarios_py(t):
    linhas = t.split('\n')
    for tok in tokenize.generate_tokens(io.StringIO(t).readline):
        if tok.type == tokenize.COMMENT:
            r, c = tok.start; linhas[r - 1] = linhas[r - 1][:c]
    return '\n'.join(linhas)


def limpar(texto, lang):
    texto = texto.replace('\r\n', '\n').replace('\r', '\n')
    texto = sem_comentarios_py(texto) if lang == 'py' else sem_comentarios_c(texto)
    global NUMS
    pares = [(l.expandtabs(4).rstrip(), n + 1) for n, l in enumerate(texto.split('\n'))]
    pares = [p for p in pares if p[0].strip()]
    NUMS = [n for _, n in pares]
    return [l for l, _ in pares]


def tira_strings(s):
    return re.sub(r'"(\\.|[^"\\])*"|\'(\\.|[^\'\\])*\'', '""', s)


def linha_ok_c(l):
    s = l.strip()
    if s.startswith('#'): return True
    t = tira_strings(s)
    if t.count('(') != t.count(')'): return False
    if s.endswith((';', '{', '}')): return True
    if s.endswith(':') and re.match(r'(case\b|default\b)', s): return True
    if s == 'else': return True
    if s.endswith(')') and re.match(r'(if|for|while|switch|else if)\b', s): return True
    if s.endswith(')') and re.match(r'[\w\s\*\[\]<>]+\(', s): return True
    return False


def tem_erro(lang, texto):
    if lang == 'py':
        try: ast.parse(texto); return False
        except Exception: return True
    return PARSERS[lang].parse(texto.encode()).root_node.has_error


def marcadores(lang, linhas):
    """índices das linhas em que remover o símbolo gera erro no arquivo inteiro"""
    validos = []
    for k, l in enumerate(linhas):
        s = l.strip()
        if lang == 'py':
            if not re.match(r'(if|elif|else|for|while|def|class|try|except|finally|with)\b.*:$', s): continue
            novo = l[:-1]
        else:
            if not s.endswith(';') or s.startswith(('}', 'for', '#')) or tira_strings(s).count(';') != 1: continue
            novo = l[:-1]
        if tem_erro(lang, '\n'.join(linhas[:k] + [novo] + linhas[k + 1:])): validos.append(k)
    return validos


def candidatos_arquivo(caminho, lang):
    try:
        bruto = open(caminho, encoding='utf-8').read()
        linhas = limpar(bruto, lang)
    except Exception:
        return []
    if len(linhas) < 4 or '\ufffd' in '\n'.join(linhas): return []
    if tem_erro(lang, '\n'.join(linhas)): return []
    mk = set(marcadores(lang, linhas))
    if not mk: return []
    saida = []
    for fase, (tamanhos, maxcol, prof_min) in FASES.items():
        for tam in tamanhos:
            for ini in range(0, len(linhas) - tam + 1):
                jan = linhas[ini:ini + tam]
                rec = min(len(l) - len(l.lstrip()) for l in jan)
                jan = [l[rec:] for l in jan]
                if PROIBIDO.search('\n'.join(jan)) or jan[0].strip() == '{': continue
                if any(len(l) > maxcol for l in jan): continue
                if '"""' in '\n'.join(jan) or "'''" in '\n'.join(jan): continue
                alvos = [k for k in range(ini, ini + tam) if k in mk]
                if not alvos: continue
                if lang == 'py':
                    base = min(len(l) - len(l.lstrip()) for l in jan)
                    if len(jan[0]) - len(jan[0].lstrip()) != base: continue
                    try: ast.parse(textwrap.dedent('\n'.join(jan)))
                    except Exception: continue
                    prof = max((len(l) - len(l.lstrip()) - base) // 4 for l in jan)
                    if any(l.count('(') != l.count(')') for l in jan): continue
                else:
                    if re.match(r'\s*(else|case|default)\b', jan[0]): continue
                    ul = jan[-1].strip()
                    if re.match(r'(if|for|while|else)\b', ul) and not ul.endswith(('{', ';', '}')): continue
                    n, ok, prof, bal = 0, True, 0, 0
                    for l in jan:
                        t = tira_strings(l)
                        bal += t.count('{') - t.count('}')
                        if bal < 0: ok = False; break
                        prof = max(prof, bal)
                    if not ok or bal != 0: continue
                    outros = [l for k, l in enumerate(jan, ini) if k not in alvos or True]
                    if not all(linha_ok_c(l) or (ini + i in mk) for i, l in enumerate(jan)): continue
                if prof < prof_min: continue
                tipos = {l.split()[0] if l.split() else '' for l in jan}
                io_ = sum(bool(re.search(r'printf|scanf|System\.out|input\(|print\(|Scanner', l)) for l in jan)
                if io_ > tam * (0.8 if lang == 'java' else 0.5): continue
                pont = len(tipos) / tam + 0.15 * prof - 0.3 * io_ / tam + rnd.random() * 0.5
                if re.match(r'(def |class |public |static |void |int |float |double |char |if |for |while |typedef|#include|package)', jan[0]): pont += 0.6
                alvo = rnd.choice([k for k in alvos if k != ini] or alvos)
                saida.append(dict(lang=lang, fase=fase, arquivo=os.path.relpath(caminho, RAIZ), ini=ini, tam=tam,
                                  alvo=alvo - ini, linhas=jan, ln=[NUMS[ini], NUMS[ini + tam - 1]], pont=pont))
    return saida


REJEITAR = ('Estações', 'Gasto', 'Busca Binária')
TARGETS = {
    'facil': {'c': 20, 'java': 20, 'py': 20},
    'medio': {'c': 20, 'java': 20, 'py': 20},
    'dificil': {'c': 20, 'java': 20, 'py': 20},
}


PALAVRAS = ('for','if','else','while','return','def','int','float','void','public','class','do','break','continue','print','range','true','false')


def estrutura(c):
    t = re.sub(r'"[^"]*"', '""', '\n'.join(c['linhas']).lower())
    t = re.sub(r'[a-zà-ÿ_]\w*', lambda m: m.group(0) if m.group(0) in PALAVRAS else 'x', t)
    return re.sub(r'\d+', '0', t)


def parecido(c, u):
    if c['lang'] != u['lang']: return False
    bruto = lambda x: re.sub(r'\d+', '0', '\n'.join(x['linhas']).lower())
    return (difflib.SequenceMatcher(None, bruto(c), bruto(u)).ratio() > 0.5
            or difflib.SequenceMatcher(None, estrutura(c), estrutura(u)).ratio() > 0.8)


def carregar_selecionados_anteriores():
    caminho = os.path.join(AQUI, 'dados', 'selecionados.json')
    if not os.path.exists(caminho):
        return []
    try:
        with open(caminho, encoding='utf-8') as f:
            dados = json.load(f)
        return dados if isinstance(dados, list) else []
    except Exception:
        return []


def main():
    todos = []
    uso = {}
    for pasta, dirs, arqs in os.walk(RAIZ):
        dirs[:] = [d for d in dirs if d not in EXCLUIR]
        for a in arqs:
            ext = a.rsplit('.', 1)[-1].lower()
            lang = {'c': 'c', 'java': 'java', 'py': 'py'}.get(ext)
            if lang: todos += candidatos_arquivo(os.path.join(pasta, a), lang)
    print('arquivos com candidatos:', {(l, f): len({c['arquivo'] for c in todos if c['lang'] == l and c['fase'] == f}) for l in ('c', 'java', 'py') for f in FASES})
    escolhidos = []
    for lang in ('c', 'java', 'py'):
        for fase in ('dificil', 'medio', 'facil'):
            grupo = sorted([c for c in todos if c['lang'] == lang and c['fase'] == fase], key=lambda c: -c['pont'])
            usados, por_arq, vistos = [], {}, set()
            for c in grupo:
                if len(usados) >= POR_GRUPO: break
                chave = hashlib.md5('\n'.join(c['linhas'][:3]).encode()).hexdigest()
                if chave in vistos or por_arq.get(c['arquivo'], 0) >= 2 or uso.get(c['arquivo'], 0) >= (3 if lang == 'java' else 1) or any(r in c['arquivo'] for r in REJEITAR): continue
                if any(u['arquivo'] == c['arquivo'] and not (c['ini'] + c['tam'] <= u['ini'] or u['ini'] + u['tam'] <= c['ini']) for u in escolhidos + usados): continue
                if any(parecido(c, u) for u in escolhidos + usados): continue
                uso[c['arquivo']] = uso.get(c['arquivo'], 0) + 1; vistos.add(chave); por_arq[c['arquivo']] = por_arq.get(c['arquivo'], 0) + 1; usados.append(c)
            escolhidos += usados

    anteriores = carregar_selecionados_anteriores()
    existente = {}
    for item in anteriores:
        chave = (
            item.get('lang'),
            item.get('fase'),
            item.get('arquivo'),
            item.get('ini'),
            item.get('tam'),
            item.get('alvo'),
            tuple(item.get('linhas', [])),
        )
        existente[chave] = item
    for item in escolhidos:
        chave = (
            item.get('lang'),
            item.get('fase'),
            item.get('arquivo'),
            item.get('ini'),
            item.get('tam'),
            item.get('alvo'),
            tuple(item.get('linhas', [])),
        )
        existente.setdefault(chave, item)

    final = list(existente.values())
    por_grupo = {}
    for item in final:
        key = (item.get('lang'), item.get('fase'))
        por_grupo.setdefault(key, []).append(item)

    for lang in ('c', 'java', 'py'):
        for fase in ('facil', 'medio', 'dificil'):
            chave = (lang, fase)
            alvo = TARGETS[fase].get(lang, 20)
            grupo = por_grupo.get(chave, [])
            if len(grupo) >= alvo:
                por_grupo[chave] = sorted(grupo, key=lambda x: (x.get('pont', 0), x.get('arquivo', '')), reverse=True)[:alvo]
                continue
            candidatos = sorted(
                [c for c in todos if c['lang'] == lang and c['fase'] == fase and not any(
                    (c['lang'], c['fase'], c['arquivo'], c['ini'], c['tam'], c['alvo'], tuple(c['linhas'])) == (
                        item.get('lang'), item.get('fase'), item.get('arquivo'), item.get('ini'), item.get('tam'), item.get('alvo'), tuple(item.get('linhas', []))
                    ) for item in final
                )],
                key=lambda c: c['pont'],
                reverse=True,
            )
            usados = { (item.get('lang'), item.get('fase'), item.get('arquivo'), item.get('ini'), item.get('tam'), item.get('alvo'), tuple(item.get('linhas', []))) for item in grupo }
            for c in candidatos:
                k = (c['lang'], c['fase'], c['arquivo'], c['ini'], c['tam'], c['alvo'], tuple(c['linhas']))
                if len(grupo) >= alvo:
                    break
                if k in usados:
                    continue
                grupo.append(c)
                usados.add(k)
            por_grupo[chave] = sorted(grupo, key=lambda x: (x.get('pont', 0), x.get('arquivo', '')), reverse=True)[:alvo]

    final = []
    for lang in ('c', 'java', 'py'):
        for fase in ('facil', 'medio', 'dificil'):
            grupo = por_grupo.get((lang, fase), [])
            itens = sorted(grupo, key=lambda x: (x.get('pont', 0), x.get('arquivo', '')), reverse=True)
            final.extend(itens[:TARGETS[fase].get(lang, 20)])

    by_lang = {lang: [item for item in final if item.get('lang') == lang] for lang in ('c', 'java', 'py')}
    final = []
    for lang in ('c', 'java', 'py'):
        final.extend(sorted(by_lang.get(lang, []), key=lambda x: (x.get('pont', 0), x.get('arquivo', '')), reverse=True)[:60])

    json.dump(final, open(os.path.join(AQUI, 'dados', 'selecionados.json'), 'w'), ensure_ascii=False, indent=1)
    for c in escolhidos:
        print(f"\n## {c['lang']} {c['fase']} | {c['arquivo']} [{c['ini']}+{c['tam']}] alvo={c['alvo']}")
        for k, l in enumerate(c['linhas']):
            print(('>' if k == c['alvo'] else ' ') + ' ' + l)


main()
