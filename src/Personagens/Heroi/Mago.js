const Heroi = require("./Heroi");

class Mago extends Heroi{
    constructor(){

        super("Mago",100, 100, 0.3, 1, 0);
    }

};

module.exports = Mago;