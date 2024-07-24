const Monstro = require('../Monstro');

class Basilico extends Monstro{
    constructor(){
        super("Basilico", 120, 55, 0.015, 2, 80, 1);
    }

    ataqueEspecial(jogador){
        let nome = "Pretrificação";
        console.log(`O monstro ${this.getNome()} esta usando o ataque: ${nome}`);   
    }

};

module.exports = Basilico;