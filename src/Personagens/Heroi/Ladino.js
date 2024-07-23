const Heroi = require("./Heroi");

class Ladino extends Heroi{
    constructor(nomeJogador){

        super(nomeJogador, "Ladino", 100, 60, 0.6, 1, 0);
    }

};

module.exports = Ladino;