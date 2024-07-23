const prompt = require('prompt-sync')();

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

    async encontroComMonstro(monstro, jogador){
        let userInput;
        let vaiLutar = true;
        console.log(" ---------------------------------------------------------------------------------------------------------- ");
        console.log(`Você se deparou com um monstro. Suas características são: `);
        monstro.mostrarDados();

        if(monstro.index == 0){
            userInput = prompt("Deseja lutar (y para sim e n para não) ? ");
        }
        else {
            console.log("Você se deparou com o ultimo monstro da dungeon. Ele é o monstro mais forte do local. ");
            console.log("Se você for lutar contra ele, corre o risco de morrer. Tem certeza que deseja lutar contra ele? ");
            userInput = prompt("Deseja lutar (y para sim e n para não) ? ");
            console.log("");

            // Só pode pular o primeiro monstro
            if(userInput != 'y' ){
                console.log("Essa não. O monstro sentiu o seu cheiro e agora está indo atrás de você. Você terá que lutar agora. Ponha suas armas a postos");
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
        }
    
        if(vaiLutar){
            await this.lutar(jogador, monstro);
        }
    }

      
    async lutar(jogador, monstro){
        let danoJogador, danoMonstro;
        console.log(" ------------------------------ ");
        console.log(`O jogador da classe ${jogador.getNome()} esta lutando com o monstro ${monstro.getNome()}`);
        
        while((jogador.getVida() > 0) && (monstro.getVida() > 0)){
            console.log("Lutando... \n");
            await this.sleep(3);

            danoJogador = jogador.atacar();
            monstro.sofrerDano(danoJogador);

            if(monstro.getVida() <= 0){
                console.log("Monstro Derrotado");
                break;
            }
    
            danoMonstro = monstro.atacar();
            jogador.sofrerDano(danoMonstro);

        }

        console.log("Luta encerrada...\n");

        if(jogador.getVida() > 0){
            this.receberRecompensas(jogador, monstro);
        }else{
            console.log(`O jogador de classe ${jogador.getNome()} morreu ao lutar contra o ${monstro.getNome()} no ${this.getNome()}!`);
            this.gameOver = true;
        }

    }
    receberRecompensas(jogador, monstro){
        console.log(`Parabéns caro jogador. Você ganhou contra o ${monstro.getNome()} no ${this.getNome()}!`);
        console.log(`Você receberá ${monstro.getValor()} por ter derrotado o monstro. \n`);
        jogador.receberMoedas(monstro.getValor());
    }

    fimDaFase(jogador){
        this.desistiu = 0;

        if(this.getGameOver()){
            console.log("Game Over.");
        }else{
            console.log(`Parabéns jogador. Voce finalizou o ${this.getNome()}!`);
            jogador.aumentarNivel();
            console.log(`Vamos prosseguir para o proximo andar...`);
        }
    }
    // Função auxiliar
    sleep(seconds){
        return new Promise(resolve =>  {
            setTimeout(() => {
                resolve(seconds);
            }, seconds * 1000);
        });
    }



};

module.exports = FaseGeral;