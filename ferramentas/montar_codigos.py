"""Monta js/codigos.js e docs/trechos.md a partir de dados/*.json.
Uso: python3 montar_codigos.py"""
import json, os

AQUI = os.path.dirname(os.path.abspath(__file__))
RAIZ = os.path.dirname(AQUI)
NOME = {'c': 'C', 'java': 'Java', 'py': 'Python'}
SIMBOLO = {'c': ';', 'java': ';', 'py': ':'}
FASES = [('facil', 'Fácil', 30, 'Códigos curtos. Você tem 30 segundos por código.'),
         ('medio', 'Médio', 15, 'Códigos maiores. Só 15 segundos por código!'),
         ('dificil', 'Difícil', 10, 'Códigos longos e cheios de armadilhas! Só 10 segundos por código!')]
CABECALHO = '''/*
 * BANCO DE CÓDIGOS DO JOGO
 *
 * Cada trecho é um objeto:
 *   i: número único (não repita)
 *   l: linguagem ("C", "Java" ou "Python")
 *   m: símbolo que falta (";" em C e Java, ":" em Python)
 *   a: índice da linha SEM o símbolo (começa em 0)
 *   c: as linhas do código (a linha de índice "a" já vem sem o símbolo)
 *
 * Tamanhos: Fácil 4 a 5 linhas (até 46 colunas), Médio 8 a 10 (52), Difícil 11 a 12 (62).
 * Cada fase precisa de pelo menos 1 trecho de cada linguagem.
 */
'''


def carregar(nome):
    return json.load(open(os.path.join(AQUI, 'dados', nome), encoding='utf-8'))


trechos = carregar('selecionados.json') + carregar('criados.json')
melhorados = carregar('melhorados.json')
js, md, nid = [CABECALHO + 'const P = ['], ['# Trechos do jogo\n', 'Cada trecho aparece como no jogo: o símbolo que falta já foi removido da linha marcada com ◄. '
                                           'Comentários e linhas em branco foram retirados e o recuo foi reduzido. '
                                           'As linhas citadas são as do arquivo original.\n'], 0
for chave, nome, segundos, descricao in FASES:
    js.append('  {\n    n: %s,\n    t: %d,\n    d: %s,\n    s: [' % (json.dumps(nome, ensure_ascii=False), segundos, json.dumps(descricao, ensure_ascii=False)))
    md.append('\n## Fase %s (%ds por código)\n' % (nome, segundos))
    for lang in ('c', 'java', 'py'):
        md.append('\n### %s\n' % NOME[lang])
        for t in [x for x in trechos if x['fase'] == chave and x['lang'] == lang]:
            nid += 1
            if str(nid) in melhorados:
                t = melhorados[str(nid)]
            linhas = list(t['linhas'])
            assert linhas[t['alvo']].endswith(SIMBOLO[lang]), nid
            linhas[t['alvo']] = linhas[t['alvo']][:-1]
            js.append('      { i: %d, l: %s, m: %s, a: %d, c: [\n%s\n      ] },' % (
                nid, json.dumps(NOME[lang]), json.dumps(SIMBOLO[lang]), t['alvo'],
                '\n'.join('        ' + json.dumps(l, ensure_ascii=False) + ',' for l in linhas)))
            origem = t.get('origem') or (('`%s`, linhas %d a %d' % (t['arquivo'], t['ln'][0], t['ln'][1])) if t.get('ln')
                                         else 'Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5)')
            corpo = '\n'.join('%2d %s%s' % (k + 1, l, '   ◄' if k == t['alvo'] else '') for k, l in enumerate(linhas))
            md.append('**#%d** %s. Falta o `%s` na linha %d.\n\n```\n%s\n```\n' % (nid, origem, SIMBOLO[lang], t['alvo'] + 1, corpo))
    js.append('    ],\n  },')
js.append('];\n')
open(os.path.join(RAIZ, 'js', 'codigos.js'), 'w', encoding='utf-8').write('\n'.join(js))
open(os.path.join(RAIZ, 'docs', 'trechos.md'), 'w', encoding='utf-8').write('\n'.join(md))
print('trechos:', nid)
