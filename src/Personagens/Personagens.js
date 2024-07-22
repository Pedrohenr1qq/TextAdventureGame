/**
 * Classe Base para a criação das classes de Heroi e Monstros
 * Atributos dessa classe: 
 *      - Nome: Para o Herói, refere-se às classes Guerreiro, Mago, Arqueiro ou Ladino. Para os vilÕes, refere-se aos nomes dos vilões
 *      - Vida: refere-se à vida do personagem, Herói ou Monstros
 *      - poderAtaque: refere-se ao dano que o personagem pode causar
 *      - Defesa: refere-se à porcentagem do dano que o personagem consegue reduzir
 * 
*/

class Personsagem{
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
        if(novaVida < 0) novaVida = 0;
        this.vida = novaVida;
    }

    getPoderAtaque(){
        return this.poderAtaque;
    }

    setPoderAtaque(novoPoderAtaque){
        this.poderAtaque = novoPoderAtaque;
    }

    getDefesa(){
        return this.defesa;
    }

    setDefesa(novaDefesa){
        this.defesa = novaDefesa;
    }

};

module.exports = Personsagem;