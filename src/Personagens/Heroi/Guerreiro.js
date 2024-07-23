const Heroi = require("./Heroi");

class Guerreiro extends Heroi{
    constructor(nomeJogador){
        super(nomeJogador, "Guerreiro", 150, 20, 0.8, 1, 0);
    }

};

module.exports = Guerreiro;