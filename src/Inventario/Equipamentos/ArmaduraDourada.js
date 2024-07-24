const Inventario = require("../Inventario");

class ArmaduraDourada extends Inventario{

    aumentoDeStatus = function(jogador){
        let novaDefesa = jogador.getDefesa() + 0.3;
        console.log(`Equipando o equipamento: ${this.getNome()}!`);
        jogador.setDefesa(novaDefesa);
    }

    constructor(jogador){
        super("Equipamento", "Armadura Dourada", 8, this.aumentoDeStatus(jogador), 80);
    }
}

module.exports = Inventario;