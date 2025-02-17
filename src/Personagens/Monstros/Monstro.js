const Personsagem = require("../Personagens");
/***
 * Classe Base para a criação das Classes de herois (Guerreiro, Arqueiro, Mago e Ladino)
 * Classe derivada da classe Personagem
 * Atributos dessa classe:
 *      - Nome, vida, poderAtaque e defesa são atributos herdados da classe Personagem
 *      - Andar: Refere-se andar que o monstro se encontra
 *      - Ataque especial: Refere-se a poder especial que a maoria dos monstros possuem e que podem conferir características especiais a seus ataques
 *      - Valor: Refere-se ao valor em dinheiro que o monstro concede ao ser derrotado
 * 
*/


class Monstro extends Personsagem{

    constructor(nome, vida, poderAtaque, defesa, andar, valor, index, nomeAtaqueEspecial){
        super(nome, vida, poderAtaque, defesa);
        this.andar = andar;
        this.valor = valor;
        this.index = index;
        this.nomeAtaqueEspecial = nomeAtaqueEspecial;
    }

    getAndar(){
        return this.andar;
    }

    getValor(){
        return this.valor;
    }

    getNomeAtaqueEspecial(){
        return this.nomeAtaqueEspecial;
    }

    //Metodo abstrado para os monstros
    ataqueEspecial(){}

    // Função para mostrar os atributos do monstro.
    mostrarDados(){
        console.log(`--------- ${this.getNome()} --------`);
        console.log(`Vida: ${this.utilities.arredondarValor(this.getVida())}`);
        console.log(`Defesa: ${this.utilities.arredondarValor(this.getDefesa())}`);
        console.log(`Poder de Ataque: ${this.utilities.arredondarValor(this.getPoderAtaque())}`);
        console.log(`Valor: ${this.getValor()} mooedas`);
        console.log(" ----------------------------------- ");
    }

    // Função para aumentar os status do monstro em uma situação específica (caso o jogador tenha pulado o monstro anterior).
    furia(){
        let novaVida, novoPoderAtaque, novaDefesa;
        let taxaUpgrade = 0.30;
        console.log(`A dungeon fez com que os monstros presentes nela entrassem em fúria. Todos os seus status aumentarão em ${this.utilities.arredondarValor(taxaUpgrade*100)}%. `);
        
        novaVida = this.getVida() *  ( 1 + taxaUpgrade );
        novoPoderAtaque = this.getPoderAtaque() * ( 1 + taxaUpgrade);
        novaDefesa = this.getDefesa() * ( 1 + taxaUpgrade);

        this.setVida(novaVida);
        this.setPoderAtaque(novoPoderAtaque);
        this.setDefesa(novaDefesa);

        console.log("Novos status: ");
        this.mostrarDados();
    }

};

module.exports = Monstro;