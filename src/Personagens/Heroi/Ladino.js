const Heroi = require("./Heroi");

class Ladino extends Heroi{
    constructor(){
        this.nome = "Ladino";
        this.vida = 150;
        this.poderAtaque = 60;
        this.defesa = 0.6;
        this.nivel = 1;
        this.fadiga = 0.06;
        this.dinheiro = 0;

        super(this.nome, this.vida, this.poderAtaque, this.defesa, this.nivel, this.fadiga, this.dinheiro);
    }

};

module.exports = Ladino;