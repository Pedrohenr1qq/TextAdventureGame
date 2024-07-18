const Heroi = require("./Heroi");

class Guerreiro extends Heroi{
    constructor(){
        this.nome = "Guerreiro";
        this.vida = 200;
        this.poderAtaque = 20;
        this.defesa = 0.8;
        this.nivel = 1;
        this.fadiga = 0.04;
        this.dinheiro = 0;

        super(this.nome, this.vida, this.poderAtaque, this.defesa, this.nivel, this.fadiga, this.dinheiro);
    }

};

module.exports = Guerreiro;