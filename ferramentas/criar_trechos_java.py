"""Trechos de Java criados no estilo das aulas. Valida cada um compilando com javac."""
import json, os, re, subprocess, textwrap
import tree_sitter as ts, tree_sitter_java as tj

# Cada trecho: (fase, contexto, código). O § marca o ponto onde o ';' vai faltar.
# contexto: corpo = comandos dentro do main | membros = métodos dentro de uma classe | arquivo = classe completa
NOVOS = [
('facil', 'corpo', '''int[] notas = {7, 9, 5};
int soma = 0;
for (int n : notas) {
    soma += n§;
}'''),
('facil', 'corpo', '''double saldo = 500.0;
double saque = 120.5;
saldo = saldo - saque§;
System.out.println(saldo);'''),
('facil', 'corpo', '''int i = 10;
while (i > 0) {
    i -= 3§;
}
System.out.println(i);'''),
('medio', 'arquivo', '''public class Conta {
    double saldo;
    public void depositar(double valor) {
        this.saldo += valor§;
    }
    public double getSaldo() {
        return this.saldo;
    }
}'''),
('medio', 'corpo', '''int[] pontos = new int[5];
for (int i = 0; i < pontos.length; i++) {
    pontos[i] = i * 2;
}
int maior = pontos[0];
for (int p : pontos) {
    if (p > maior) {
        maior = p§;
    }
}'''),
('medio', 'corpo', '''Scanner teclado = new Scanner(System.in);
System.out.print("Quantos números? ");
int n = teclado.nextInt();
int total = 0;
for (int i = 1; i <= n; i++) {
    total += i;
}
System.out.println("Total: " + total)§;'''),
('medio', 'membros', '''public static int contar(int[] v, int alvo) {
    int vezes = 0;
    for (int x : v) {
        if (x == alvo) {
            vezes++§;
        }
    }
    return vezes;
}'''),
('medio', 'corpo', '''System.out.println("Contagem regressiva!");
int i = 20;
do {
    if (i % 5 == 0) {
        System.out.println("Fantasma " + i)§;
    }
    i--;
} while (i > 0);'''),
('dificil', 'arquivo', '''public class Cofre {
    double saldo;
    double limite;
    public boolean sacar(double valor) {
        if (valor > this.saldo + this.limite) {
            return false;
        }
        this.saldo -= valor§;
        return true;
    }
}'''),
('dificil', 'corpo', '''int[][] m = new int[3][3];
for (int i = 0; i < 3; i++) {
    for (int j = 0; j < 3; j++) {
        m[i][j] = i + j;
    }
}
int soma = 0;
for (int i = 0; i < 3; i++) {
    soma += m[i][i]§;
}
System.out.println(soma);'''),
('dificil', 'corpo', '''int[] v = {2, 5, 6, 9, 10};
int pares = 0;
int impares = 0;
for (int i = 0; i < v.length; i++) {
    if (v[i] % 2 == 0) {
        pares++;
    } else {
        impares++§;
    }
}
System.out.println("Pares: " + pares);
System.out.println("Ímpares: " + impares);'''),
('dificil', 'corpo', '''int i = 1;
int soma = 0;
while (i <= 20) {
    if (i % 2 == 0) {
        soma += i;
    } else if (i % 5 == 0) {
        soma += 1§;
    }
    i++;
}
System.out.println("Soma: " + soma);'''),
('dificil', 'arquivo', '''public class Fantasma {
    String nome;
    int energia;
    public Fantasma(String nome, int energia) {
        this.nome = nome;
        this.energia = energia§;
    }
    public void assustar() {
        this.energia -= 10;
        System.out.println(this.nome + " assustou!");
    }
}'''),
('dificil', 'membros', '''public static double media(double[] notas) {
    System.out.println("Calculando...");
    double soma = 0;
    for (double n : notas) {
        soma += n;
    }
    if (notas.length == 0) {
        return 0;
    }
    return soma / notas.length§;
}'''),
]
LIMITES = {'facil': (4, 5, 46), 'medio': (8, 10, 52), 'dificil': (11, 12, 62)}
parser = ts.Parser(ts.Language(tj.language()))
tem_javac = 'jdk.compiler' in subprocess.run(['java', '--list-modules'], capture_output=True, text=True).stdout


def embrulhar(ctx, linhas):
    corpo = '\n'.join(linhas)
    if ctx == 'arquivo': return 'import java.util.*;\n' + corpo
    if ctx == 'membros': return 'import java.util.*;\npublic class T {\n' + corpo + '\n}'
    return 'import java.util.*;\npublic class T {\npublic static void main(String[] args) {\n' + corpo + '\n}\n}'


def compila(codigo, classe):
    os.makedirs('/tmp/jv', exist_ok=True)
    caminho = f'/tmp/jv/{classe}.java'
    open(caminho, 'w', encoding='utf-8').write(codigo)
    r = subprocess.run(['java', '-m', 'jdk.compiler/com.sun.tools.javac.Main', '-d', '/tmp/jv/out', caminho], capture_output=True, text=True)
    return r.returncode == 0, r.stderr[:300]


saida, problemas = [], []
for n, (fase, ctx, texto) in enumerate(NOVOS, 1):
    linhas = texto.split('\n')
    alvo = [k for k, l in enumerate(linhas) if '§' in l]
    certo = [l.replace('§', '') for l in linhas]
    errado = [l.replace('§;', '') for l in linhas]
    classe = (re.search(r'public class (\w+)', texto) or [None, 'T'])[1] if ctx == 'arquivo' else 'T'
    minimo, maximo, col = LIMITES[fase]
    ok = len(alvo) == 1 and minimo <= len(linhas) <= maximo and max(map(len, linhas)) <= col
    ok = ok and not parser.parse(embrulhar(ctx, certo).encode()).root_node.has_error
    ok = ok and parser.parse(embrulhar(ctx, errado).encode()).root_node.has_error
    if tem_javac:
        compilou, msg = compila(embrulhar(ctx, certo).replace('public class T', 'class T') if classe == 'T' else embrulhar(ctx, certo), classe)
        if not compilou: ok = False; problemas.append((n, msg))
        elif compila(embrulhar(ctx, errado).replace('public class T', 'class T') if classe == 'T' else embrulhar(ctx, errado), classe)[0]: ok = False; problemas.append((n, 'sem erro ao remover ;'))
    if not ok: problemas.append((n, 'falhou na validação'))
    saida.append(dict(lang='java', fase=fase, arquivo='(criado a partir de Aula3, Aula4 e Aula5)', ln=None, alvo=alvo[0], linhas=certo))
json.dump(saida, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dados', 'criados.json'), 'w'), ensure_ascii=False, indent=1)
print('javac disponível:', tem_javac, '| trechos criados:', len(saida), '| problemas:', problemas or 'nenhum')
