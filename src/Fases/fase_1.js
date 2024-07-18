const FaseGeral = require("./FaseGeral");
const Monstro = require("../Personagens/Monstros/Monstro.js");

class Fase_1 extends FaseGeral{
    nome = "Andar das bestas Selvagens";

    constructor(){
        super(this.nome);
    }

    apresentarFase(){
        console.log("Seja bem vindo caro ");
    }
};

module.exports = Fase_1;