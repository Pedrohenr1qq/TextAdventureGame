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

    constructor(nome, vida, poderAtaque, defesa, andar, ataqueEspecial, valor){
        super(nome, vida, poderAtaque, defesa);
        this.andar = andar;
        this.ataqueEspecial = ataqueEspecial;
        this.valor = valor;
    }

    getAndar(){
        return this.andar;
    }

    getAtaqueEspecial(){
        return this.AtaqueEspecial;
    }

    getValor(){
        return this.valor;
    }

    atacar(){
        console.log(`O ${this.getNome()} está atacando...`);
        return this.getPoderAtaque();
    }

    sofrerDano(danoRecebido){
        let vidaReduzida, novaVida, defesa;
        console.log("Sofreu dano... ");
        defesa = this.getDefesa();
        vidaReduzida = danoRecebido - defesa;
        novaVida -= vidaReduzida;
        this.setVida(novaVida);
        console.log(`A vida atual do ${this.getNome()} é: ${this.getVida()}`);
    }
};

module.exports = Monstro;