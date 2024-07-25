const Heroi = require("./Heroi");

class Ladino extends Heroi{
    constructor(nomeJogador){

        super(nomeJogador, "Ladino", 100, 40, 0.5, 1, 0);
    }

};

module.exports = Ladino;