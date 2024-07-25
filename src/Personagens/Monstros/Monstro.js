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

    atacar(){
        console.log(" ------------- ");
        console.log(`O ${this.getNome()} está atacando...`);
        console.log("");
        return this.getPoderAtaque();
    }

    sofrerDano(danoRecebido){
        let vidaReduzida, novaVida, defesa;

        defesa = this.getDefesa();
        vidaReduzida = danoRecebido - defesa;
        novaVida = this.getVida() - vidaReduzida;
        if(novaVida < 0) novaVida = 0;

        console.log(`O ${this.getNome()} sofreu dano.`);
        console.log(`Vida do ${this.getNome()}: ${this.getVida()} >>> ${novaVida}`);

        this.setVida(novaVida);
        console.log(`A vida atual do ${this.getNome()} é: ${this.getVida()}`);
        console.log(" --------------- ");
    }

    //Metodo abstrado para os monstros
    ataqueEspecial(){}

    mostrarDados(){
        console.log(`--------- ${this.getNome()} --------`);
        console.log(`Vida: ${this.getVida()}`);
        console.log(`Defesa: ${this.getDefesa()}`);
        console.log(`Poder de Ataque: ${this.getPoderAtaque()}`);
        console.log(`Valor: ${this.getValor()}`);
        console.log(" ----------------------------------- ");
    }


    furia(){
        let novaVida, novoPoderAtaque, novaDefesa;
        let taxaUpgrade = 0.30;
        console.log(`A dungeon fez com que os monstros presentes nela entrassem em fúria. Todos os seus status aumentarão em ${taxaUpgrade*100}%. `);
        
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