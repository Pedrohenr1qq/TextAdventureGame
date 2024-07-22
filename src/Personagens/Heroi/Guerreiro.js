const Heroi = require("./Heroi");

class Guerreiro extends Heroi{
    constructor(){

        super("Guerreiro", 200, 20, 0.8, 1, 0);
    }

};

module.exports = Guerreiro;