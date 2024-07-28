const Monstro = require('../Monstro');

class Goblin extends Monstro{
    constructor(){
        super("Goblin", 80, 30, 0.05, 1, 10, 0, "");
    }
};

module.exports = Goblin;