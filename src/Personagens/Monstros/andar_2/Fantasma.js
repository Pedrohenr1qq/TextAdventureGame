const Monstro = require('../Monstro');

class Fantasma extends Monstro{
    constructor(){
        super("Fantasma", 150, 40, 0.1, 2, 55, 0, "Intangibilidade");
    }

    ataqueEspecial(jogador){
        let danoInicialJogador = jogador.getPoderAtaque();
        console.log(" --------------------------------------------------------------------------------------------------")
        console.log(`O monstro ${this.getNome()} vai usar o seu ataque especial: ${this.getNomeAtaqueEspecial()}`);
        console.log("Descrição ataque especial: ");
        console.log(`O monstro ${this.getNome()} ficara imune a qualquer ataque por 2 rodadas`);
        jogador.setPoderAtaque(0);

        return danoInicialJogador;
    }

};

module.exports = Fantasma;