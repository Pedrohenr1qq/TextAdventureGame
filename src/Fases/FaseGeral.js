// Classe Abstrata e que sera a base para as fases individuais (1-4, bonus, final);


class FaseGeral{
    constructor(nome){
        // Nome da fase
        this.nome = nome;
    }

    getNome(){
        return this.nome;
    }

    // Apresentação da fase
    apresentarFase(){}

    // Encontro o monstro x
    encontroMonstro(index){}

    // Receber recompensas
    receberRecompensas(){}

    // Game Over
    gameOver(){}

};

module.exports = FaseGeral;