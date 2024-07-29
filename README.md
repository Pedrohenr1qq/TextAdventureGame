# TextAdventureGame
A text-based game about an RPG story. Made in JavaScript, with Node.js, and utilizing the Object-Oriented Programming paradigm.

## Requisitos
 - Ter um computador
 - Baixar o arquivo .zip ou fazer um `git clone` do source-code do programa
 - Ter Node.Js instalado
 - Instalar as dependências necessárias para rodar o programa
 - Dependências externas:
   - prompt-sync()

### Obtendo o programa
Clique no botão verde escrito <> Code
.
Se você quiser instalar o arquivo .zip, clique na opção Download ZIP. Após isso, descompacte o arquivo .zip baixado no lugar de sua escolha.

Caso tenha optado por baixar via `git clone`, copie o link https do programa --> `https://github.com/Pedrohenr1qq/TextAdventureGame.git`.

Abra um terminal ou prompt de comando.

Vá para o diretório onde deseja baixar o programa e digite o seguinte comando:

```
git clone https://github.com/Pedrohenr1qq/TextAdventureGame.git 
```

Verifique se o programa foi baixado corretamente. Caso sim, você pode seguir com a explicação abaixo.

### Instalando Node.Js
Você pode realizar a instalação do Node.Js, de acordo com seu Sistema Operacional (Windows, Linux ou MacOS) no site abaixo:
[Instalar Node.Js (Alura)](https://www.alura.com.br/artigos/como-instalar-node-js-windows-linux-macos)

### Instalando as dependências
Após instalar o Node.Js, abra um terminal no mesmo diretório de onde está o código e digite o comando abaixo:

```
npm install prompt-sync
```

## Sobre o jogo 
Esse é um jogo que se passa em uma dungeon, chamada Dungeon das Bestas. Cada jogador é considerado um aventureiro. Um aventureiro é alguem que busca por novos desafios e explora lugares que poucos teriam coragem de adentrar. A missão do aventureiro é concluir cada andar da Dungeon e finaliza-la após derrotar os monstros no ultimo andar. 

Caro jogador, você tem a coragem necessária para se tornar um aventureiro? 
Se sim, embarque nessa jornada e grave seu nome na história. 

### Dungeon
A Dungeon das Bestas é uma dungeon dividida em andares, cada andar repleto de monstros diferentes e com suas características. Mas não pense que a Dungeon é apenas uma construção. Ela é capaz de sentir se aqueles que desbravam seu interior possuem a coragem necessária para tal. Por isso, caro aventureiro, antes de entrar nesse local repleto de morte e destruição, verifique se vocẽ possui a coragem e a capacidade para tal. 

E lembre-se:  a Dungeon está sempre de olho em você. Ainda que você se esconda dos monstros da dungeon, ela saberá e fará de tudo para expulsar covardes de dentro dela. Então, caro aventureiro, seja destemido e enfrente os monstros dessa dungeon de frente, sem nada a temer. 

Para conquistar a Dungeon, você deve completar todos os andares e derrotar os monstros em cada andar. 

### Classes
O jogador pode escolher classes para adentrar a Dungeon. Classes são personagens com determinados atributos que um jogador pode escolher.

Cada classe possui os atributos: 
 - Nome da classe
 - Vida
 - Defesa
 - Poder de Ataque
 - Moedas

As classes disponíveis são:
 - Guerreiro
 - Mago
 - Arqueiro
 - Ladino

Cada uma com seus valores de atributos definidos. 

### Monstros
Cada andar possui 2 monstros, o segundo mais forte que o primeiro. O jogador tem a opção de pular a luta contra o primeiro monstro. Mas cuidado, a Dungeon odeia fracos que pulam lutas. Portanto, ela fará de tudo para tentar elimina-lo. 

Os monstros possuem os atributos: 
 - Nome do Monstro
 - Vida
 - Defesa
 - Poder de Ataque
 - Valor

A partir do segundo andar, os monstros possuem habilidades especiais que causam efeitos no jogador. A duração dessa habilidade pode variar de monstro pra monstro, e o jogador deve aguentar durante esse tempo ou derrotar o monstro antes que seja derrotado.

### Recompensas e Aumento de Nível
Sempre que o jogador derrotar um monstro, ele recebe um pequeno upgrade em seus atributos. Quanto mais forte o monstro, maior o upgrade.

Ao finalizar um andar, o jogador recebe um aumento de nível, que faz com que todos os seus atributos aumentem de acordo com o nível que se enconctra. Quanto mais alto o andar, maior é o aumento de nível.

### Inventário e Loja de Itens 
Recurso ainda a definir...

## Como jogar
Para iniciar o jogo, abra o terminal ou o prompt de comando

Entre na pasta onde você baixou o programa. 

Entre na pasta `src` e digite o comando abaixo para iniciar o jogo:
```
node index.js
```

Após isso, aproveite o jogo

O jogo é um jogo-texto, ou seja, há apenas texto envolvido. O jogador deverá tomar decisões ao longo do jogo e suas decisões impactarão na sua vitória. Portanto, cada decisão deve ser pensada com cuidado e com responsabiliade. Além disso, nem sempre as decisões do jogador serão aceitadas pela Dungeon. Por isso, caro aventureiro, busque sempre lutar quando possível. Assim, caso derrote o monstro, conseguirá bonus e aumentará suas chances de completar a Dungeon.

Sendo assim, sem mais demora, vamos começar sua jornada.
