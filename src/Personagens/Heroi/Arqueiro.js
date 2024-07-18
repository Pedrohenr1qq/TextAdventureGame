const Heroi = require("./Heroi");

class Arqueiro extends Heroi{
    constructor(){
        this.nome = "Arqueiro";
        this.vida = 100;
        this.poderAtaque = 80;
        this.defesa = 0.5;
        this.nivel = 1;
        this.fadiga = 0.08;
        this.dinheiro = 0;

        super(this.nome, this.vida, this.poderAtaque, this.defesa, this.nivel, this.fadiga, this.dinheiro);
    }

};

module.exports = Arqueiro;