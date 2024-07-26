const FaseGeral = require('./FaseGeral');
const Fantasma = require('../Personagens/Monstros/andar_2/Fantasma');
const Basilico = require('../Personagens/Monstros/andar_2/Basilico');

const fantasma = new Fantasma();
const basilico = new Basilico();

class Fase_2 extends FaseGeral{
    entradaSecreta = false;
    gameOver = false;
    constructor(){
        super("Andar das Bestas Mágicas")
    }

    getNome(){
        return this.nome;
    }

    apresentarFase(){
        console.log(` =================== ${this.getNome()} ===============================`);
        console.log(`Seja bem vindo caro jogador ao primeiro andar desta dungeon!`);
        console.log("Este andar é repleto de seres mágicos e imprevisíveis.");
        console.log("Você tem a destreza e, principalmente, a sorte para iniciar nesta jornada? ");
    }

    async lutar(monstro, jogador){
        let danoJogador, danoMonstro, rodada = 1, danoInicialJogador, pretrificacao = false;

        console.log("\n -------------------------- LUTA COM O MONSTRO -------------------------------------\n");
        console.log(`O jogador da classe ${jogador.getNome()} esta lutando com o monstro ${monstro.getNome()}`);
        
        while((jogador.getVida() > 0) && (monstro.getVida() > 0)){
            console.log("Lutando... \n");
            console.log(`\n--------------------- RODADA - ${rodada} ------------------------\n`);
            await this.utilities.sleep(1);

            if(rodada == 3){
                if(monstro.index == 0) danoInicialJogador = monstro.ataqueEspecial(jogador);
                else pretrificacao = monstro.ataqueEspecial(jogador);
                console.log("");
                this.utilities.esperarValorUsuario();
            }

            if(rodada == 5){ // Após duas rodadas, o jogador volta ao normal
                console.log("\nParabéns Aventureiro, o efeito de ataque especial do monstro passou. Você aguentou bem...\n");
                if(monstro.index == 0) jogador.setPoderAtaque(danoInicialJogador);
                pretrificacao = false;
                this.utilities.esperarValorUsuario();
            }

            if(!pretrificacao){
                danoJogador = jogador.atacar();
                monstro.sofrerDano(danoJogador);
            }

            if(monstro.getVida() <= 0){
                console.log("Monstro Derrotado");
                break;
            }
    
            danoMonstro = monstro.atacar();
            jogador.sofrerDano(danoMonstro);

            rodada++;
        }

        console.log("Luta encerrada...\n");

        console.log(`Vida do ${jogador.getNome()} : ${this.utilities.arredondarValor(jogador.getVida())}`);

        if(jogador.getVida() <= 0){
            console.log(`O aventureiro da classe ${jogador.getNome()} morreu ao lutar contra o ${monstro.getNome()} no ${this.getNome()}!`);
            this.gameOver = true;

        }else{
            this.receberRecompensas(jogador, monstro);
            this.gameOver = false;
        }

    }

    async lutarComMonstro(monstro, jogador){
        console.log(`Você estava andando pelo caminho e acabou se deparando com uma movimentação estranha. Logo você percebe que se encontrou com um monstro. `);
        let vaiLutar = this.encontroComMonstro(monstro, jogador);
        if(vaiLutar){
            await this.lutar(monstro, jogador);
        }
    }

    encontroEntradaSecreta(){
        let userInput;
        console.log("-----------------------------------------------------------------------------------------------");
        console.log("Ao andar pela dundeon, você se deparou com uma porta secreta");
        console.log("Coberta de mugos e simbolos arcanos, ela parece levar para um local cheio de riquezas desconhecidas da dungeon.")
        console.log("Se você seguir adiante, entrará na fase final e, caso consiga derrotar os ultimos montros, terá concluído a dungeon e seu nome entrará para a história.");
        console.log("E então, caro aventureiro, o que você irá fazer? ");
        console.log("");
        userInput = this.utilities.validarValorUsuario("Digite y para adentrar a porta secreta e qualquer outro valor para ignorar: ", "string");
        if(userInput.toUpperCase() == 'Y'){
            console.log("Muito bem. Vejo que você é corajoso. Que você encontre tesouros jamais visto por olho humano e que a dungeon te guie...");
            this.entradaSecreta = true;
        }
        else{
            console.log("Continuando com o caminho...\n");
            this.entradaSecreta = false;
        }

        console.log("--------------------------------------------------------------------");
    }


    async iniciarFase(jogador, gameOverStatus){
        if(!gameOverStatus){
            this.apresentarFase();
            this.utilities.esperarValorUsuario();

            await this.lutarComMonstro(fantasma, jogador);
            this.utilities.esperarValorUsuario();
            
            if(!this.getGameOver()){
                await this.lutarComMonstro(basilico, jogador);
                this.utilities.esperarValorUsuario();
            }

            this.fimDaFase(jogador);
            this.utilities.esperarValorUsuario();

            if(!this.getGameOver()){
                this.encontroEntradaSecreta();
                this.utilities.esperarValorUsuario();
            }

        }

        return this.getGameOver();
    }
}

module.exports = Fase_2;