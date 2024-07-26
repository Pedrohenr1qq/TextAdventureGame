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
    vidaInicial = 0;
    constructor(nomeJogador, classe, vida, poderAtaque, defesa, nivel, moedas){
        super(classe, vida, poderAtaque, defesa);
        this.nomeJogador = nomeJogador;
        this.nivel = nivel;
        this.moedas = moedas;
        this.vidaInicial = vida;
    }

    getNomeJogador(){
        return this.nomeJogador;
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
    
    restaurarVida(){
        console.log("Vida restaurada...");
        this.setVida(this.vidaInicial);
    }

    mostrarDados(){
        console.log(`--------- ${this.getNome()} --------`);
        console.log(`Vida: ${this.utilities.arredondarValor(this.getVida())}`);
        console.log(`Defesa: ${this.utilities.arredondarValor(this.getDefesa())}`);
        console.log(`Poder de Ataque: ${this.utilities.arredondarValor(this.getPoderAtaque())}`);
        console.log(`Moedas: ${this.getMoedas()}`);
        console.log(" ----------------------------------- ");
    }


    alterarAtributo(atributo, novoValor){ // Função para alterar algum atributo
        let valorAnterior = 0; 
        if(atributo == "Vida"){
            valorAnterior = this.getVida();
            this.setVida(novoValor);
        }
        else if(atributo == "Poder de Ataque"){
            valorAnterior = this.getPoderAtaque();
            this.setPoderAtaque(novoValor);
        }
        else if(atributo == "Defesa"){
            valorAnterior = this.getDefesa();
            this.setDefesa(novoValor);
        }
        else {

        }
        console.log(`${atributo}: ${this.utilities.arredondarValor(valorAnterior)} >>> ${this.utilities.arredondarValor(novoValor)}`);

        return valorAnterior;
    }

    aumentarNivel(){
        let novaVida, novoPoderAtaque, novaDefesa, novasMoedas;
        let taxaUpgrade = 0.3 + (0.1 * (this.getNivel() - 1));
    
        console.log("\n ------------------ AUMENTO DE NÍVEL---------------------")
        console.log("Subindo os nivels do jogador...");

        console.log("Restaurando vida para valor inicial...");
        this.restaurarVida();

        novaVida = this.getVida() *  ( 1 + taxaUpgrade);
        novoPoderAtaque = this.getPoderAtaque() * ( 1 + taxaUpgrade);
        novaDefesa = this.getDefesa() * ( 1 + taxaUpgrade/10);
        novasMoedas = this.getMoedas() + 100;

        this.setVida(novaVida);
        this.setPoderAtaque(novoPoderAtaque);
        this.setDefesa(novaDefesa);
        this.setMoedas(novasMoedas);

        this.nivel +=1;

        console.log("Status atualizado. Novos valores: ");
        this.mostrarDados();

        this.vidaInicial = this.getVida(); // A nova "vida inicial" do jogador passa a ser a vida do ultimo estágio
    }



    atacar(){
        let danoAtaque;
        console.log(" ----------------------------------------");
        console.log(`O ${this.getNome()} está atacando...`);
        danoAtaque = this.getPoderAtaque();
        console.log("Dano causado: " + this.utilities.arredondarValor(danoAtaque));
        console.log("");

        return danoAtaque;
    }

    sofrerDano(danoRecebido){
        let vidaReduzida, novaVida;
        vidaReduzida = danoRecebido * (1 - this.getDefesa());
        novaVida = this.getVida() - vidaReduzida;
        if(novaVida < 0) novaVida = 0;

        console.log(`O ${this.getNome()} sofreu dano.`);
        console.log(`Dano sofrido: ${this.utilities.arredondarValor(vidaReduzida)}`);
        console.log(`Vida do ${this.getNome()}: ${this.utilities.arredondarValor(this.getVida())} >>> ${this.utilities.arredondarValor(novaVida)}`);

        this.setVida(novaVida);

        console.log(`A vida atual do ${this.getNome()} ${this.getNomeJogador()} é: ${this.utilities.arredondarValor(this.getVida())}.`);
        console.log(" ---------------------------------------- ");
    }


    receberMoedas(moedas){
        let novasMoedas = this.getMoedas() + moedas;
        this.setMoedas(novasMoedas);
        console.log(`O ${this.getNome()} recebeu ${moedas} moedas de recompensa.`);
        console.log(`A quantidade atual de moedas é: ${this.getMoedas()}`);
        console.log("");
    }

};

module.exports = Heroi;