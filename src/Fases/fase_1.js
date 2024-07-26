
const FaseGeral = require('./FaseGeral');
const Goblin = require('../Personagens/Monstros/andar_1/goblin');
const Orc = require('../Personagens/Monstros/andar_1/orc');

var goblin = new Goblin();
var orc = new Orc();

class Fase_1 extends FaseGeral{
    constructor(){
        super("Andar das Bestas Selvagens")
    }

    getNome(){
        return this.nome;
    }


    apresentarFase(){
        console.log(` =================== ${this.getNome()} ===============================`);
        console.log(`Seja bem vindo caro jogador ao primeiro andar desta dungeon!`);
        console.log("Este andar é repleto de monstros selvagens como goblins e orcs. Você está preparado para lidar com eles? ");
    }

    async lutar(monstro, jogador){
        let danoJogador, danoMonstro, rodada = 1;
        console.log("\n -------------------------- LUTA COM O MONSTRO -------------------------------------\n");
        console.log(`O jogador da classe ${jogador.getNome()} esta lutando com o monstro ${monstro.getNome()}`);
        

        while((jogador.getVida() > 0) && (monstro.getVida() > 0)){
            console.log("Lutando... \n");
            console.log(`\n--------------------- RODADA - ${rodada} ------------------------\n`);
            await this.utilities.sleep(1);

            danoJogador = jogador.atacar();
            monstro.sofrerDano(danoJogador);

            if(monstro.getVida() <= 0){
                console.log("Monstro Derrotado");
                break;
            }
    
            danoMonstro = monstro.atacar();
            jogador.sofrerDano(danoMonstro);

            rodada++;
        }

        console.log("Luta encerrada...\n");

        console.log(`Vida do ${jogador.getNome()}: ${this.utilities.arredondarValor(jogador.getVida())}`);

        if(jogador.getVida() <= 0){
            console.log(`O jogador de classe ${jogador.getNome()} morreu ao lutar contra o ${monstro.getNome()} no ${this.getNome()}!`);
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
        this.utilities.esperarValorUsuario();

        await this.lutarComMonstro(goblin, jogador);
        this.utilities.esperarValorUsuario();

        if(!this.getGameOver()){
            await this.lutarComMonstro(orc, jogador);
            this.utilities.esperarValorUsuario();
        }

        this.fimDaFase(jogador);

        return this.getGameOver();
    }


}

module.exports = Fase_1;