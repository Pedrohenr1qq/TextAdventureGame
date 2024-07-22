const FaseGeral = require('./FaseGeral');
const Goblin = require('../Personagens/Monstros/andar_1/goblin');
const Orc = require('../Personagens/Monstros/andar_1/orc');

var goblin = new Goblin();
var orc = new Orc();

class Fase_1 extends FaseGeral{
    nome = "Andar das bestas selvagens";
    gameOver = false;
    constructor(){
        super("Andar das Bestas Selvagens")
    }

    getNome(){
        return this.nome;
    }

    apresentarFase(){
        console.log(` =================== ${this.getNome()} ===============================`);
        console.log(`Seja bem vindo caro jogador ao primeiro andar desta dungeon!`);
        console.log("Este andar é repleto de monstros selvagens como goblins e orcs. Você está preparado para lidar com eles? ");
    }

    iniciarFase(jogador){
        console.log(`Você estava andando pelo caminho e acabou se deparando com uma movimentação estranha. Logo você percebe que se encontrou com um monstro. `);
        this.encontroComMonstro(goblin, jogador);
        if(!this.getGameOver()) {
            console.log(`Você estava andando pelo caminho e acabou se deparando com uma movimentação estranha. Logo você percebe que se encontrou com um monstro. `);
            this.encontroComMonstro(orc, jogador);
        }
    }


}

module.exports = Fase_1;