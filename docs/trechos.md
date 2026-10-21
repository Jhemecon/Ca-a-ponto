# Trechos do jogo

Cada trecho aparece como no jogo: o símbolo que falta já foi removido da linha marcada com ◄. Comentários e linhas em branco foram retirados e o recuo foi reduzido. As linhas citadas são as do arquivo original.


## Fase Fácil (30s por código)


### C

**#1** `C/Bla/Inteirox3.c`, linhas 12 a 15. Falta o `;` na linha 3.

```
 1 for (i = 1; i <= 5; i++)
 2 {
 3     inteiro = inteiro * 3   ◄
 4 }
```

**#2** `C/ESTRUTURA DE DADOS 1/Funções/2.c`, linhas 2 a 6. Falta o `;` na linha 3.

```
 1 #include<stdlib.h>
 2 int dobro (int num) {
 3     return num * 2   ◄
 4 }
```

**#3** `C/ESTRUTURA DE DADOS 1/Funções/1.c`, linhas 5 a 8. Falta o `;` na linha 3.

```
 1 if (a == b && a == c && b == c)
 2 {
 3     return 1   ◄
 4 }
```

**#4** `C/Técnicas de Programação/Estrutura de dados/Exercicios 3/11.c`, linhas 5 a 8. Falta o `;` na linha 3.

```
 1 float soma = 0;
 2 for (int i = 0; i < n; i++) {
 3     soma += vetor[i]   ◄
 4 }
```

**#5** `C/Técnicas de Programação/Estrutura de dados/Exercicios 2/BINGO.c`, linhas 144 a 147. Falta o `;` na linha 2.

```
 1 if (cartela_marcada[i][j][u] == 0) {
 2     cont_cartela[u] += 1   ◄
 3     cartela_marcada[i][j][u] = 1;
 4 }
```

**#6** `C/Bla/#teste.c`, linhas 3 a 7. Falta o `;` na linha 3.

```
 1 int main()
 2 {
 3     printf("\tHello World \"LINDO\"?")   ◄
 4     return 0;
 5 }
```

**#7** `C/Bla/Média_Aritmética.c`, linhas 21 a 24. Falta o `;` na linha 3.

```
 1 if (mf >= 6)
 2 {
 3     printf ("\nAPROVADO!")   ◄
 4 }
```

**#8** `C/Técnicas de Programação/Estrutura de dados/Exercicios 2/1.c`, linhas 24 a 27. Falta o `;` na linha 3.

```
 1 if (((i + 1) + (j + 1)) == 4)
 2 {
 3     diagonal_secundaria += matriz[i][j]   ◄
 4 }
```

**#9** `C/ESTRUTURA DE DADOS 1/somamaisum.c`, linhas 2 a 7. Falta o `;` na linha 4.

```
 1 #include<stdlib.h>
 2 void somaMaisum(int *n) {
 3     *n = *n + 1;
 4     printf ("Dentro da função: %d\n", *n)   ◄
 5 }
```

**#10** `C/ESTRUTURA DE DADOS 1/Funções/4.c`, linhas 23 a 26. Falta o `;` na linha 3.

```
 1 if (vetor[i] == receptor) {
 2     printf ("%d existe no vetor!", receptor);
 3     break   ◄
 4 }
```

**#11** `C/ESTRUTURA DE DADOS 1/prototipo.c`, linhas 21 a 24. Falta o `;` na linha 3.

```
 1 float expo(float a, int x) {
 2     x = pow(a, 2);
 3     return x   ◄
 4 }
```

**#12** `C/Bla/Maior_e_menor_número.c`, linhas 13 a 16. Falta o `;` na linha 3.

```
 1 if (a>b && a>c)
 2 {
 3     printf ("O maior número é %d.", a)   ◄
 4 }
```

**#13** `C/ESTRUTURA DE DADOS 1/Ponteiros/1.c`, linhas 7 a 11. Falta o `;` na linha 3.

```
 1 int main () {
 2     int lista[TAM];
 3     incremento(lista, TAM)   ◄
 4     mostrar_vetor(lista, TAM);
 5 }
```

**#14** `C/Bla/Fatorial.c`, linhas 10 a 15. Falta o `;` na linha 5.

```
 1 for (i = 1; i <= n; i++)
 2 {
 3     fatorial = fatorial * i;
 4 }
 5 printf ("%d", fatorial)   ◄
```

**#15** `C/Técnicas de Programação/Estrutura de dados/Exercicios 2/2.c`, linhas 20 a 24. Falta o `;` na linha 4.

```
 1 if (temp == vetor[j])
 2 {
 3     repetido = 1;
 4     break   ◄
 5 }
```

**#16** Adaptado de `java/Aula5/Operacao.java` (método sacar completo). Falta o `;` na linha 3.

```
 1 if (valor <= saldo) {
 2     saldo -= valor;
 3     return true   ◄
 4 }
 5 return false;
```

**#17** `C/ESTRUTURA DE DADOS 1/prototipo.c`, linhas 11 a 16. Falta o `;` na linha 5.

```
 1 float k, w = 5.4;
 2 k = raiz(w);
 3 int x, y = 1, z = 2;
 4 x = soma(y, z);
 5 printf ("Expo: %.1f\n", l)   ◄
```

**#18** `C/Técnicas de Programação/Estrutura de dados/Exercicios 3/2.c`, linhas 16 a 19. Falta o `;` na linha 3.

```
 1 if (string[j] == vogais[i])
 2 {
 3     cont_vogais += 1   ◄
 4 }
```

**#19** `C/Técnicas de Programação/Estrutura de dados/Exercicios 3/8.c`, linhas 16 a 19. Falta o `;` na linha 3.

```
 1 char str[100], ch;
 2 int i, j;
 3 printf ("Digite uma string: ")   ◄
 4 fgets (str, 99, stdin);
```

**#20** `C/Introdução a Programação/Lista de Exercícios 1/Questão 44.c`, linhas 6 a 11. Falta o `;` na linha 3.

```
 1 int prestacoes;
 2 printf ("Informe o valor da mercadoria: ");
 3 scanf ("%f", &valormercadoria)   ◄
 4 prestacoes = valormercadoria / 3;
```


### Java

**#21** `java/Aula5/Programa1a.java`, linhas 8 a 12. Falta o `;` na linha 3.

```
 1 double limite;
 2 public void sacar (double valor) {
 3     this.saldo -= valor   ◄
 4 }
```

**#22** `java/Aula3/Naturais.java`, linhas 7 a 11. Falta o `;` na linha 4.

```
 1 int i = 1;
 2 do {
 3     JOptionPane.showMessageDialog(null, i);
 4     i++   ◄
 5 } while (i <= 20);
```

**#23** `java/Aula5/Carro.java`, linhas 23 a 26. Falta o `;` na linha 2.

```
 1 class Motor {
 2     String tipo   ◄
 3     int potencia;
 4 }
```

**#24** `java/Aula2/ImprimeArgs.java`, linhas 4 a 8. Falta o `;` na linha 3.

```
 1 public static void main(String[] args) {
 2     for (int i = 0; i < args.length; i++) {
 3         System.out.println(args[i])   ◄
 4     }
 5 }
```

**#25** `java/Aula4/Matriz1.java`, linhas 50 a 53. Falta o `;` na linha 2.

```
 1 for (int j = 0; j < matrizC.length; j++) {
 2     System.out.print(matrizC[i][j] + " ")   ◄
 3 }
 4 System.out.println();
```

**#26** `java/Aula3/Nuuumeros.java`, linhas 7 a 11. Falta o `;` na linha 4.

```
 1 int i = 150;
 2 do {
 3     JOptionPane.showMessageDialog(null, i);
 4     i++   ◄
 5 } while (i <= 300);
```

**#27** `java/Aula4/Matriz1.java`, linhas 42 a 45. Falta o `;` na linha 4.

```
 1 for (int j = 0; j < matrizB.length; j++) {
 2     System.out.print(matrizB[i][j] + " ");
 3 }
 4 System.out.println()   ◄
```

**#28** `java/Aula5/Programa1a.java`, linhas 7 a 12. Falta o `;` na linha 2.

```
 1 double saldo;
 2 double limite   ◄
 3 public void sacar (double valor) {
 4     this.saldo -= valor;
 5 }
```

**#29** Reescrito no tema do evento, a partir de `py/II/1° NPC/2.py`. Falta o `;` na linha 2.

```
 1 def entrar(coragem, medo):
 2     if coragem > medo   ◄
 3         return "Pode entrar!"
 4     return "Fuja daqui!"
```

**#30** Reescrito no tema do evento, a partir de `py/I/Exercicios/strings/7.py`. Falta o `;` na linha 4.

```
 1 idade = int(input("Sua idade: "))
 2 if idade >= 18:
 3     print("Pode entrar na casa assombrada!")
 4 else   ◄
 5     print("Volte com um adulto!")
```

**#31** `java/Aula2/Vasco.java`, linhas 3 a 7. Falta o `;` na linha 3.

```
 1 public class Vasco {
 2     public static void main (String[] args) {
 3         System.out.println("Vasco da Gama")   ◄
 4     }
 5 }
```

**#32** `java/Aula5/Programa1a.java`, linhas 32 a 36. Falta o `;` na linha 5.

```
 1 ler.nextLine();
 2 System.out.println("\nConta 02\nNome: ");
 3 conta2.nomeCliente = ler.nextLine();
 4 System.out.println("Saldo: ");
 5 conta2.saldo = ler.nextDouble()   ◄
```

**#33** `java/Aula5/SacaEDeposita.java`, linhas 23 a 26. Falta o `;` na linha 4.

```
 1 ContaBancaria conta1 = new ContaBancaria();
 2 conta1.saldo = 1000.00;
 3 System.out.println("Saldo: " + conta1.saldo);
 4 int escolha   ◄
```

**#34** `java/Aula5/Programa1a.java`, linhas 30 a 33. Falta o `;` na linha 3.

```
 1 System.out.print("Saldo: ");
 2 conta1.saldo = ler.nextDouble();
 3 ler.nextLine()   ◄
 4 System.out.println("\nConta 02\nNome: ");
```

**#35** `java/Aula5/Operacao.java`, linhas 9 a 12. Falta o `;` na linha 2.

```
 1     this.saldo -= valor;
 2     return true   ◄
 3 } else {
 4     return false;
```

**#36** `java/Aula5/TesteClienteConta.java`, linhas 13 a 16. Falta o `;` na linha 4.

```
 1     this.saldo -= valor;
 2     return true;
 3 } else {
 4     return false   ◄
```

**#37** `java/Aula5/Duke.java`, linhas 7 a 10. Falta o `;` na linha 3.

```
 1 String nomeCliente;
 2 double saldo;
 3 double limite   ◄
 4 Cliente titular;
```

**#38** `java/Aula4/Mat.java`, linhas 21 a 24. Falta o `;` na linha 3.

```
 1 System.out.println("Conteúdo da lista:");
 2 for (int i : lista) {
 3     System.out.print("["+i+"] ")   ◄
 4 }
```

**#39** `java/Aula5/SacaEDeposita.java`, linhas 23 a 26. Falta o `;` na linha 3.

```
 1 ContaBancaria conta1 = new ContaBancaria();
 2 conta1.saldo = 1000.00;
 3 System.out.println("Saldo: " + conta1.saldo)   ◄
 4 int escolha;
```

**#40** `java/Aula5/SacaEDeposita.java`, linhas 5 a 8. Falta o `;` na linha 2.

```
 1 String numeroConta;
 2 String nomeCliente   ◄
 3 double saldo;
 4 double limite;
```

**#41** Adaptado de `C/Bla/Adivinhar2.c` (agora com o laço completo). Falta o `;` na linha 9.

```
 1 int t2 = 3, chute, segredo = 7;
 2 while (t2 > 0) {
 3     scanf("%d", &chute);
 4     if (chute == segredo) {
 5         printf("Acertou!");
 6         break;
 7     }
 8     t2--;
 9     printf("Errou! Faltam %d tentativas!\n", t2)   ◄
10 }
```

**#42** Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5). Falta o `;` na linha 3.

```
 1 double saldo = 500.0;
 2 double saque = 120.5;
 3 saldo = saldo - saque   ◄
 4 System.out.println(saldo);
```

**#43** Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5). Falta o `;` na linha 3.

```
 1 int i = 10;
 2 while (i > 0) {
 3     i -= 3   ◄
 4 }
 5 System.out.println(i);
```


### Python

**#44** `py/PA/quiiick.py`, linhas 6 a 10. Falta o `:` na linha 2.

```
 1 def quick_sort(lista, inicio, fim):
 2     if inicio > fim   ◄
 3         return
 4     anterior = inicio
 5     posterior = fim
```

**#45** `py/PA/quiiick.py`, linhas 6 a 9. Falta o `:` na linha 2.

```
 1 def quick_sort(lista, inicio, fim):
 2     if inicio > fim   ◄
 3         return
 4     anterior = inicio
```

**#46** `py/II/1° NPC/carro.py`, linhas 1 a 4. Falta o `:` na linha 2.

```
 1 class Carro:
 2     def __init__ (self, marca, modelo, ano)   ◄
 3         self.marca = marca
 4         self.modelo = modelo
```

**#47** `py/II/1° NPC/biblioteca.py`, linhas 25 a 28. Falta o `:` na linha 2.

```
 1 class Usuario:
 2     def __init__(self, nome, id_usuario)   ◄
 3         self.nome = nome
 4         self.id_usuario = id_usuario
```

**#48** `py/PA/seleção.py`, linhas 3 a 7. Falta o `:` na linha 4.

```
 1 def selection_sort (lista):
 2     global comparacoes
 3     n = len(lista)
 4     for i in range(n - 1)   ◄
 5         menor = i
```

**#49** `py/II/revisão3.py`, linhas 11 a 15. Falta o `:` na linha 2.

```
 1 for aluno in alunos:
 2     if aluno["idade"] >= 18   ◄
 3         maior.append(aluno["idade"])
 4     else:
 5         menor.append(aluno["idade"])
```

**#50** `py/I/Exercicios/Revisão 1/maior_menor.py`, linhas 4 a 7. Falta o `:` na linha 3.

```
 1 for i in range (1, 3):
 2     num = int(input("Digite um número: "))
 3     if num > maior   ◄
 4         maior = num
```

**#51** Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5). Falta o `:` na linha 5.

```
 1 public static int contarFantasmas(String[] sala) {
 2     int total = 0;
 3     for (String ser : sala) {
 4         if (ser.equals("fantasma")) {
 5             total++   ◄
 6         }
 7     }
 8     return total;
 9 }
```

**#52** Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5). Falta o `:` na linha 5.

```
 1 int i = 10;
 2 System.out.println("Contagem regressiva!");
 3 do {
 4     if (i % 2 == 0) {
 5         System.out.println(i + "...")   ◄
 6     }
 7     i--;
 8 } while (i > 0);
 9 System.out.println("BUUU!");
```

**#53** `py/II/1° NPC/1.py`, linhas 21 a 25. Falta o `:` na linha 3.

```
 1 def verificar_viabilidade(self):
 2     capacidade = self.capacidade_total()
 3     if (capacidade >= self.pontos)   ◄
 4         print ("Projeto Viável")
```

**#54** `py/I/Exercicios/strings/20.py`, linhas 4 a 7. Falta o `:` na linha 3.

```
 1 while True:
 2     idade = int(input("Digite sua idade: "))
 3     if idade < 0   ◄
 4         break
```

**#55** `py/I/Exercicios/Funções/1.py`, linhas 1 a 4. Falta o `:` na linha 2.

```
 1 def fatorial (n):
 2        if n == 0   ◄
 3            print ("Inválido")
 4            return 0
```

**#56** `py/I/Exercicios/Listas/2.py`, linhas 9 a 14. Falta o `:` na linha 1.

```
 1 for i in range(12)   ◄
 2     temperatura = float(input(f"{mês[i]}: "))
 3     temperatura_mensal.append(temperatura)
 4     soma += temperatura
 5 media_anual = soma / 12
```

**#57** `py/I/Exercicios/Funções/4.py`, linhas 1 a 5. Falta o `:` na linha 4.

```
 1 def aval (num):
 2     if num > 0:
 3         return 'P'
 4     else   ◄
 5         return 'N'
```

**#58** `py/PA/linear.py`, linhas 3 a 6. Falta o `:` na linha 3.

```
 1 def busca_linear(lista, alvo):
 2     global comparacoes
 3     for indice in range(len(lista))   ◄
 4         comparacoes += 1
```

**#59** `py/II/1° NPC/2.py`, linhas 41 a 44. Falta o `:` na linha 3.

```
 1 if capacidade >= self.pontos_de_funcao:
 2     return "Projeto Viável"
 3 else   ◄
 4     return "Projeto Inviável"
```

**#60** `py/I/Exercicios/strings/7.py`, linhas 5 a 8. Falta o `:` na linha 3.

```
 1 if (sexo == 2 and idade < 25):
 2     print ("ACEITA")
 3 else   ◄
 4     print ("NÃO ACEITA")
```

**#61** `py/I/Exercicios/strings/14.py`, linhas 4 a 7. Falta o `:` na linha 1.

```
 1 for char in palavra   ◄
 2     valor_ascii = ord(char)
 3     novo_valor_ascii = valor_ascii + 1
 4     novo_char = chr(novo_valor_ascii)
```

**#62** `py/I/Exercicios/Revisão 1/energia.py`, linhas 9 a 12. Falta o `:` na linha 3.

```
 1 if kWh <= 1000:
 2     print (f"R$ {kWh * 0.55}")
 3 else   ◄
 4     print (f"R$ {kWh * 0.6}")
```

**#63** Adaptado de `C/Técnicas de Programação/Estrutura de dados/Exercicios 2/tres.c` (código reorganizado). Falta o `:` na linha 7.

```
 1 int vetor[10], soma = 0, negativos = 0;
 2 for (int i = 0; i < 10; i++) {
 3     printf("Digite o numero %d: ", i + 1);
 4     scanf("%d", &vetor[i]);
 5     soma += vetor[i];
 6     if (vetor[i] < 0) {
 7         negativos++   ◄
 8     }
 9 }
10 printf("Soma: %d\n", soma);
11 printf("Negativos: %d\n", negativos);
```


## Fase Médio (15s por código)


### C

**#64** `C/Técnicas de Programação/Estrutura de dados/Exercicios 3/10.c`, linhas 1 a 10. Falta o `;` na linha 4.

```
 1 #include <stdio.h>
 2 #include <stdlib.h>
 3 void preenche_decrescente(int vetor[], int n) {
 4     int j = 0   ◄
 5     for (int i = n; i >= 0; i--) {
 6         vetor[j] = i;
 7         j++;
 8     }
 9 }
```

**#65** `C/ESTRUTURA DE DADOS 1/fatorial.c`, linhas 1 a 11. Falta o `;` na linha 7.

```
 1 #include<stdio.h>
 2 #include<stdlib.h>
 3 int fatorial (int n) {
 4     int i, f = 1;
 5     for (i = 1; i <= n; i++)
 6     {
 7         f *= i   ◄
 8     }
 9     return f;
10 }
```

**#66** `C/Técnicas de Programação/Estrutura de dados/Exercicios 3/4.c`, linhas 5 a 15. Falta o `;` na linha 2.

```
 1 char string[100], valor = '-';
 2 puts("Digite uma string: ")   ◄
 3 fgets(string, 99, stdin);
 4 for (int i = 0; string[i] != '\0'; i++)
 5 {
 6     if (string[i] == ' ')
 7     {
 8         string[i] = valor;
 9     }
10 }
```

**#67** Adaptado de `C/Bla/Somatório2.c` (formatação arrumada e média no final). Falta o `;` na linha 4.

```
 1 int main() {
 2     int a, i, s = 0;
 3     for (i = 1; i <= 10; i++) {
 4         printf("Digite um número: ")   ◄
 5         scanf("%d", &a);
 6         s = s + a;
 7     }
 8     printf("Somatório: %d\n", s);
 9     printf("Média: %.1f\n", s / 10.0);
10     return 0;
11 }
```

**#68** `C/Técnicas de Programação/Estrutura de dados/Exercicios 2/2.c`, linhas 18 a 25. Falta o `;` na linha 6.

```
 1 for (j = 0; j < 10; j++)
 2 {
 3     if (temp == vetor[j])
 4     {
 5         repetido = 1;
 6         break   ◄
 7     }
 8 }
```

**#69** `C/Bla/seleção.c`, linhas 18 a 26. Falta o `;` na linha 5.

```
 1 int menor = arr[0];
 2 int menor_indice = 0;
 3 for (int i = 1; i < tamanho; i++) {
 4     if (arr[i] < menor) {
 5         menor = arr[i]   ◄
 6         menor_indice = i;
 7     }
 8 }
 9 return menor_indice;
```

**#70** `C/Técnicas de Programação/Estrutura de dados/Média.c`, linhas 5 a 13. Falta o `;` na linha 7.

```
 1 float nota[5], media_geral, somatoria = 0;
 2 int aluno = 1;
 3 for (int i = 0; i < 5; i++)
 4 {
 5     printf ("Digite a nota do aluno %d: ", aluno);
 6     scanf ("%f", &nota[i]);
 7     aluno++   ◄
 8 }
```

**#71** `C/Técnicas de Programação/Estrutura de dados/Bubblesort.c`, linhas 20 a 28. Falta o `;` na linha 7.

```
 1 for (int i = 0; i < 7; i++)
 2 {
 3     if (numero[i] > numero[i+1])
 4     {
 5         int temp = numero[i];
 6         numero[i] = numero[i+1];
 7         numero[i+1] = temp   ◄
 8     }
 9 }
```

**#72** `C/Técnicas de Programação/Estrutura de dados/Média.c`, linhas 5 a 13. Falta o `;` na linha 2.

```
 1 float nota[5], media_geral, somatoria = 0;
 2 int aluno = 1   ◄
 3 for (int i = 0; i < 5; i++)
 4 {
 5     printf ("Digite a nota do aluno %d: ", aluno);
 6     scanf ("%f", &nota[i]);
 7     aluno++;
 8 }
```

**#73** Adaptado de `java/Aula3/While.java` (agora com o import). Falta o `;` na linha 4.

```
 1 import javax.swing.JOptionPane;
 2 public class While {
 3     public static void main(String[] args) {
 4         int i = 1   ◄
 5         while (i <= 15) {
 6             if (i % 2 == 0) {
 7                 JOptionPane.showMessageDialog(null, i);
 8             }
 9             i++;
10         }
11     }
12 }
```

**#74** `C/ESTRUTURA DE DADOS 1/Alocação/6.c`, linhas 8 a 18. Falta o `;` na linha 9.

```
 1 int *vetor = (int *) malloc(n * sizeof(int));
 2 if(vetor == NULL) {
 3     printf("Erro ao alocar memoria!\n");
 4     return 1;
 5 }
 6 for (int i = 0; i < n; i++)
 7 {
 8     printf("Digite o elemento %d: ", i + 1);
 9     scanf("%d", &vetor[i])   ◄
10 }
```

**#75** `C/ESTRUTURA DE DADOS 1/Alocação/4.c`, linhas 16 a 25. Falta o `;` na linha 8.

```
 1 for (int i = 0; i < n; i++)
 2 {
 3     printf("Digite o elemento %d: ", i + 1);
 4     scanf("%f", &vetor[i]);
 5     soma += vetor[i];
 6     produto *= vetor[i];
 7 }
 8 printf("Soma: %.1f\n", soma)   ◄
 9 printf("Produto: %.1f\n", produto);
```

**#76** `C/ESTRUTURA DE DADOS 1/Alocação/5.c`, linhas 5 a 12. Falta o `;` na linha 4.

```
 1 int n, receptor;
 2 printf("Digite o numero de elementos: ");
 3 scanf("%d", &n);
 4 int *vetor = (int *) malloc(n * sizeof(int))   ◄
 5 if(vetor == NULL) {
 6     printf("Erro ao alocar memoria!\n");
 7     return 1;
 8 }
```

**#77** `C/Técnicas de Programação/Estrutura de dados/Exercicios 1/11.c`, linhas 4 a 14. Falta o `;` na linha 2.

```
 1 int n, i, fatorial = 1;
 2 printf ("Digite um número: ")   ◄
 3 scanf ("%d", &n);
 4 for (i = 1; i <= n; i++)
 5 {
 6     fatorial = fatorial * i;
 7 }
 8 printf ("%d", fatorial);
```

**#78** `C/Introdução a Programação/Lista de Exercícios 2/Questão 15.c`, linhas 7 a 18. Falta o `;` na linha 3.

```
 1 for (i = 1; i <= 10; i++)
 2 {
 3     printf ("Digite a idade da %d° pessoa: ", i)   ◄
 4     scanf ("%d", &idade);
 5     if (idade >= 18)
 6     {
 7         maioridade++;
 8     }
 9 }
10 printf ("Pessoas na maioridade: %d", maioridade);
```

**#79** `C/Bla/Adivinhar2.c`, linhas 28 a 35. Falta o `;` na linha 7.

```
 1 if (t2 == 0)
 2 {
 3     continue;
 4 }
 5 else
 6 {
 7     printf ("Errou! Faltam %d tentativas!\n", t2)   ◄
 8 }
```

**#80** `C/Técnicas de Programação/Estrutura de dados/Exercicios 3/12.c`, linhas 31 a 38. Falta o `;` na linha 6.

```
 1 int main () {
 2     int matriz[3][3];
 3     preencherMatriz(matriz);
 4     exibirMatriz(matriz);
 5     int traco = calcularTraco(matriz);
 6     printf("Traço da matriz: %d\n", traco)   ◄
 7     return 0;
 8 }
```

**#81** Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5). Falta o `;` na linha 7.

```
 1 int soma = 0;
 2 int i = 1;
 3 while (i < 20) {
 4     if (i % 3 == 0) {
 5         soma += i;
 6     } else if (i % 5 == 0) {
 7         soma += i   ◄
 8     }
 9     i++;
10 }
11 System.out.println("Soma: " + soma);
```

**#82** `C/Bla/Adivinhar2.c`, linhas 28 a 35. Falta o `;` na linha 3.

```
 1 if (t2 == 0)
 2 {
 3     continue   ◄
 4 }
 5 else
 6 {
 7     printf ("Errou! Faltam %d tentativas!\n", t2);
 8 }
```

**#83** `C/ESTRUTURA DE DADOS 1/Alocação/4.c`, linhas 16 a 25. Falta o `;` na linha 9.

```
 1 for (int i = 0; i < n; i++)
 2 {
 3     printf("Digite o elemento %d: ", i + 1);
 4     scanf("%f", &vetor[i]);
 5     soma += vetor[i];
 6     produto *= vetor[i];
 7 }
 8 printf("Soma: %.1f\n", soma);
 9 printf("Produto: %.1f\n", produto)   ◄
```


### Java

**#84** `java/Aula3/Nuuumeros.java`, linhas 5 a 13. Falta o `;` na linha 3.

```
 1 public class Nuuumeros {
 2     public static void main(String[] args) {
 3         int i = 150   ◄
 4         do {
 5             JOptionPane.showMessageDialog(null, i);
 6             i++;
 7         } while (i <= 300);
 8     }
 9 }
```

**#85** `java/Aula3/DoWhile.java`, linhas 5 a 13. Falta o `;` na linha 3.

```
 1 public class DoWhile {
 2     public static void main(String[] args) {
 3         int i = -1   ◄
 4         do {
 5             JOptionPane.showMessageDialog(null, i);
 6             i--;
 7         } while (i >= -10);
 8     }
 9 }
```

**#86** `java/Aula4/Mat.java`, linhas 12 a 19. Falta o `;` na linha 7.

```
 1 int soma = 0;
 2 for (int i = 0; i < lista.length; i++) {
 3     System.out.printf("Digite o %d número: ", i+1);
 4     lista[i] = teclado.nextInt();
 5     soma += lista[i];
 6 }
 7 System.out.println("Tamanho da lista: " + tamanho)   ◄
 8 System.out.println("Somatório: " + soma);
```

**#87** `java/Aula3/While.java`, linhas 6 a 14. Falta o `;` na linha 2.

```
 1 public static void main (String[] args) {
 2     int i = 1   ◄
 3     while (i <= 15) {
 4         if (i % 2 == 0) {
 5             JOptionPane.showMessageDialog(null, i);
 6         }
 7         i++;
 8     }
 9 }
```

**#88** `java/Aula4/Mat.java`, linhas 13 a 21. Falta o `;` na linha 4.

```
 1 for (int i = 0; i < lista.length; i++) {
 2     System.out.printf("Digite o %d número: ", i+1);
 3     lista[i] = teclado.nextInt();
 4     soma += lista[i]   ◄
 5 }
 6 System.out.println("Tamanho da lista: " + tamanho);
 7 System.out.println("Somatório: " + soma);
 8 System.out.println("Média: " + soma/tamanho);
 9 System.out.println("Conteúdo da lista:");
```

**#89** `java/Aula4/Mat.java`, linhas 11 a 20. Falta o `;` na linha 6.

```
 1 int [] lista = new int[tamanho];
 2 int soma = 0;
 3 for (int i = 0; i < lista.length; i++) {
 4     System.out.printf("Digite o %d número: ", i+1);
 5     lista[i] = teclado.nextInt();
 6     soma += lista[i]   ◄
 7 }
 8 System.out.println("Tamanho da lista: " + tamanho);
 9 System.out.println("Somatório: " + soma);
10 System.out.println("Média: " + soma/tamanho);
```

**#90** `java/Aula4/Mat.java`, linhas 11 a 18. Falta o `;` na linha 2.

```
 1 int [] lista = new int[tamanho];
 2 int soma = 0   ◄
 3 for (int i = 0; i < lista.length; i++) {
 4     System.out.printf("Digite o %d número: ", i+1);
 5     lista[i] = teclado.nextInt();
 6     soma += lista[i];
 7 }
 8 System.out.println("Tamanho da lista: " + tamanho);
```

**#91** `java/Aula4/Mat.java`, linhas 11 a 19. Falta o `;` na linha 4.

```
 1 int [] lista = new int[tamanho];
 2 int soma = 0;
 3 for (int i = 0; i < lista.length; i++) {
 4     System.out.printf("Digite o %d número: ", i+1)   ◄
 5     lista[i] = teclado.nextInt();
 6     soma += lista[i];
 7 }
 8 System.out.println("Tamanho da lista: " + tamanho);
 9 System.out.println("Somatório: " + soma);
```

**#92** `java/Aula4/Mat.java`, linhas 12 a 21. Falta o `;` na linha 5.

```
 1 int soma = 0;
 2 for (int i = 0; i < lista.length; i++) {
 3     System.out.printf("Digite o %d número: ", i+1);
 4     lista[i] = teclado.nextInt();
 5     soma += lista[i]   ◄
 6 }
 7 System.out.println("Tamanho da lista: " + tamanho);
 8 System.out.println("Somatório: " + soma);
 9 System.out.println("Média: " + soma/tamanho);
10 System.out.println("Conteúdo da lista:");
```

**#93** `java/Aula4/Mat.java`, linhas 12 a 20. Falta o `;` na linha 5.

```
 1 int soma = 0;
 2 for (int i = 0; i < lista.length; i++) {
 3     System.out.printf("Digite o %d número: ", i+1);
 4     lista[i] = teclado.nextInt();
 5     soma += lista[i]   ◄
 6 }
 7 System.out.println("Tamanho da lista: " + tamanho);
 8 System.out.println("Somatório: " + soma);
 9 System.out.println("Média: " + soma/tamanho);
```

**#94** `java/Aula4/Mat.java`, linhas 13 a 20. Falta o `;` na linha 8.

```
 1 for (int i = 0; i < lista.length; i++) {
 2     System.out.printf("Digite o %d número: ", i+1);
 3     lista[i] = teclado.nextInt();
 4     soma += lista[i];
 5 }
 6 System.out.println("Tamanho da lista: " + tamanho);
 7 System.out.println("Somatório: " + soma);
 8 System.out.println("Média: " + soma/tamanho)   ◄
```

**#95** `java/Aula5/Operacao.java`, linhas 15 a 23. Falta o `;` na linha 5.

```
 1 public void depositar(double valor) {
 2     this.saldo += valor;
 3 }
 4 public String getNomeCliente() {
 5     return this.nomeCliente   ◄
 6 }
 7 public double getSaldo() {
 8     return this.saldo;
 9 }
```

**#96** `java/Aula3/Idade.java`, linhas 13 a 21. Falta o `;` na linha 2.

```
 1 if (idade <= 12) {
 2     System.out.println("Criança")   ◄
 3 }
 4 else if (idade <= 17) {
 5     System.out.println("Adolescente");
 6 }
 7 else {
 8     System.out.println("Adulto");
 9 }
```

**#97** `java/Aula3/Idade.java`, linhas 8 a 15. Falta o `;` na linha 7.

```
 1 int idade;
 2 try (Scanner teclado = new Scanner(System.in)) {
 3     System.out.print("Digite sua idade: ");
 4     idade = teclado.nextInt();
 5 }
 6 if (idade <= 12) {
 7     System.out.println("Criança")   ◄
 8 }
```

**#98** `java/Aula5/Operacao.java`, linhas 15 a 23. Falta o `;` na linha 2.

```
 1 public void depositar(double valor) {
 2     this.saldo += valor   ◄
 3 }
 4 public String getNomeCliente() {
 5     return this.nomeCliente;
 6 }
 7 public double getSaldo() {
 8     return this.saldo;
 9 }
```

**#99** `java/Aula5/Programa1a.java`, linhas 7 a 15. Falta o `;` na linha 2.

```
 1 double saldo;
 2 double limite   ◄
 3 public void sacar (double valor) {
 4     this.saldo -= valor;
 5 }
 6 public void depositar (double valor) {
 7     this.saldo += valor;
 8 }
```

**#100** `java/Aula5/Duke.java`, linhas 43 a 53. Falta o `;` na linha 7.

```
 1 c1.nomeCliente = "Duke";
 2 c1.saldo = 227.0;
 3 ContaBancaria c2 = new ContaBancaria();
 4 c2.nomeCliente = "Duke";
 5 c2.saldo = 100.0;
 6 if (c1 == c2) {
 7     System.out.println("As contas são iguais")   ◄
 8 } else {
 9     System.out.println("As contas são diferentes");
10 }
```

**#101** `java/Aula5/Duke.java`, linhas 51 a 60. Falta o `;` na linha 3.

```
 1 c1.saldo = 227.0;
 2 ContaBancaria c2 = new ContaBancaria();
 3 c2.nomeCliente = "Duke"   ◄
 4 c2.saldo = 100.0;
 5 if (c1 == c2) {
 6     System.out.println("As contas são iguais");
 7 } else {
 8     System.out.println("As contas são diferentes");
 9 }
```

**#102** `java/Aula5/Programa1a.java`, linhas 6 a 15. Falta o `;` na linha 3.

```
 1 String nomeCliente;
 2 double saldo;
 3 double limite   ◄
 4 public void sacar (double valor) {
 5     this.saldo -= valor;
 6 }
 7 public void depositar (double valor) {
 8     this.saldo += valor;
 9 }
```

**#103** `java/Aula5/Carro.java`, linhas 10 a 20. Falta o `;` na linha 2.

```
 1 public void ligar() {
 2     System.out.println("O carro está ligado")   ◄
 3 }
 4 public void acelerar(double quantidade) {
 5     this.velocidadeAtual += quantidade;
 6 }
 7 public void frear(double quantidade) {
 8     System.out.println("O carro está freando");
 9 }
```

**#104** Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5). Falta o `;` na linha 4.

```
 1 public class Conta {
 2     double saldo;
 3     public void depositar(double valor) {
 4         this.saldo += valor   ◄
 5     }
 6     public double getSaldo() {
 7         return this.saldo;
 8     }
 9 }
```

**#105** Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5). Falta o `;` na linha 8.

```
 1 int[] pontos = new int[5];
 2 for (int i = 0; i < pontos.length; i++) {
 3     pontos[i] = i * 2;
 4 }
 5 int maior = pontos[0];
 6 for (int p : pontos) {
 7     if (p > maior) {
 8         maior = p   ◄
 9     }
10 }
```

**#106** Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5). Falta o `;` na linha 8.

```
 1 Scanner teclado = new Scanner(System.in);
 2 System.out.print("Quantos números? ");
 3 int n = teclado.nextInt();
 4 int total = 0;
 5 for (int i = 1; i <= n; i++) {
 6     total += i;
 7 }
 8 System.out.println("Total: " + total)   ◄
```

**#107** Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5). Falta o `;` na linha 5.

```
 1 public static int contar(int[] v, int alvo) {
 2     int vezes = 0;
 3     for (int x : v) {
 4         if (x == alvo) {
 5             vezes++   ◄
 6         }
 7     }
 8     return vezes;
 9 }
```

**#108** Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5). Falta o `;` na linha 5.

```
 1 System.out.println("Contagem regressiva!");
 2 int i = 20;
 3 do {
 4     if (i % 5 == 0) {
 5         System.out.println("Fantasma " + i)   ◄
 6     }
 7     i--;
 8 } while (i > 0);
```


### Python

**#109** `py/PA/binaria2.py`, linhas 5 a 14. Falta o `:` na linha 5.

```
 1 def busca_binaria(lista, alvo):
 2     global comparacoes
 3     inicio = 0
 4     fim = len(lista) - 1
 5     while inicio <= fim   ◄
 6         meio = (inicio + fim) // 2
 7         comparacoes += 1
 8         if lista[meio] == alvo:
 9             print(f"{alvo} está no indice {meio}")
10             return
```

**#110** `py/PA/binaria2.py`, linhas 5 a 13. Falta o `:` na linha 8.

```
 1 def busca_binaria(lista, alvo):
 2     global comparacoes
 3     inicio = 0
 4     fim = len(lista) - 1
 5     while inicio <= fim:
 6         meio = (inicio + fim) // 2
 7         comparacoes += 1
 8         if lista[meio] == alvo   ◄
 9             print(f"{alvo} está no indice {meio}")
```

**#111** `py/PA/seleção.py`, linhas 3 a 11. Falta o `:` na linha 6.

```
 1 def selection_sort (lista):
 2     global comparacoes
 3     n = len(lista)
 4     for i in range(n - 1):
 5         menor = i
 6         for j in range(i + 1, n)   ◄
 7             comparacoes += 1
 8             if lista[j] < lista[menor]:
 9                 menor = j
```

**#112** `py/bla/pesquisa_binária.py`, linhas 1 a 12. Falta o `:` na linha 2.

```
 1 class Pesquisa:
 2     def __init__(self, lista, item)   ◄
 3         self.lista = lista
 4         self.item = item
 5     def pesquisa_binaria (self):
 6         baixo = 0
 7         alto = len(self.lista) - 1
 8         while baixo <= alto:
 9             meio = (baixo + alto) // 2
10             chute = self.lista[meio]
```

**#113** `py/II/1° NPC/carrinho.py`, linhas 1 a 11. Falta o `:` na linha 2.

```
 1 class Carrinho:
 2     def __init__(self)   ◄
 3         self.itens = []
 4     def adicionar_item (self, item):
 5         self.itens.append(item)
 6         print (f"{self.itens}\n")
 7 carrin = Carrinho()
 8 carrin.adicionar_item("Sabão em pó")
 9 carrin.adicionar_item("Óleo")
```

**#114** `py/PA/detran.py`, linhas 34 a 41. Falta o `:` na linha 7.

```
 1 def placa_para_numero(placa):
 2     placa = placa.upper()
 3     n = 0
 4     for caracter in placa:
 5         if caracter.isdigit():
 6             n = n * 10 + int(caracter)
 7         else   ◄
 8             n = n * 26 + (ord(caracter) - 65)
```

**#115** `py/PA/teste.py`, linhas 1 a 10. Falta o `:` na linha 7.

```
 1 def regressiva(i):
 2     print (f"{i} ")
 3     if i <= 1:
 4         return print ("Boom")
 5     else:
 6         regressiva(i-1)
 7 def main()   ◄
 8     contador = 10
 9     regressiva(contador)
```

**#116** `py/II/1° NPC/biblioteca.py`, linhas 25 a 33. Falta o `:` na linha 6.

```
 1 class Usuario:
 2     def __init__(self, nome, id_usuario):
 3         self.nome = nome
 4         self.id_usuario = id_usuario
 5         self.livros_emprestados = []
 6     def pegar_emprestado(self, livro)   ◄
 7         if livro.emprestar():
 8             self.livros_emprestados.append(livro)
```

**#117** `py/PA/detran.py`, linhas 34 a 41. Falta o `:` na linha 4.

```
 1 def placa_para_numero(placa):
 2     placa = placa.upper()
 3     n = 0
 4     for caracter in placa   ◄
 5         if caracter.isdigit():
 6             n = n * 10 + int(caracter)
 7         else:
 8             n = n * 26 + (ord(caracter) - 65)
```

**#118** `py/I/Exercicios/Listas/3.py`, linhas 9 a 18. Falta o `:` na linha 6.

```
 1 for i in range (0,5):
 2     print(f"{perguntas[i]}")
 3     resposta = int(input("(1) Sim\t(2) Não\n"))
 4     if resposta == 1:
 5         cont_sim += 1
 6 if cont_sim == 2   ◄
 7     print ("Suspeita")
 8 elif cont_sim > 2 and cont_sim < 5:
 9     print ("Cúmplice")
```

**#119** `py/PA/quiiick.py`, linhas 1 a 11. Falta o `:` na linha 6.

```
 1 def ordena(lista):
 2     tamanho_da_lista = len(lista)
 3     if tamanho_da_lista > 0:
 4         quick_sort(lista, 0, tamanho_da_lista - 1)
 5 def quick_sort(lista, inicio, fim):
 6     if inicio > fim   ◄
 7         return
 8     anterior = inicio
 9     posterior = fim
10     pivo = lista[inicio]
```

**#120** `py/II/1° NPC/carro.py`, linhas 2 a 10. Falta o `:` na linha 5.

```
 1 def __init__ (self, marca, modelo, ano):
 2     self.marca = marca
 3     self.modelo = modelo
 4     self.ano = ano
 5 def exibir_info(self)   ◄
 6     print(f"Marca: {self.marca}")
 7     print(f"Modelo: {self.modelo}")
 8     print(f"Ano: {self.ano}")
```

**#121** `py/II/1° NPC/carrinho.py`, linhas 1 a 11. Falta o `:` na linha 4.

```
 1 class Carrinho:
 2     def __init__(self):
 3         self.itens = []
 4     def adicionar_item (self, item)   ◄
 5         self.itens.append(item)
 6         print (f"{self.itens}\n")
 7 carrin = Carrinho()
 8 carrin.adicionar_item("Sabão em pó")
 9 carrin.adicionar_item("Óleo")
```

**#122** `py/I/Exercicios/Funções/6.py`, linhas 3 a 11. Falta o `:` na linha 2.

```
 1 def mdc (a, b):
 2     if a % b == 0   ◄
 3         return b
 4     else:
 5         return math.gcd(a, b)
 6 a = int(input("Digite o primeiro número: "))
 7 b = int(input("Digite o segundo número: "))
 8 print (f"O MDC de {a} e {b} é {mdc(a, b)}")
```

**#123** `py/II/1° NPC/lampada.py`, linhas 1 a 12. Falta o `:` na linha 5.

```
 1 class Lampada:
 2     def __init__(self, voltagem):
 3         self.voltagem = voltagem
 4         self.ligada = False
 5     def ligar(self)   ◄
 6         self.ligada = True
 7         print (f"Lâmpada ligada: {self.ligada}")
 8     def desligar(self):
 9         self.ligada = False
10         print (f"Lâmpda desligada: {self.ligada}")
```

**#124** `py/II/1° NPC/revisão3.py`, linhas 7 a 17. Falta o `:` na linha 7.

```
 1 maior = []
 2 menor = []
 3 motivos = []
 4 for aluno in alunos:
 5     if aluno["idade"] >= 18:
 6         maior.append(aluno["idade"])
 7     else   ◄
 8         menor.append(aluno["idade"])
 9 print (maior)
```

**#125** `py/I/Exercicios/Revisão 1/energia.py`, linhas 1 a 10. Falta o `:` na linha 5.

```
 1 def conta (kWh, instalação):
 2     if instalação == 'R':
 3         if kWh <= 500:
 4             print (f"R$ {kWh * 0.4}")
 5         else   ◄
 6             print (f"R$ {kWh * 0.65}")
 7     if instalação ==  'C':
 8         if kWh <= 1000:
 9             print (f"R$ {kWh * 0.55}")
```

**#126** `py/II/revisão3.py`, linhas 7 a 15. Falta o `:` na linha 4.

```
 1 maior = []
 2 menor = []
 3 motivos = []
 4 for aluno in alunos   ◄
 5     if aluno["idade"] >= 18:
 6         maior.append(aluno["idade"])
 7     else:
 8         menor.append(aluno["idade"])
```

**#127** `py/I/Exercicios/Revisão 1/maior_menor.py`, linhas 4 a 12. Falta o `:` na linha 3.

```
 1 for i in range (1, 3):
 2     num = int(input("Digite um número: "))
 3     if num > maior   ◄
 4         maior = num
 5     else:
 6         menor = num
 7 print (maior)
 8 print (menor)
```

**#128** `py/I/Exercicios/strings/20.py`, linhas 6 a 13. Falta o `:` na linha 6.

```
 1 if idade < 0:
 2     break
 3 elif idade > velho["idade"]:
 4     velho["nome"] = input("Digite seu nome: ")
 5     velho["idade"] = idade
 6 elif jovem["idade"] == 0 or idade < jovem["idade"]   ◄
 7     jovem["nome"] = input("Digite seu nome: ")
 8     jovem["idade"] = idade
```


## Fase Difícil (10s por código)


### C

**#129** `C/ESTRUTURA DE DADOS 2/pilha_memoria.c`, linhas 25 a 35. Falta o `;` na linha 2.

```
 1 void push(Pilha *p, float v) {
 2     NoPilha *novoNo = (NoPilha*) malloc(sizeof(NoPilha))   ◄
 3     if (novoNo == NULL) {
 4         printf("Erro: Memoria insuficiente.\n");
 5         return;
 6     }
 7     novoNo->valor = v;
 8     novoNo->prox = p->topoPilha;
 9     p->topoPilha = novoNo;
10     p->tamanho++;
11 }
```

**#130** `C/Técnicas de Programação/Estrutura de dados/Exercicios 2/tres.c`, linhas 4 a 15. Falta o `;` na linha 9.

```
 1 int vetor[10], i, x, temp = 0, somatorio = 0, negativo = 0;
 2 for (i = 0; i < 10; i++)
 3 {
 4     printf ("Digite o %d° numero: ", i + 1);
 5     scanf ("%d", &vetor[i]);
 6     somatorio += vetor[i];
 7     if (vetor[i] < 0)
 8     {
 9         negativo++   ◄
10     }
11 }
```

**#131** `C/Bla/seleção.c`, linhas 17 a 27. Falta o `;` na linha 6.

```
 1 int buscaMenor(int arr, int tamanho) {
 2     int menor = arr[0];
 3     int menor_indice = 0;
 4     for (int i = 1; i < tamanho; i++) {
 5         if (arr[i] < menor) {
 6             menor = arr[i]   ◄
 7             menor_indice = i;
 8         }
 9     }
10     return menor_indice;
11 }
```

**#132** `C/Técnicas de Programação/Estrutura de dados/Exercicios 2/BINGO.c`, linhas 139 a 150. Falta o `;` na linha 10.

```
 1 for (j = 0; j < 5; j++) {
 2     if (i == 2 && j == 2) {
 3         continue;
 4     }
 5     if (sorteio[num] == cartela[i][j][u]) {
 6         if (cartela_marcada[i][j][u] == 0) {
 7             cont_cartela[u] += 1;
 8             cartela_marcada[i][j][u] = 1;
 9         }
10         break   ◄
11     }
12 }
```

**#133** `C/ESTRUTURA DE DADOS 2/pilha_vetor.c`, linhas 44 a 54. Falta o `;` na linha 4.

```
 1 void mostra_pilha(Pilha *p) {
 2     if (pilha_vazia(p)) {
 3         printf ("Não existe nenhum elemento na lista.\n");
 4         return   ◄
 5     }
 6     printf("Conteúdo da pilha\n");
 7     for (int i=p->n-1; i >= 0; i--) {
 8         printf("%0.f ", p->vet[i]);
 9     }
10     printf("\n");
11 }
```

**#134** `C/Técnicas de Programação/Estrutura de dados/Exercicios 2/tres.c`, linhas 4 a 15. Falta o `;` na linha 6.

```
 1 int vetor[10], i, x, temp = 0, somatorio = 0, negativo = 0;
 2 for (i = 0; i < 10; i++)
 3 {
 4     printf ("Digite o %d° numero: ", i + 1);
 5     scanf ("%d", &vetor[i]);
 6     somatorio += vetor[i]   ◄
 7     if (vetor[i] < 0)
 8     {
 9         negativo++;
10     }
11 }
```

**#135** `C/ESTRUTURA DE DADOS 2/fila_dinamica.c`, linhas 36 a 46. Falta o `;` na linha 5.

```
 1 if (filaVazia(f)) {
 2     f->inicioFila = novoNo;
 3 }
 4 else {
 5     NoFila *atual = f->inicioFila   ◄
 6     while (atual->prox != NULL) {
 7         atual = atual->prox;
 8     }
 9     atual->prox = novoNo;
10 }
11 f->tamanho++;
```

**#136** `C/Técnicas de Programação/Estrutura de dados/Exercicios 3/7.c`, linhas 1 a 12. Falta o `;` na linha 7.

```
 1 #include<stdio.h>
 2 #include<stdlib.h>
 3 int max4 (int numeros[], int n) {
 4     int maior = numeros[0];
 5     for (int i = 1; i < (n - 1); i++) {
 6         if (numeros[i] > maior) {
 7             maior = numeros[i]   ◄
 8         }
 9     }
10     return maior;
11 }
```

**#137** `C/Técnicas de Programação/Estrutura de dados/Exercicios 3/2.c`, linhas 12 a 23. Falta o `;` na linha 11.

```
 1 for (int i = 0; i < 10; i++)
 2 {
 3     for (int j = 0; string[j] != '\0'; j++)
 4     {
 5         if (string[j] == vogais[i])
 6         {
 7             cont_vogais += 1;
 8         }
 9     }
10 }
11 printf ("Contador de vogais: %d", cont_vogais)   ◄
```

**#138** `C/Introdução a Programação/Lista de Exercícios 2/Questão 13.c`, linhas 5 a 23. Falta o `;` na linha 6.

```
 1 int x, i, contador = 0;
 2 printf("Digite um número: ");
 3 scanf("%d", &x);
 4 if (x <= 1) {
 5     printf("%d não é primo.\n", x);
 6     return 0   ◄
 7 }
 8 for (i = 1; i <= x; i++) {
 9     if (x % i == 0) {
10         contador++;
11     }
12 }
```

**#139** `C/Técnicas de Programação/Estrutura de dados/Exercicios 3/4.c`, linhas 5 a 17. Falta o `;` na linha 11.

```
 1 char string[100], valor = '-';
 2 puts("Digite uma string: ");
 3 fgets(string, 99, stdin);
 4 for (int i = 0; string[i] != '\0'; i++)
 5 {
 6     if (string[i] == ' ')
 7     {
 8         string[i] = valor;
 9     }
10 }
11 printf (string)   ◄
```

**#140** `C/Bla/Somatório2.c`, linhas 3 a 17. Falta o `;` na linha 5.

```
 1 int main () {
 2     int a, i, s = 0;
 3     for (i = 1; i <= 10; i++)
 4     {
 5         printf ("Digite um número: ")   ◄
 6         scanf ("%d", &a);
 7         s = s + a;
 8     }
 9     printf ("Somatório: %d", s);
10     return 0;
11 }
```

**#141** `C/ESTRUTURA DE DADOS 2/fila_dinamica.c`, linhas 9 a 21. Falta o `;` na linha 6.

```
 1 typedef struct {
 2     int tamanho;
 3     NoFila *inicioFila;
 4 } Fila;
 5 Fila* criarFila() {
 6     Fila *f = (Fila*) malloc(sizeof(Fila))   ◄
 7     if (f != NULL) {
 8         f->tamanho = 0;
 9         f->inicioFila = NULL;
10     }
11     return f;
12 }
```

**#142** `C/ESTRUTURA DE DADOS 2/Encadeado.c`, linhas 42 a 52. Falta o `;` na linha 3.

```
 1 if (aux -> dados == a) {
 2     if (L == aux) {
 3         L = aux -> proxNo   ◄
 4     }
 5     else {
 6         ant -> proxNo = aux -> proxNo;
 7     }
 8     free(aux);
 9     return 1;
10 }
11 ant = aux;
```

**#143** `C/Técnicas de Programação/Estrutura de dados/Exercicios 3/9.c`, linhas 6 a 17. Falta o `;` na linha 5.

```
 1 int fim = n - 1;
 2 while (inicio <= fim) {
 3     int meio = (inicio + fim) / 2;
 4     if (vetor[meio] == valor) {
 5         return meio   ◄
 6     } else if (vetor[meio] < valor) {
 7         inicio = meio + 1;
 8     } else {
 9         fim = meio - 1;
10     }
11 }
12 return -1;
```

**#144** `C/ESTRUTURA DE DADOS 1/Funções/6.c`, linhas 6 a 16. Falta o `;` na linha 2.

```
 1 int main () {
 2     float notas[10]   ◄
 3     int i;
 4     for (i = 0; i < 10; i++)
 5     {
 6         printf ("Digite a nota do %d° aluno: ", i+1);
 7         scanf ("%f", &notas[i]);
 8     }
 9     printf ("\n");
10     media(notas);
11 }
```

**#145** `C/Bla/Somatório.c`, linhas 1 a 19. Falta o `;` na linha 4.

```
 1 #include<stdio.h>
 2 int main () {
 3     int n, i, s;
 4     printf ("Digite um número: ")   ◄
 5     scanf ("%d", &n);
 6     s = 0;
 7     for (i = 1; i <= n; i++)
 8     {
 9         s = s + i;
10     }
11     printf ("Somatorio = %d", s);
12 }
```

**#146** `C/Introdução a Programação/Lista de Exercícios 2/Questão 13.c`, linhas 5 a 23. Falta o `;` na linha 3.

```
 1 int x, i, contador = 0;
 2 printf("Digite um número: ");
 3 scanf("%d", &x)   ◄
 4 if (x <= 1) {
 5     printf("%d não é primo.\n", x);
 6     return 0;
 7 }
 8 for (i = 1; i <= x; i++) {
 9     if (x % i == 0) {
10         contador++;
11     }
12 }
```

**#147** `C/ESTRUTURA DE DADOS 2/pilha_vetor.c`, linhas 16 a 27. Falta o `;` na linha 6.

```
 1 int pilha_vazia(Pilha *p) {
 2     return (p->n==0);
 3 }
 4 void pilha_push(Pilha *p, float v) {
 5     if (p->n==N) {
 6         printf("Capacidade da pilha esgotada.\n")   ◄
 7         return;
 8     }
 9     p->vet[p->n]=v;
10     p->n++;
11 }
```

**#148** `C/Bla/Somatório2.c`, linhas 1 a 17. Falta o `;` na linha 7.

```
 1 #include<stdio.h>
 2 int main () {
 3     int a, i, s = 0;
 4     for (i = 1; i <= 10; i++)
 5     {
 6         printf ("Digite um número: ");
 7         scanf ("%d", &a)   ◄
 8         s = s + a;
 9     }
10     printf ("Somatório: %d", s);
11     return 0;
12 }
```


### Java

**#149** `java/Aula3/While.java`, linhas 5 a 15. Falta o `;` na linha 3.

```
 1 public class While {
 2     public static void main (String[] args) {
 3         int i = 1   ◄
 4         while (i <= 15) {
 5             if (i % 2 == 0) {
 6                 JOptionPane.showMessageDialog(null, i);
 7             }
 8             i++;
 9         }
10     }
11 }
```

**#150** `java/Aula3/Multiplo.java`, linhas 1 a 13. Falta o `;` na linha 8.

```
 1 package Aula3;
 2 import javax.swing.JOptionPane;
 3 public class Multiplo {
 4     public static void main(String[] args) {
 5         int i = 1;
 6         do {
 7             JOptionPane.showMessageDialog(null, i * 3);
 8             i++   ◄
 9         } while (i <= 100);
10     }
11 }
```

**#151** `java/Aula3/Nuuumeros.java`, linhas 1 a 13. Falta o `;` na linha 8.

```
 1 package Aula3;
 2 import javax.swing.JOptionPane;
 3 public class Nuuumeros {
 4     public static void main(String[] args) {
 5         int i = 150;
 6         do {
 7             JOptionPane.showMessageDialog(null, i);
 8             i++   ◄
 9         } while (i <= 300);
10     }
11 }
```

**#152** `java/Aula3/DoWhile.java`, linhas 1 a 13. Falta o `;` na linha 2.

```
 1 package Aula3;
 2 import javax.swing.JOptionPane   ◄
 3 public class DoWhile {
 4     public static void main(String[] args) {
 5         int i = -1;
 6         do {
 7             JOptionPane.showMessageDialog(null, i);
 8             i--;
 9         } while (i >= -10);
10     }
11 }
```

**#153** `java/Aula3/Naturais.java`, linhas 1 a 13. Falta o `;` na linha 5.

```
 1 package Aula3;
 2 import javax.swing.JOptionPane;
 3 public class Naturais {
 4     public static void main(String[] args) {
 5         int i = 1   ◄
 6         do {
 7             JOptionPane.showMessageDialog(null, i);
 8             i++;
 9         } while (i <= 20);
10     }
11 }
```

**#154** `java/Aula5/Duke.java`, linhas 11 a 21. Falta o `;` na linha 3.

```
 1 public boolean sacar(double valor) {
 2     if (valor <= (this.saldo + this.limite)) {
 3         this.saldo -= valor   ◄
 4         return true;
 5     } else {
 6         return false;
 7     }
 8 }
 9 public void depositar(double valor) {
10     this.saldo += valor;
11 }
```

**#155** `java/Aula4/Matriz2.java`, linhas 6 a 17. Falta o `;` na linha 8.

```
 1 for (int i = 0; i < matriz.length; i++) {
 2     for (int j = 0; j < matriz.length; j++) {
 3         matriz[i][j] = i * j;
 4     }
 5 }
 6 for (int i = 0; i < matriz.length; i++) {
 7     for (int j = 0; j < matriz.length; j++) {
 8         System.out.print(matriz[i][j] + " ")   ◄
 9     }
10     System.out.println();
11 }
```

**#156** `java/Aula5/Operacao.java`, linhas 6 a 17. Falta o `;` na linha 7.

```
 1 double limite;
 2 public boolean sacar(double valor) {
 3     if (valor <= (this.saldo + this.limite)) {
 4         this.saldo -= valor;
 5         return true;
 6     } else {
 7         return false   ◄
 8     }
 9 }
10 public void depositar(double valor) {
11     this.saldo += valor;
12 }
```

**#157** `java/Aula5/Operacao.java`, linhas 7 a 17. Falta o `;` na linha 3.

```
 1 public boolean sacar(double valor) {
 2     if (valor <= (this.saldo + this.limite)) {
 3         this.saldo -= valor   ◄
 4         return true;
 5     } else {
 6         return false;
 7     }
 8 }
 9 public void depositar(double valor) {
10     this.saldo += valor;
11 }
```

**#158** `java/Aula5/Duke.java`, linhas 9 a 20. Falta o `;` na linha 4.

```
 1 double limite;
 2 public boolean sacar(double valor) {
 3     if (valor <= (this.saldo + this.limite)) {
 4         this.saldo -= valor   ◄
 5         return true;
 6     } else {
 7         return false;
 8     }
 9 }
10 public void depositar(double valor) {
11     this.saldo += valor;
12 }
```

**#159** `java/Aula5/TesteClienteConta.java`, linhas 11 a 21. Falta o `;` na linha 10.

```
 1 public boolean sacar(double valor) {
 2     if (valor <= (this.saldo + this.limite)) {
 3         this.saldo -= valor;
 4         return true;
 5     } else {
 6         return false;
 7     }
 8 }
 9 public void depositar(double valor) {
10     this.saldo += valor   ◄
11 }
```

**#160** `java/Laço.java`, linhas 1 a 11. Falta o `;` na linha 5.

```
 1 public class Laço {
 2     public static void main (String args[]) {
 3         int [] idades = new int[10];
 4         for (int i = 0; i < 10; i++) {
 5             idades[i] = i * 10   ◄
 6         }
 7         for (int x: idades) {
 8             System.out.println(x);
 9         }
10     }
11 }
```

**#161** `java/Aula5/TesteClienteConta.java`, linhas 8 a 18. Falta o `;` na linha 7.

```
 1 double saldo;
 2 double limite;
 3 Cliente titular;
 4 public boolean sacar(double valor) {
 5     if (valor <= (this.saldo + this.limite)) {
 6         this.saldo -= valor;
 7         return true   ◄
 8     } else {
 9         return false;
10     }
11 }
```

**#162** `java/Aula5/Duke.java`, linhas 8 a 18. Falta o `;` na linha 9.

```
 1 double saldo;
 2 double limite;
 3 Cliente titular;
 4 public boolean sacar(double valor) {
 5     if (valor <= (this.saldo + this.limite)) {
 6         this.saldo -= valor;
 7         return true;
 8     } else {
 9         return false   ◄
10     }
11 }
```

**#163** `java/Aula4/Matriz1.java`, linhas 26 a 38. Falta o `;` na linha 3.

```
 1 for (int i = 0; i < matrizC.length; i++) {
 2     for (int j = 0; j < matrizC.length; j++) {
 3         matrizC[i][j] = matrizA[i][j] + matrizB[i][j]   ◄
 4     }
 5 }
 6 System.out.println("Matriz A:");
 7 for (int i = 0; i < matrizA.length; i++) {
 8     for (int j = 0; j < matrizA.length; j++) {
 9         System.out.print(matrizA[i][j] + " ");
10     }
11     System.out.println();
12 }
```

**#164** `java/Aula5/Duke.java`, linhas 7 a 18. Falta o `;` na linha 10.

```
 1 String nomeCliente;
 2 double saldo;
 3 double limite;
 4 Cliente titular;
 5 public boolean sacar(double valor) {
 6     if (valor <= (this.saldo + this.limite)) {
 7         this.saldo -= valor;
 8         return true;
 9     } else {
10         return false   ◄
11     }
12 }
```

**#165** `java/Aula3/While.java`, linhas 3 a 15. Falta o `;` na linha 7.

```
 1 import javax.swing.JOptionPane;
 2 public class While {
 3     public static void main (String[] args) {
 4         int i = 1;
 5         while (i <= 15) {
 6             if (i % 2 == 0) {
 7                 JOptionPane.showMessageDialog(null, i)   ◄
 8             }
 9             i++;
10         }
11     }
12 }
```

**#166** `java/Aula5/Operacao.java`, linhas 4 a 14. Falta o `;` na linha 2.

```
 1 String nomeCliente;
 2 double saldo   ◄
 3 double limite;
 4 public boolean sacar(double valor) {
 5     if (valor <= (this.saldo + this.limite)) {
 6         this.saldo -= valor;
 7         return true;
 8     } else {
 9         return false;
10     }
11 }
```

**#167** `java/Aula5/TesteClienteConta.java`, linhas 10 a 21. Falta o `;` na linha 11.

```
 1 Cliente titular;
 2 public boolean sacar(double valor) {
 3     if (valor <= (this.saldo + this.limite)) {
 4         this.saldo -= valor;
 5         return true;
 6     } else {
 7         return false;
 8     }
 9 }
10 public void depositar(double valor) {
11     this.saldo += valor   ◄
12 }
```

**#168** `java/Aula4/Matriz2.java`, linhas 5 a 17. Falta o `;` na linha 9.

```
 1 double[][] matriz = new double[4][4];
 2 for (int i = 0; i < matriz.length; i++) {
 3     for (int j = 0; j < matriz.length; j++) {
 4         matriz[i][j] = i * j;
 5     }
 6 }
 7 for (int i = 0; i < matriz.length; i++) {
 8     for (int j = 0; j < matriz.length; j++) {
 9         System.out.print(matriz[i][j] + " ")   ◄
10     }
11     System.out.println();
12 }
```

**#169** Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5). Falta o `;` na linha 8.

```
 1 public class Cofre {
 2     double saldo;
 3     double limite;
 4     public boolean sacar(double valor) {
 5         if (valor > this.saldo + this.limite) {
 6             return false;
 7         }
 8         this.saldo -= valor   ◄
 9         return true;
10     }
11 }
```

**#170** Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5). Falta o `;` na linha 9.

```
 1 int[][] m = new int[3][3];
 2 for (int i = 0; i < 3; i++) {
 3     for (int j = 0; j < 3; j++) {
 4         m[i][j] = i + j;
 5     }
 6 }
 7 int soma = 0;
 8 for (int i = 0; i < 3; i++) {
 9     soma += m[i][i]   ◄
10 }
11 System.out.println(soma);
```

**#171** Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5). Falta o `;` na linha 8.

```
 1 int[] v = {2, 5, 6, 9, 10};
 2 int pares = 0;
 3 int impares = 0;
 4 for (int i = 0; i < v.length; i++) {
 5     if (v[i] % 2 == 0) {
 6         pares++;
 7     } else {
 8         impares++   ◄
 9     }
10 }
11 System.out.println("Pares: " + pares);
12 System.out.println("Ímpares: " + impares);
```

**#172** Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5). Falta o `;` na linha 7.

```
 1 int i = 1;
 2 int soma = 0;
 3 while (i <= 20) {
 4     if (i % 2 == 0) {
 5         soma += i;
 6     } else if (i % 5 == 0) {
 7         soma += 1   ◄
 8     }
 9     i++;
10 }
11 System.out.println("Soma: " + soma);
```

**#173** Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5). Falta o `;` na linha 6.

```
 1 public class Fantasma {
 2     String nome;
 3     int energia;
 4     public Fantasma(String nome, int energia) {
 5         this.nome = nome;
 6         this.energia = energia   ◄
 7     }
 8     public void assustar() {
 9         this.energia -= 10;
10         System.out.println(this.nome + " assustou!");
11     }
12 }
```

**#174** Trecho criado no estilo das aulas (Aula3, Aula4 e Aula5). Falta o `;` na linha 10.

```
 1 public static double media(double[] notas) {
 2     System.out.println("Calculando...");
 3     double soma = 0;
 4     for (double n : notas) {
 5         soma += n;
 6     }
 7     if (notas.length == 0) {
 8         return 0;
 9     }
10     return soma / notas.length   ◄
11 }
```


### Python

**#175** `py/bla/pesquisa_binária.py`, linhas 1 a 15. Falta o `:` na linha 2.

```
 1 class Pesquisa:
 2     def __init__(self, lista, item)   ◄
 3         self.lista = lista
 4         self.item = item
 5     def pesquisa_binaria (self):
 6         baixo = 0
 7         alto = len(self.lista) - 1
 8         while baixo <= alto:
 9             meio = (baixo + alto) // 2
10             chute = self.lista[meio]
11             if (chute == self.item):
12                 return meio
```

**#176** `py/I/Exercicios/Funções/7.py`, linhas 1 a 13. Falta o `:` na linha 3.

```
 1 def fibonacci (n):
 2     resultado = []
 3     for i in range(0, n+1)   ◄
 4         if i == 0:
 5             resultado.append(0)
 6         elif i == 1:
 7             resultado.append(1)
 8         else:
 9             resultado.append(resultado[i-1] + resultado[i-2])
10     return resultado
11 n = int(input("Digite um número: "))
```

**#177** `py/I/Exercicios/Funções/7.py`, linhas 1 a 13. Falta o `:` na linha 6.

```
 1 def fibonacci (n):
 2     resultado = []
 3     for i in range(0, n+1):
 4         if i == 0:
 5             resultado.append(0)
 6         elif i == 1   ◄
 7             resultado.append(1)
 8         else:
 9             resultado.append(resultado[i-1] + resultado[i-2])
10     return resultado
11 n = int(input("Digite um número: "))
```

**#178** `py/I/Exercicios/Listas/1.py`, linhas 6 a 19. Falta o `:` na linha 10.

```
 1 for i in range (0, 30):
 2     print (f"Aluno {i+1}:")
 3     idade = int(input("Idade: "))
 4     idade_vetor.append(idade)
 5     altura = float(input("Altura: "))
 6     altura_vetor.append(altura)
 7     soma += altura_vetor[i]
 8 media = soma / 30
 9 for i in range (0, 30):
10     if idade[i] > 13   ◄
11         if altura[i] < media:
12             contador += 1
```

**#179** `py/II/1° NPC/biblioteca2.py`, linhas 18 a 29. Falta o `:` na linha 10.

```
 1 def to_dict(self):
 2     return {
 3         "titulo": self.titulo,
 4         "autor": self.autor,
 5         "isbn": self.isbn,
 6         "disponivel": self.disponivel,
 7         "data_cadastro": self.data_cadastro
 8     }
 9 def emprestar(self):
10     if self.disponivel   ◄
11         self.disponivel = False
```

**#180** `py/PA/linear2.py`, linhas 221 a 234. Falta o `:` na linha 11.

```
 1 if inicio > fim:
 2     return
 3 anterior = inicio
 4 posterior = fim
 5 pivo = lista[inicio]
 6 while anterior < posterior:
 7     while anterior < posterior:
 8         comparacoes += 1
 9         if lista[posterior] > pivo:
10             posterior = posterior - 1
11         else   ◄
12             break
```

**#181** `py/I/Exercicios/Listas/1.py`, linhas 6 a 19. Falta o `:` na linha 11.

```
 1 for i in range (0, 30):
 2     print (f"Aluno {i+1}:")
 3     idade = int(input("Idade: "))
 4     idade_vetor.append(idade)
 5     altura = float(input("Altura: "))
 6     altura_vetor.append(altura)
 7     soma += altura_vetor[i]
 8 media = soma / 30
 9 for i in range (0, 30):
10     if idade[i] > 13:
11         if altura[i] < media   ◄
12             contador += 1
```

**#182** `py/PA/seleção.py`, linhas 3 a 13. Falta o `:` na linha 6.

```
 1 def selection_sort (lista):
 2     global comparacoes
 3     n = len(lista)
 4     for i in range(n - 1):
 5         menor = i
 6         for j in range(i + 1, n)   ◄
 7             comparacoes += 1
 8             if lista[j] < lista[menor]:
 9                 menor = j
10         lista[i], lista[menor] = lista[menor], lista[i]
11     return print(lista)
```

**#183** `py/PA/binaria2.py`, linhas 5 a 16. Falta o `:` na linha 8.

```
 1 def busca_binaria(lista, alvo):
 2     global comparacoes
 3     inicio = 0
 4     fim = len(lista) - 1
 5     while inicio <= fim:
 6         meio = (inicio + fim) // 2
 7         comparacoes += 1
 8         if lista[meio] == alvo   ◄
 9             print(f"{alvo} está no indice {meio}")
10             return
11         elif lista[meio] > alvo:
12             fim = meio - 1
```

**#184** `py/bla/pesquisa_binária.py`, linhas 6 a 19. Falta o `:` na linha 4.

```
 1 def pesquisa_binaria (self):
 2     baixo = 0
 3     alto = len(self.lista) - 1
 4     while baixo <= alto   ◄
 5         meio = (baixo + alto) // 2
 6         chute = self.lista[meio]
 7         if (chute == self.item):
 8             return meio
 9         if (chute > self.item):
10             alto = meio - 1
11         else:
12             baixo = meio + 1
```

**#185** `py/PA/merge.py`, linhas 21 a 32. Falta o `:` na linha 6.

```
 1 while inicio <= fim_primeira_parte and meio <= fim:
 2     comparacoes += 1
 3     if lista[inicio] <= lista[meio]:
 4         lista_temporaria[indice_temporario] = lista[inicio]
 5         inicio += 1
 6     else   ◄
 7         lista_temporaria[indice_temporario] = lista[meio]
 8         meio += 1
 9     indice_temporario += 1
10 while inicio <= fim_primeira_parte:
11     lista_temporaria[indice_temporario] = lista[inicio]
```

**#186** `py/PA/linear2.py`, linhas 236 a 248. Falta o `:` na linha 10.

```
 1 if anterior < posterior:
 2     lista[anterior] = lista[posterior]
 3     anterior = anterior + 1
 4 while anterior < posterior:
 5     comparacoes += 1
 6     if lista[anterior] <= pivo:
 7         anterior = anterior + 1
 8     else:
 9         break
10 if anterior < posterior   ◄
11     lista[posterior] = lista[anterior]
```

**#187** `py/I/Exercicios/Listas/4.py`, linhas 14 a 24. Falta o `:` na linha 10.

```
 1 for i in range(0, 10):
 2     if vendas[i] >= 200.00 and vendas[i] < 300:
 3         cont_faixa[0] += 1
 4     elif vendas[i] >= 300 and vendas[i] < 400:
 5         cont_faixa[1] += 1
 6     elif vendas[i] >= 400 and vendas[i] < 500:
 7         cont_faixa[2] += 1
 8     elif vendas[i] >= 500 and vendas[i] < 600:
 9         cont_faixa[3] += 1
10     elif vendas[i] >= 600 and vendas[i] < 700   ◄
11         cont_faixa[4] += 1
```

**#188** `py/I/Exercicios/Funções/7.py`, linhas 1 a 14. Falta o `:` na linha 8.

```
 1 def fibonacci (n):
 2     resultado = []
 3     for i in range(0, n+1):
 4         if i == 0:
 5             resultado.append(0)
 6         elif i == 1:
 7             resultado.append(1)
 8         else   ◄
 9             resultado.append(resultado[i-1] + resultado[i-2])
10     return resultado
11 n = int(input("Digite um número: "))
12 print (f"{fibonacci(n)}")
```

**#189** `py/PA/linear2.py`, linhas 214 a 226. Falta o `:` na linha 5.

```
 1 def ordena(lista):
 2     tamanho_da_lista = len(lista)
 3     if tamanho_da_lista > 0:
 4         quick_sort(lista, 0, tamanho_da_lista - 1)
 5 def quick_sort(lista, inicio, fim)   ◄
 6     global comparacoes
 7     if inicio > fim:
 8         return
 9     anterior = inicio
10     posterior = fim
11     pivo = lista[inicio]
```

**#190** `py/II/1° NPC/biblioteca2.py`, linhas 18 a 29. Falta o `:` na linha 9.

```
 1 def to_dict(self):
 2     return {
 3         "titulo": self.titulo,
 4         "autor": self.autor,
 5         "isbn": self.isbn,
 6         "disponivel": self.disponivel,
 7         "data_cadastro": self.data_cadastro
 8     }
 9 def emprestar(self)   ◄
10     if self.disponivel:
11         self.disponivel = False
```

**#191** `py/PA/binaria.py`, linhas 7 a 17. Falta o `:` na linha 4.

```
 1 while inicio <= fim:
 2     meio = (inicio + fim) // 2
 3     comparacoes += 1
 4     if lista[meio] == alvo   ◄
 5         print(f"{alvo} está no indice {meio}")
 6         return
 7     elif lista[meio] > alvo:
 8         fim = meio - 1
 9     else:
10         inicio = meio + 1
11 print (f"{alvo} não está na lista")
```

**#192** `py/I/Exercicios/Listas/4.py`, linhas 14 a 24. Falta o `:` na linha 8.

```
 1 for i in range(0, 10):
 2     if vendas[i] >= 200.00 and vendas[i] < 300:
 3         cont_faixa[0] += 1
 4     elif vendas[i] >= 300 and vendas[i] < 400:
 5         cont_faixa[1] += 1
 6     elif vendas[i] >= 400 and vendas[i] < 500:
 7         cont_faixa[2] += 1
 8     elif vendas[i] >= 500 and vendas[i] < 600   ◄
 9         cont_faixa[3] += 1
10     elif vendas[i] >= 600 and vendas[i] < 700:
11         cont_faixa[4] += 1
```

**#193** `py/PA/teste.py`, linhas 1 a 13. Falta o `:` na linha 10.

```
 1 def regressiva(i):
 2     print (f"{i} ")
 3     if i <= 1:
 4         return print ("Boom")
 5     else:
 6         regressiva(i-1)
 7 def main():
 8     contador = 10
 9     regressiva(contador)
10 if __name__ == "__main__"   ◄
11     main()
```

**#194** `py/II/1° NPC/lampada.py`, linhas 1 a 14. Falta o `:` na linha 2.

```
 1 class Lampada:
 2     def __init__(self, voltagem)   ◄
 3         self.voltagem = voltagem
 4         self.ligada = False
 5     def ligar(self):
 6         self.ligada = True
 7         print (f"Lâmpada ligada: {self.ligada}")
 8     def desligar(self):
 9         self.ligada = False
10         print (f"Lâmpda desligada: {self.ligada}")
11 luz = Lampada(220)
```
