const Utilities = require("../Utilities");
const utilities = new Utilities();


class FaseGeral{
    desistiu = 0;

    constructor(nome){
        this.nome = nome;
        this.gameOver = false;
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
            userInput = utilities.validarValorUsuario("Deseja lutar (y para sim e qualquer outro valor para não) ? ", "string");
        }
        else {
            console.log("Você se deparou com o ultimo monstro da dungeon. Ele é o monstro mais forte do local. ");
            console.log("Se você for lutar contra ele, corre o risco de morrer. Tem certeza que deseja lutar contra ele? ");
            userInput = utilities.validarValorUsuario("Deseja lutar (y para sim e qualquer outro valor para não) ? ", "string");
            console.log("");

            // Só pode pular o primeiro monstro
            if(userInput != 'y' ){
                console.log("Essa não. O monstro sentiu o seu cheiro e agora está indo atrás de você. Você terá que lutar agora. Ponha suas armas a postos");
                utilities.esperarValorUsuario();
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
            console.log("\nComo vocẽ não lutou antes, terá que lutar agora contra este monstro para poder passar da dungeon. \n ");
            vaiLutar = true;
            monstro.furia();
            utilities.esperarValorUsuario();
        }

        return vaiLutar;
    }

    receberRecompensas(jogador, monstro){
        console.log("\n-------------------------- RECEBENDO RECOMPENSAS ----------------------------")
        console.log(`Parabéns caro jogador. Você ganhou contra o ${monstro.getNome()} no ${this.getNome()}!`);
        console.log(`Você receberá ${monstro.getValor()} moedas por ter derrotado o monstro. \n`);
        jogador.receberMoedas(monstro.getValor());
    }

    fimDaFase(jogador){
        this.desistiu = 0;

        if(this.getGameOver()){
            console.log("Game Over.");
            console.log("Infelizmente caro aventureiro, você não foi capaz de completar essa dungeon");
            console.log("Esperamos que, em uma proxima vida, você consiga realizar isso.");
        }else{
            console.log(`Parabéns jogador. Voce finalizou o ${this.getNome()}!`);
            jogador.aumentarNivel();
            console.log(`Vamos prosseguir para o proximo andar...`);
        }
    }

};

module.exports = FaseGeral;