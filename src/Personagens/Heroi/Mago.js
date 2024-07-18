const Heroi = require("./Heroi");

class Mago extends Heroi{
    constructor(){
        this.nome = "Mago";
        this.vida = 100;
        this.poderAtaque = 100;
        this.defesa = 0.3;
        this.nivel = 1;
        this.fadiga = 0.2;
        this.dinheiro = 0;

        super(this.nome, this.vida, this.poderAtaque, this.defesa, this.nivel, this.fadiga, this.dinheiro);
    }

};

module.exports = Mago;