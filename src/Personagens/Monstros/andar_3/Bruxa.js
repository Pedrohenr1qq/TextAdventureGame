const Monstro = require('../Monstro');

class Bruxa extends Monstro{
    constructor(){
        super("Bruxa",425, 105, 0.35, 3, 150, 1, "Enfraquecimento");
    }

    ataqueEspecial(){
        let taxaReducao = 0.4;
        console.log(" --------------------------------------------------------------------------------------------------")
        console.log(`O monstro "${this.getNome()} "vai usar o seu ataque especial: ${this.getNomeAtaqueEspecial()}`);
        console.log("Descrição ataque especial: ");
        console.log(`O monstro "${this.getNome()}" irá enfraquecer a defesa e o poder de ataque de seu adversário para ${taxaReducao*100}% do valor original`);

        return taxaReducao;
    }

};

module.exports = Bruxa;