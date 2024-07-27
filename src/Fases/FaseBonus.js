const Utilities = require('../Utilities');
const utilities = new Utilities();

class FaseBonus {
    nome = "Jardim Secreto";
    constructor(){
    }

    apresentarFase(){
        console.log(`------------------------ ${this.nome.toUpperCase()} -----------------------------`);
        console.log(`Bem vindo, caro aventureiro, ao ${this.nome} da Dungeon`);
        console.log("Esse é um local pouco explorado e com difícil acesso, mas repleto de tesouros incriveis.");
        console.log("Continue andando para descobrir seus principais segredos...");
        console.log("");
    }

    criarTesouro(nome, atributo, valorBuff){

        let tesouro = {
            'nome': nome,
            'atributo': atributo,
            'buff': valorBuff
        };

        return tesouro;
    }

    encontrarTesouros(){
        let escolhaUsuario, valorInvalido;

        let tesouros = [
            this.criarTesouro("Armadura Dourada", "Defesa", 0.20),
            this.criarTesouro("Capa da Longevidade", "Vida", 100),
            this.criarTesouro("Arma Divina", "Poder de Ataque", 50)
         ];

        console.log("-----------------------------------------------------------");
        console.log(`Você encontrou um bau repleto de tesouros mas tem que escolher só um dentre eles. Qual você escolhe?`);

        tesouros.forEach((element, index) => {
            console.log(`${index + 1} - ${element['nome']} --> +${element['buff']} de ${element['atributo']}`);
        });

        do{

            console.log("");
            escolhaUsuario = utilities.validarValorUsuario("Digite sua escolha: ", "numero");

            valorInvalido = (parseInt(escolhaUsuario) > tesouros.length) && (escolhaUsuario == 0);

            if(valorInvalido) console.log("Valor não reconhecido. Tente Novamente...");

        }while(valorInvalido);

        console.log("Muito bem. Espero que tenha feito uma ótima escolha.");
        console.log("");
        console.log("Tesouro escolhido: ");
        console.log(tesouros[escolhaUsuario - 1]['nome']);
        console.log("")

        return tesouros[escolhaUsuario - 1];
    }

    buffJogador(jogador, tesouroEscolhido){
        let valorAntigo;

        console.log("------------------------------");
        console.log(`Equipando a ${tesouroEscolhido['nome']}...`);
        if(tesouroEscolhido['atributo'] == "Vida"){
            valorAntigo = jogador.getVida();
        }
        else if(tesouroEscolhido['atributo'] == "Poder de Ataque"){
            valorAntigo = jogador.getPoderAtaque();
        }
        else if(tesouroEscolhido['atributo'] == "Defesa"){
            valorAntigo = jogador.getDefesa();
        }

        console.log("")
        console.log("Atributo alterado.")
        jogador.alterarAtributo(tesouroEscolhido['atributo'], valorAntigo + tesouroEscolhido['buff']);
        console.log("");
    }


    fimDaFase(){
        console.log("Muito bem caro aventureiro. Desejo-lhe sorte em sua próxima jornada");
    }

    async iniciarFase(jogador){
        this.apresentarFase();
        utilities.esperarValorUsuario();

        let tesouroEscolhido = this.encontrarTesouros();
        utilities.esperarValorUsuario();

        this.buffJogador(jogador, tesouroEscolhido);

        this.fimDaFase();
        utilities.esperarValorUsuario();
    }

}

module.exports = FaseBonus;