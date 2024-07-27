/**
 * Classe Base para a criação das classes de Heroi e Monstros
 * Atributos dessa classe: 
 *      - Nome: Para o Herói, refere-se às classes Guerreiro, Mago, Arqueiro ou Ladino. Para os vilÕes, refere-se aos nomes dos vilões
 *      - Vida: refere-se à vida do personagem, Herói ou Monstros
 *      - poderAtaque: refere-se ao dano que o personagem pode causar
 *      - Defesa: refere-se à porcentagem do dano que o personagem consegue reduzir
 * 
*/
const Utilities = require("../Utilities"); // Para verificação dentro das fases. Para não repetir código


class Personsagem{
    utilities = new Utilities();

    constructor(nome, vida, poderAtaque, defesa){        
        this.nome = nome; 
        this.vida = vida; 
        this.poderAtaque = poderAtaque;
        this.defesa = defesa;
    }

    getNome(){
        return this.nome;
    }

    setNome(novoNome){
        this.nome = novoNome;
    }

    getVida(){
        return this.vida;
    }

    setVida(novaVida){
        if(novaVida < 0) novaVida = 0;                  // Não faz sentido uma vida negativa
        this.vida = novaVida;
    }

    getPoderAtaque(){
        return this.poderAtaque;
    }

    setPoderAtaque(novoPoderAtaque){
        if(novoPoderAtaque < 0) novoPoderAtaque = 0;    // Não faz sentido um poder de ataque negativo
        this.poderAtaque = novoPoderAtaque;
    }

    getDefesa(){
        return this.defesa;
    }

    setDefesa(novaDefesa){
        if(novaDefesa < 0) novaDefesa = 0;              // Não faz sentido uma defesa negativa
        if(novaDefesa > 9.5) novaDefesa = 9.5;          // Valor máximo para a defesa. 
        this.defesa = novaDefesa;
    }

};

module.exports = Personsagem;