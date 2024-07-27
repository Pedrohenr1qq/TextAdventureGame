
const FaseGeral = require('./FaseGeral');
const Goblin = require('../Personagens/Monstros/andar_1/goblin');
const Orc = require('../Personagens/Monstros/andar_1/orc');

// Monstros da fase/andar 1 da dungeon
var goblin = new Goblin();
var orc = new Orc();


class Fase_1 extends FaseGeral{
    constructor(){
        super("Andar das Bestas Selvagens") // Nome do andar/fase
    }

    getNome(){
        return this.nome;
    }

    // Uma breve apresentação do andar/fase
    apresentarFase(){
        console.log(` =================== ${this.getNome()} ===============================`);
        console.log(`Seja bem vindo caro jogador ao primeiro andar desta dungeon!`);
        console.log("Este andar é repleto de monstros selvagens como goblins e orcs. Você está preparado para lidar com eles? ");
    }

    // Luta contra os monstros
    async lutar(monstro, jogador){
        let danoJogador, danoMonstro, rodada = 1;
        console.log("\n -------------------------- LUTA COM O MONSTRO -------------------------------------\n");
        console.log(`O jogador da classe ${jogador.getNome()} esta lutando com o monstro "${monstro.getNome()}"`);
        
        // Loop para execução da luta 
        while((jogador.getVida() > 0) && (monstro.getVida() > 0)){      // A luta continua até que o jogador ou o monstro morram (sua vida chegue a 0)
            console.log("Lutando... \n");
            console.log(`\n--------------------- RODADA - ${rodada} ------------------------\n`);
            await this.utilities.sleep(1);                              // Uma pequena pausa entre as rodadas para dar a ideia de uma luta real.

            // Vez de ataque do jogador.
            danoJogador = jogador.atacar();
            monstro.sofrerDano(danoJogador);

            // Se o monstro morrer após ser atacado, ele não ataca o jogador e a luta termina.
            if(monstro.getVida() <= 0){
                console.log(`O monstro "${monstro.getNome()}" foi derrotado`);
                break;
            }
    
            // Vez de ataque do monstro
            danoMonstro = monstro.atacar();
            jogador.sofrerDano(danoMonstro);

            rodada++;
        }

        // Fim da luta e anuncio do resultado
        console.log("Luta encerrada...\n");

        console.log(`Vida do ${jogador.getNome()}: ${this.utilities.arredondarValor(jogador.getVida())}`);

        this.utilities.esperarValorUsuario();

        if(jogador.getVida() <= 0){
            console.log(`O jogador de classe ${jogador.getNome()} morreu ao lutar contra o ${monstro.getNome()} no ${this.getNome()}!`);
            this.gameOver = true;

        }else{
            this.receberRecompensas(jogador, monstro);
            this.gameOver = false;
        }

    }

    // Função para verificar se o jogador vai lutar com o monstro. Caso sim, inicia a luta.
    async lutarComMonstro(monstro, jogador){
        console.log(`Você estava andando pelo caminho e acabou se deparando com uma movimentação estranha. Logo você percebe que se encontrou com um monstro. `);
        let vaiLutar = this.encontroComMonstro(monstro, jogador);

        if(vaiLutar){
            await this.lutar(monstro, jogador);
        }
    }

    // Função que dá inicio à fase que é chamada na parte principal do cógigo (index js)
    async iniciarFase(jogador){
        this.apresentarFase();
        this.utilities.esperarValorUsuario();

        // Encontro e possível luta com o 1º monstro
        await this.lutarComMonstro(goblin, jogador);
        this.utilities.esperarValorUsuario();

        // Encontro e luta com o 2º monstro, se o jogador não tiver morrido contra o primeiro.
        if(!this.getGameOver()){
            await this.lutarComMonstro(orc, jogador);
            this.utilities.esperarValorUsuario();
        }
        // Finalizar a fase e avançar para o proximo andar.
        this.fimDaFase(jogador);
        this.utilities.esperarValorUsuario();
    }
}

module.exports = Fase_1;