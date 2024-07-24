const Monstro = require('../Monstro');

class Fantasma extends Monstro{
    constructor(){
        super("Fantasma", 100, 40, 0.015, 2, 55, 0);
    }
};

module.exports = Fantasma;