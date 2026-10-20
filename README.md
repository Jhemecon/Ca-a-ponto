# 🎃 Caça ao Ponto e Vírgula

Jogo de Halloween feito para um evento da faculdade, pensado para uma **TV touch na horizontal**.
Aparece um código com um erro, e o jogador precisa tocar na linha em que falta:

- o **`;`** em **C** e **Java**;
- os **`:`** em **Python** (no fim de `if`, `for`, `while`, `def`...).

É HTML, CSS e JavaScript puro, sem frameworks e sem instalar nada.

## Como jogar

- **Solo:** 3 fases (Fácil, Médio e Difícil) com 3 códigos cada, um de cada linguagem.
  O tempo é **por código**: 30s no Fácil, 15s no Médio e 10s no Difícil. Cada erro tira 5s e bloqueia a linha.
- **Batalha (2 jogadores):** tela dividida, os dois veem o mesmo código e quem tocar primeiro na linha certa leva o round.
  Quem erra fica congelado por 2s. Melhor de 5 rounds.
- **Tutorial:** botão "Como jogar" na tela inicial. Aparece sozinho para jogador novo.
- **Ranking:** cada jogador cadastra um nome (teclado virtual) e o melhor placar dele entra no ranking.

### Pontuação (solo)

Por código acertado: `(base + velocidade + sem erros) × multiplicador de sequência`

| Parte | Valor |
|---|---|
| Base | 100 (Fácil), 150 (Médio), 200 (Difícil) |
| Velocidade | até +100% da base, proporcional ao tempo que sobrou |
| Sem erros | +50% da base se não errou nenhuma linha no código |
| Sequência | ×1,1, ×1,2... até ×1,5 enquanto acerta seguido (erro zera) |
| Vitória | +500 para quem zera as 3 fases |

Os valores ficam nas constantes `PESO` e `PTS` de `js/jogo.js`.

## Rodando

Abra o `index.html` no navegador. Se algum navegador reclamar, rode um servidor local:

```bash
python3 -m http.server 8000
# abra http://localhost:8000
```

### Publicando no GitHub Pages (para abrir na TV por um link)

1. No repositório, vá em **Settings → Pages**.
2. Em **Build and deployment**, escolha **Deploy from a branch**, branch `main` e pasta `/ (root)`.
3. Salve. Em um ou dois minutos o jogo fica em `https://SEU-USUARIO.github.io/NOME-DO-REPOSITORIO/`.

> **Ranking:** fica salvo no `localStorage` do navegador. Na TV, use sempre o mesmo navegador, **fora de aba anônima**,
> e não limpe os dados do navegador, senão o ranking some. Cada aparelho tem o seu próprio ranking.

## Estrutura

```
index.html          telas do jogo
css/estilo.css      visual
js/codigos.js       banco de códigos e tempos de cada fase
js/jogo.js          lógica: partida, ranking, tutorial e batalha
docs/trechos.md     lista de todos os trechos, com a origem de cada um
ferramentas/        scripts que geraram o banco de códigos
```

## Adicionando ou editando códigos

Edite `js/codigos.js`. Cada trecho é um objeto, e o formato está explicado no comentário no topo do arquivo:

```js
{ i: 94, l: "C", m: ";", a: 2, c: [
  "int hp = 100;",
  "int dano = 30;",
  "hp = hp - dano",      // a linha de índice 2 (a) está sem o ";"
  'printf("%d", hp);',
  "return 0;",
] },
```

Regras: `i` único; a linha de índice `a` já vem **sem** o símbolo; Fácil tem 4 a 5 linhas (até 46 colunas),
Médio 8 a 10 (52) e Difícil 11 a 12 (62). Cada fase precisa de pelo menos 1 trecho de cada linguagem.
O jogo sorteia um trecho de cada linguagem por fase e só repete depois de passar por todos.

## Ferramentas (opcional)

Os scripts em `ferramentas/` extraem trechos de uma pasta de códigos, validam cada um
(o código original não tem erro e, sem o `;` ou `:`, dá erro) e montam o `js/codigos.js`.
Precisam de Python 3, `gcc` e JDK (com `javac`):

```bash
cd ferramentas
pip install -r requirements.txt
ACERVO=/caminho/dos/seus/codigos python3 gerar_trechos.py 7 10   # semente 7, 10 trechos por grupo
python3 criar_trechos_java.py       # trechos de Java criados no estilo das aulas
python3 melhorar_trechos.py         # versões reescritas de trechos específicos
python3 montar_codigos.py           # gera js/codigos.js e docs/trechos.md
```

Se você editar o `js/codigos.js` à mão, não rode o `montar_codigos.py` depois, porque ele sobrescreve o arquivo.

## Origem dos códigos

Os trechos vêm de exercícios de C, Java e Python feitos até o 4º período, adaptados para o jogo.
Parte dos trechos de Java foi criada no estilo das aulas. O `docs/trechos.md` marca a origem de cada um.

## Licença

Defina a licença do projeto antes de publicar (por exemplo MIT, em Add file → Create new file → `LICENSE`).
