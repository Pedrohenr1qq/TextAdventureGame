const Monstro = require('../Monstro');

class Golem extends Monstro{
    constructor(){
        super("Golem", 300, 60, 0.4, 3, 120, 0, "Casca de Espinhos");
    }

    ataqueEspecial(){
        let taxaReflexao = 0.7;
        console.log(" --------------------------------------------------------------------------------------------------")
        console.log(`O monstro "${this.getNome()}" vai usar o seu ataque especial: ${this.getNomeAtaqueEspecial()}`);
        console.log("Descrição ataque especial: ");
        console.log(`O monstro "${this.getNome()}" refletirá ${taxaReflexao*100}% de qualquer ataque lançado sobre ele`);

        return taxaReflexao;
    }

};

module.exports = Golem;