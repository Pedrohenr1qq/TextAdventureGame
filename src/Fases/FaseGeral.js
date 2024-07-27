const Utilities = require("../Utilities");


class FaseGeral{
    utilities = new Utilities();

    desistiu = 0;
    gameOver = false;

    constructor(nome){
        this.nome = nome;
    }

    getNome(){
        return this.nome;
    }

    getGameOver(){
        return this.gameOver;
    }

    apresentarFase(){

    }

    encontroComMonstro(monstro, jogador){
        let userInput;
        let vaiLutar = true;
        console.log("\n ---------------------------- ENCONTRO COM MONSTRO ----------------------------------- ");
        console.log(`Você se deparou com um monstro. Suas características são: `);
        monstro.mostrarDados();

        if(monstro.index == 0){
            userInput = this.utilities.validarValorUsuario("Deseja lutar (y para sim e qualquer outro valor para não) ? ", "string");
        }
        else {
            console.log("Você se deparou com o ultimo monstro da dungeon. Ele é o monstro mais forte do local. ");
            console.log("Se você for lutar contra ele, corre o risco de morrer. Tem certeza que deseja lutar contra ele? ");
            userInput = this.utilities.validarValorUsuario("Deseja lutar (y para sim e qualquer outro valor para não) ? ", "string");
            console.log("");

            // Só pode pular o primeiro monstro
            if(userInput != 'y' ){
                console.log("Essa não. O monstro sentiu o seu cheiro e agora está indo atrás de você. Você terá que lutar agora. Ponha suas armas a postos");
                this.utilities.esperarValorUsuario();
                userInput = 'y';
            }
        }

        if(this.desistiu == 0 ){
            if(userInput == 'y'){
                vaiLutar = true;
            }else{
                console.log("\nVocê se escondeu e o monstro continou seguindo seu caminho. Agora o caminho está livre para continuar.\n");
                vaiLutar = false;
                this.desistiu += 1;
            }
            
        }else {
            console.log("\nComo você não lutou antes, terá que lutar agora contra este monstro para poder passar da dungeon. \n ");
            vaiLutar = true;
            monstro.furia();
            this.utilities.esperarValorUsuario();
        }

        return vaiLutar;
    }

    receberRecompensas(jogador, monstro){
        let taxaUpgrade = (monstro.index == 0) ? 0.1 : 0.25;
        console.log("\n-------------------------- RECEBENDO RECOMPENSAS ----------------------------")
        console.log(`Parabéns caro ${jogador.getNome()}. Você ganhou contra o monstro "${monstro.getNome()}" no ${this.getNome()}!`);

        console.log("Você receberá um aumento de status");
        jogador.restaurarVida();
        console.log("");
        jogador.alterarAtributo("Vida", (jogador.getVida() * (1 + taxaUpgrade)));
        jogador.alterarAtributo("Defesa", (jogador.getDefesa() * (1 + taxaUpgrade/10)));
        jogador.alterarAtributo("Poder de Ataque", (jogador.getPoderAtaque() * (1 + taxaUpgrade)));
        console.log("");
        jogador.mostrarDados();

        console.log(`Você receberá ${monstro.getValor()} moedas por ter derrotado o monstro. \n`);
        jogador.receberMoedas(monstro.getValor());
    }

    fimDaFase(jogador){
        this.desistiu = 0;

        if(this.getGameOver()){
            console.log("Game Over.");
            console.log("Infelizmente caro aventureiro, você não foi capaz de completar essa dungeon");
            console.log("Esperamos que, em uma proxima vida, você consiga realizar isso.");
            process.exit();
        }else{
            console.log(`Parabéns jogador. Voce finalizou o ${this.getNome()}!`);
            jogador.aumentarNivel();
            console.log(`Vamos prosseguir para o proximo andar...`);
        }
    }

};

module.exports = FaseGeral;