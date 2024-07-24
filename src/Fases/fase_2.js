const Utilities = require("../Utilities");
const utilities = new Utilities();

const FaseGeral = require('./FaseGeral');
const Fantasma = require('../Personagens/Monstros/andar_2/Fantasma');
const Basilico = require('../Personagens/Monstros/andar_2/Basilico');

const fantasma = new Fantasma();
const basilico = new Basilico();

class Fase_1 extends FaseGeral{
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
            await utilities.sleep(1);

            if(!pretrificacao){
                danoJogador = jogador.atacar();
                monstro.sofrerDano(danoJogador);
            }

            if(monstro.getVida() <= 0){
                console.log("Monstro Derrotado");
                break;
            }

            if(rodada == 3){
                if(monstro.index == 0) danoInicialJogador = monstro.ataqueEspecial(jogador);
                else pretrificacao = monstro.ataqueEspecial(jogador);
                console.log("");
                utilities.esperarValorUsuario();
            }

            if(rodada == 5){ // Após duas rodadas, o jogador volta ao normal
                console.log("\nParabéns Aventureiro, o efeito de ataque especial do monstro passou. Você aguentou bem...\n");
                if(monstro.index == 0) jogador.setPoderAtaque(danoInicialJogador);
                pretrificacao = false;
                utilities.esperarValorUsuario();
            }
    
            danoMonstro = monstro.atacar();
            jogador.sofrerDano(danoMonstro);

            rodada++;
        }

        console.log("Luta encerrada...\n");

        console.log(`Vida do ${jogador.getNome()} : ${jogador.getVida()}`);

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


    async iniciarFase(jogador){
        this.apresentarFase();
        utilities.esperarValorUsuario();

        await this.lutarComMonstro(fantasma, jogador);
        utilities.esperarValorUsuario();

        await this.lutarComMonstro(basilico, jogador);
        utilities.esperarValorUsuario();

        this.fimDaFase(jogador);
    }


}

module.exports = Fase_1;