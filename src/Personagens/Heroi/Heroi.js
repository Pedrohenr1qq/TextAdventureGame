const Personsagem = require("../Personagens");
/***
 * Classe Base para a criação das Classes de herois (Guerreiro, Arqueiro, Mago e Ladino)
 * Classe derivada da classe Personagem
 * Atributos dessa classe:
 *      - nomejogador: Nome que o jogador escolhe no inicio do jogo
 *      - classe (= Nome), vida, poderAtaque e defesa são atributos herdados da classe Personagem
 *      - nivel: Refere-se ao nível que o Heroi está, aumentando de acordo com o avanço da história (matando monstros e subindo de andar)
 *      - moedas: Refere-se à capacidade do herói de conseguir comprar itens na loja --> Recurso ainda a construir
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


    alterarAtributo(atributo, novoValor){ // Função para alterar algum atributo especíco (vida, poder de ataque ou defesa). Mais para questão de visualização 
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

        console.log(`${atributo}: ${this.utilities.arredondarValor(valorAnterior)} >>> ${this.utilities.arredondarValor(novoValor)}`);

        return valorAnterior;
    }

    // Função para aumento de nível do herói sempre que ele conclui um andar da dungeon.
    // Os seus atributos a uma taxa de acordo com o nível.  Começa em 30% e aumenta 10% pra cada nivel
    aumentarNivel(){
        let novaVida, novoPoderAtaque, novaDefesa, novasMoedas;
        let taxaUpgrade = 0.3 + (0.1 * (this.getNivel() - 1));
    
        console.log("\n ------------------ AUMENTO DE NÍVEL---------------------")
        console.log("Subindo os nivels do jogador...");

        console.log("Restaurando vida para valor inicial...");
        this.restaurarVida();

        novaVida = this.getVida() *  ( 1 + taxaUpgrade);
        novoPoderAtaque = this.getPoderAtaque() * ( 1 + taxaUpgrade);
        novaDefesa = this.getDefesa() * ( 1 + taxaUpgrade/10);  // Para ter uma defesa balenceada, seu aumento é em centésimos, ja que é uma porcentagem
        novasMoedas = this.getMoedas() + 100;

        this.setVida(novaVida);
        this.setPoderAtaque(novoPoderAtaque);
        this.setDefesa(novaDefesa);
        this.setMoedas(novasMoedas);

        this.nivel +=1;

        console.log("Status atualizado. Novos valores: ");
        this.mostrarDados();

        this.vidaInicial = this.getVida(); // A nova "vida inicial" do jogador passa a ser a vida do ultimo andar
    }

    // Função para o herói receber as moedas referentes ao valor do monstro que derrotou.
    receberMoedas(moedas){
        let novasMoedas = this.getMoedas() + moedas;
        this.setMoedas(novasMoedas);
        console.log(`O ${this.getNome()} recebeu ${moedas} moedas de recompensa.`);
        console.log(`A quantidade atual de moedas é: ${this.getMoedas()}`);
        console.log("");
    }

};

module.exports = Heroi;