const Monstro = require('../Monstro');

class Goblin extends Monstro{
    constructor(){
        super("Orc", 100, 35, 0.025, 1, 25, 1);
    }
};

module.exports = Goblin;