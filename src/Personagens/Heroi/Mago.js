const Heroi = require("./Heroi");

class Mago extends Heroi{
    constructor(nomeJogador){

        super(nomeJogador, "Mago",50
            , 100, 0.3, 1, 0);
    }

};

module.exports = Mago;