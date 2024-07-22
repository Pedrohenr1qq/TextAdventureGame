const Monstro = require('../Monstro');

class Goblin extends Monstro{
    constructor(){
        super("Goblin", 60, 30, 0.01, 1, 10);
    }
};

module.exports = Goblin;