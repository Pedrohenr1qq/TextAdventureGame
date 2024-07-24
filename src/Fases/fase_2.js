const FaseGeral = require('./FaseGeral');


class Fase_1 extends FaseGeral{
    nome = "Andar das bestas selvagens";
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

    async lutar(){
        console.log("Lutando... ");
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

        this.lutar();

        this.fimDaFase(jogador);
    }


}

module.exports = Fase_1;