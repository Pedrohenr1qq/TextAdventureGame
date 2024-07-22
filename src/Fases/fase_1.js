const Goblin = require('../Personagens/Monstros/andar_1/goblin');
const Orc = require('../Personagens/Monstros/andar_1/orc');

var goblin = new Goblin();
var orc = new Orc();

class Fase_1{
    nome = "Andar das bestas selvagens"
    gameOver = false;
    constructor(){;
    }

    getNome(){
        return this.nome;
    }

    apresentarFase(){
        console.log(` =================== ${this.getNome()} ===============================`);
        console.log(`Seja bem vindo caro jogador ao primeiro andar desta dungeon!`);
        console.log("Este andar é repleto de monstros selvagens como goblins e orcs. Você está preparado para lidar com eles? ");
    }



    receberRecompensas(jogador, monstro){
        console.log(`Parabéns caro jogador. Você ganhou contra o ${monstro.getNome()} no ${this.getNome()}!`);
        console.log(`Você receberá ${monstro.getValor()} por ter derrotado o monstro. `);
        jogador.receberMoedas(monstro.getValor());
    }


    lutar(jogador, monstro){
        let danoJogador, danoMonstro;
        console.log(" ------------------------------ ");
        console.log(`O jogador da classe ${jogador.getNome()} esta lutando com o monstro ${monstro.getNome()}`);
        
        
        while((jogador.getVida() > 0) && (monstro.getVida() > 0)){
            danoJogador = jogador.atacar();
            monstro.sofrerDano(danoJogador);

            if(monstro.getVida() <= 0){
                console.log("Monstro Derrotado");
                break;
            }
    
            danoMonstro = monstro.atacar();
            jogador.sofrerDano(danoMonstro);    

        }

        console.log("Luta encerrada...");
        if(jogador.getVida() > 0){
            this.receberRecompensas(jogador, monstro);
        }else{
            console.log(`O jogador de classe ${jogador.getNome()} morreu ao lutar contra o ${monstro.getNome()} no ${this.getNome()}!`);
            this.gameOver = true;
        }

        

    }

    encontroComMonstro(index, jogador){
        let userInput;
        let vaiLutar = true;
        let monstro;
        monstro = (index == 0) ? goblin : orc;

        console.log(`Você se deparou com um monstro. Suas características são: `);
        monstro.mostrarDados();
        console.log("Deseja lutar? ");
        if(vaiLutar){
            this.lutar(jogador, monstro);
        }

    }

    fimDaFase(){
        if(this.gameOver){
            console.log("Game Over.");
        }else{
            console.log(`Parabéns jogador. Voce finalizou o ${this.getNome()}! Vamos prosseguir para o proximo andar...`);
        }
    }

};

module.exports = Fase_1;