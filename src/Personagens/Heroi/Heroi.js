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

    constructor(classe, vida, poderAtaque, defesa, nivel, moedas){
        super(classe, vida, poderAtaque, defesa);
        this.nivel = nivel;
        this.moedas = moedas;
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

    getMoedas(){
        return this.moedas;
    }

    setMoedas(novasMoedas){
        this.moedas = novasMoedas;
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



    atacar(){
        let danoAtaque;
        console.log(`O ${this.getNome()} está atacando...`);
        danoAtaque = this.getPoderAtaque();
        console.log("Dano causado: " + danoAtaque);

        return danoAtaque;
    }

    sofrerDano(danoRecebido){
        let vidaReduzida, novaVida;
        vidaReduzida = danoRecebido * (1 - this.getDefesa());
        novaVida = this.getVida() - vidaReduzida;
        this.setVida(novaVida);

        console.log(`O ${this.getNome()} sofreu dano e teve sua vida reduzida em ${vidaReduzida} pontos.`);
        console.log("A vida atual é: "+ this.getVida());
    }


    receberMoedas(moedas){
        let novasMoedas = this.getMoedas() + moedas;
        this.setMoedas(novasMoedas);
        console.log(`O ${this.getNome()} recebeu ${moedas} moedas de recompensa.`);
        console.log(`A quantidade atual de moedas é: ${this.getMoedas()}`);
    }

};

module.exports = Heroi;