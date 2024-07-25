const Heroi = require("./Heroi");

class Guerreiro extends Heroi{
    constructor(nomeJogador){
        super(nomeJogador, "Guerreiro", 120, 20, 0.6, 1, 0);
    }

};

module.exports = Guerreiro;