"""Versões reescritas de trechos específicos (por número). Valida com gcc, javac e o analisador do Python."""
import ast, json, os, re, subprocess

# id: (fase, linguagem, contexto, origem, código com § antes do símbolo que vai faltar)
MEL = {
16: ('facil', 'java', 'boolean', 'Adaptado de `java/Aula5/Operacao.java` (método sacar completo)', r'''if (valor <= saldo) {
    saldo -= valor;
    return true§;
}
return false;'''),
29: ('facil', 'py', '', 'Reescrito no tema do evento, a partir de `py/II/1° NPC/2.py`', r'''def entrar(coragem, medo):
    if coragem > medo§:
        return "Pode entrar!"
    return "Fuja daqui!"'''),
30: ('facil', 'py', '', 'Reescrito no tema do evento, a partir de `py/I/Exercicios/strings/7.py`', r'''idade = int(input("Sua idade: "))
if idade >= 18:
    print("Pode entrar na casa assombrada!")
else§:
    print("Volte com um adulto!")'''),
41: ('medio', 'c', 'corpo', 'Adaptado de `C/Bla/Adivinhar2.c` (agora com o laço completo)', r'''int t2 = 3, chute, segredo = 7;
while (t2 > 0) {
    scanf("%d", &chute);
    if (chute == segredo) {
        printf("Acertou!");
        break;
    }
    t2--;
    printf("Errou! Faltam %d tentativas!\n", t2)§;
}'''),
51: ('medio', 'java', 'membros', 'Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5)', r'''public static int contarFantasmas(String[] sala) {
    int total = 0;
    for (String ser : sala) {
        if (ser.equals("fantasma")) {
            total++§;
        }
    }
    return total;
}'''),
52: ('medio', 'java', 'corpo', 'Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5)', r'''int i = 10;
System.out.println("Contagem regressiva!");
do {
    if (i % 2 == 0) {
        System.out.println(i + "...")§;
    }
    i--;
} while (i > 0);
System.out.println("BUUU!");'''),
63: ('dificil', 'c', 'corpo', 'Adaptado de `C/Técnicas de Programação/Estrutura de dados/Exercicios 2/tres.c` (código reorganizado)', r'''int vetor[10], soma = 0, negativos = 0;
for (int i = 0; i < 10; i++) {
    printf("Digite o numero %d: ", i + 1);
    scanf("%d", &vetor[i]);
    soma += vetor[i];
    if (vetor[i] < 0) {
        negativos++§;
    }
}
printf("Soma: %d\n", soma);
printf("Negativos: %d\n", negativos);'''),
67: ('dificil', 'c', 'arquivo', 'Adaptado de `C/Bla/Somatório2.c` (formatação arrumada e média no final)', r'''int main() {
    int a, i, s = 0;
    for (i = 1; i <= 10; i++) {
        printf("Digite um número: ")§;
        scanf("%d", &a);
        s = s + a;
    }
    printf("Somatório: %d\n", s);
    printf("Média: %.1f\n", s / 10.0);
    return 0;
}'''),
73: ('dificil', 'java', 'arquivo', 'Adaptado de `java/Aula3/While.java` (agora com o import)', r'''import javax.swing.JOptionPane;
public class While {
    public static void main(String[] args) {
        int i = 1§;
        while (i <= 15) {
            if (i % 2 == 0) {
                JOptionPane.showMessageDialog(null, i);
            }
            i++;
        }
    }
}'''),
81: ('dificil', 'java', 'corpo', 'Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5)', r'''int soma = 0;
int i = 1;
while (i < 20) {
    if (i % 3 == 0) {
        soma += i;
    } else if (i % 5 == 0) {
        soma += i§;
    }
    i++;
}
System.out.println("Soma: " + soma);'''),
}
LIM = {'facil': (4, 5, 46), 'medio': (8, 10, 52), 'dificil': (11, 12, 62)}
SIMB = {'java': ';', 'c': ';', 'py': ':'}


def embrulhar(lang, ctx, c):
    if lang == 'java':
        if ctx == 'arquivo': return c
        if ctx == 'membros': return 'public class T {\n' + c + '\n}'
        if ctx == 'boolean': return 'public class T {\ndouble saldo;\nboolean f(double valor) {\n' + c + '\n}\n}'
        return 'import java.util.*;\npublic class T {\npublic static void main(String[] a) {\n' + c + '\n}\n}'
    if lang == 'c':
        return '#include <stdio.h>\n' + c if ctx == 'arquivo' else '#include <stdio.h>\nint main(void) {\n' + c + '\nreturn 0;\n}'
    return c


def compila(lang, codigo):
    os.makedirs('/tmp/mel', exist_ok=True)
    if lang == 'py':
        try: ast.parse(codigo); return True
        except SyntaxError: return False
    if lang == 'c':
        open('/tmp/mel/x.c', 'w', encoding='utf-8').write(codigo)
        return subprocess.run(['gcc', '-fsyntax-only', '-x', 'c', '/tmp/mel/x.c'], capture_output=True).returncode == 0
    nome = (re.search(r'public class (\w+)', codigo) or [0, 'T'])[1]
    open(f'/tmp/mel/{nome}.java', 'w', encoding='utf-8').write(codigo)
    r = subprocess.run(['java', '-m', 'jdk.compiler/com.sun.tools.javac.Main', '-d', '/tmp/mel/out', f'/tmp/mel/{nome}.java'], capture_output=True)
    return r.returncode == 0


saida, falhas = {}, []
for i, (fase, lang, ctx, origem, texto) in MEL.items():
    linhas = texto.split('\n')
    alvo = [k for k, l in enumerate(linhas) if '§' in l]
    certo = [l.replace('§', '') for l in linhas]
    errado = [l.replace('§' + SIMB[lang], '') for l in linhas]
    mn, mx, col = LIM[fase]
    ok = len(alvo) == 1 and mn <= len(linhas) <= mx and max(map(len, linhas)) <= col
    ok = ok and compila(lang, embrulhar(lang, ctx, '\n'.join(certo))) and not compila(lang, embrulhar(lang, ctx, '\n'.join(errado)))
    if not ok: falhas.append((i, len(linhas), max(map(len, linhas))))
    saida[i] = dict(lang=lang, fase=fase, arquivo=origem, ln=None, origem=origem, alvo=alvo[0], linhas=certo)
json.dump(saida, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dados', 'melhorados.json'), 'w'), ensure_ascii=False, indent=1)
print('melhorias:', len(saida), '| falhas:', falhas or 'nenhuma')
