const Monstro = require('../Monstro');

class Basilico extends Monstro{
    constructor(){
        super("Basilico", 250, 60, 0.3, 2, 80, 1, "Petrificação");
    }

    ataqueEspecial(jogador){
        console.log(" --------------------------------------------------------------------------------------------------")
        console.log(`O monstro "${this.getNome()}" esta usando o ataque: ${this.getNomeAtaqueEspecial()}`);   
        console.log("Descrição ataque especial: ");
        console.log(`O monstro "${this.getNome()}" congelará o ${jogador.getNome()}, tornando-o impotente para atacar. `);

        return true;
    }

};

module.exports = Basilico;