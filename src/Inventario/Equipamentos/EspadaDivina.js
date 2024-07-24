const Inventario = require("../Inventario");

class ArmaduraDourada extends Inventario{

    aumentoDeStatus = function(jogador){
        let novoPoderAtaque = jogador.getPoderAtaque() + 80;
        console.log(`Equipando o equipamento: ${this.getNome()}!`);
        jogador.setPoderAtaque(novoPoderAtaque);
    }

    constructor(jogador){
        super("Equipamento", "Espada Divina", 20, this.aumentoDeStatus(jogador), 80);
    }
}

module.exports = Inventario;