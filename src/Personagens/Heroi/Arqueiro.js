const Heroi = require("./Heroi");

class Arqueiro extends Heroi{
    constructor(nomeJogador){

        super(nomeJogador, "Arqueiro", 75, 60, 0.4, 1, 0);
    }

};

module.exports = Arqueiro;