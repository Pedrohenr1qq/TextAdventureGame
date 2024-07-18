const Personsagem = require("../Personagens");
/***
 * Classe Base para a criação das Classes de herois (Guerreiro, Arqueiro, Mago e Ladino)
 * Classe derivada da classe Personagem
 * Atributos dessa classe:
 *      - Classe (= Nome), vida, poderAtaque e defesa são atributos herdados da classe Personagem
 *      - Nivel: Refere-se ao nível que o Heroi está, aumentando de acordo com o avanço da história (matando monstros e subindo de andar)
 *      - Fadiga: Refere-se ao "cansaço" do heroi. É uma porcentagem que influencia diretamente na vida e no poder de ataque do heroi
 *      - Dinheiro: Refere-se à capacidade do herói de conseguir comprar itens na loja
 *      - ContadorAtaque: Refere-se a quantos ataques foram dados na luta. Serve para calcular a fadiga
 * 
*/


class Heroi extends Personsagem{
    contadorAtaque = 0;

    constructor(classe, vida, poderAtaque, defesa, nivel, fadiga, dinheiro){
        super(classe, vida, poderAtaque, defesa);
        this.nivel = nivel;
        this.fadiga = fadiga;
        this.dinheiro = dinheiro;
    }

    getNivel(){
        return this.nivel;
    }

    getFadiga(){
        return this.fadiga;
    }

    setFadiga(novaFadiga){
        this.fadiga = novaFadiga;
    }

    getDinheiro(){
        return this.dinheiro;
    }

    setDinheiro(novoDinheiro){
        this.dinheiro = novoDinheiro;
    }

    getContadorAtaque(){
        return this.contadorAtaque;
    }

    incrementarContadorAtaque(){
        this.contadorAtaque +=1;
    }

    zerarContadorAtaque(){
        this.contadorAtaque = 0;
    }


    aumentarNivel(){
        let novaVida, novoPoderAtaque, novaDefesa, novaFadiga, novoDinheiro;
        let taxaUpgrade = 0.3;

        novaVida = this.getVida() ( 1 + taxaUpgrade * this.getNivel());
        novoPoderAtaque = this.getPoderAtaque() ( 1 + taxaUpgrade * this.getNivel());
        novaDefesa = this.getDefesa() ( 1 + taxaUpgrade * this.getNivel());
        novaFadiga = 0;
        novoDinheiro = this.getDinheiro() + 100;

        this.setVida(novaVida);
        this.setPoderAtaque(novoPoderAtaque);
        this.setDefesa(novaDefesa);
        this.setFadiga(novaFadiga);
        this.setDinheiro(novoDinheiro);

        this.nivel +=1;
    }


    calcularFadiga(atributo){
        return (atributo * this.getFadiga() * this.getContadorAtaque());
    }

    atacar(){
        let danoAtaque, reducaoDano;
        console.log("Atacando...");
        reducaoDano = this.calcularFadiga(this.getPoderAtaque());
        danoAtaque = this.getPoderAtaque() - reducaoDano;
        console.log("Dano causado: " + danoAtaque);

        return danoAtaque;
    }

    sofrerDano(danoRecebido){
        let vidaReduzida, novaVida, defesa;
        console.log("Sofreu dano... ");
        defesa = this.calcularFadiga(this.getDefesa());
        vidaReduzida = danoRecebido - defesa;
        novaVida -= vidaReduzida;
        this.setVida(novaVida);
        console.log("Vida atual: "+ this.getVida());
    }


};

module.exports = Heroi;