const FaseGeral = require('./FaseGeral');
const Golem = require('../Personagens/Monstros/andar_3/Golem');
const Bruxa = require("../Personagens/Monstros/andar_3/Bruxa");

const golem = new Golem();
const bruxa = new Bruxa();

class Fase_3 extends FaseGeral{
    constructor(){
        super("Andar das Bestas Algozes");
    }

    getNome(){
        return this.nome;
    }

    apresentarFase(){
        console.log(` =================== ${this.getNome()} ===============================`);
        console.log(`Seja bem vindo caro jogador ao primeiro andar desta dungeon!`);
        console.log("O Andar das Bestas Algozes é um labirinto sombrio, onde criaturas ferozes espreitam a cada esquina.");
        console.log("A sobrevivência depende de derrotar seu líder maligno, escondido nas profundezas.");
    }

    async lutar(monstro, jogador){
        let rodadasPoderAtivo, rodadaInicio = 2;  // O poder espcoial do monstro é ativado na 2ª rodada
        let danoJogador, danoMonstro, rodada = 1, taxaReducao, ataqueEspecialAtivo = false, poderAtaqueInicial, defesaInicial;

        rodadasPoderAtivo = parseInt(Math.random() * 8 + 1); // O monstro podera ter seu poder ativo por no minimo 1 rodada e no max 8. Valor aleatório. 

        console.log("\n---------------------------- LUTA COM O MONSTRO -------------------------------------\n");
        console.log(`O jogador da classe ${jogador.getNome()} esta lutando com o monstro ${monstro.getNome()}`);
        
        while((jogador.getVida() > 0) && (monstro.getVida() > 0)){
            console.log("Lutando... \n");
            console.log(`\n--------------------- RODADA - ${rodada} ------------------------\n`);
            await this.utilities.sleep(1);


            if(rodada == rodadaInicio){ // Ataque especial dos monstros ativado
                ataqueEspecialAtivo = true;
                taxaReducao = monstro.ataqueEspecial();
                console.log(`Você deve aguentar por: ${rodadasPoderAtivo} rodadas`);
                this.utilities.esperarValorUsuario();
            }

            if(rodada == (rodadaInicio + rodadasPoderAtivo)){ // Após n = rodadasPoderAtivo rodadas, o jogador volta ao normal
                console.log(`\nParabéns Aventureiro, o efeito de ataque especial do monstro "${monstro.getNome()}" passou. Você aguentou bem...\n`);
                if(monstro.index == 1){
                    console.log("Atributos restaurados: ");
                    jogador.alterarAtributo("Poder de Ataque", poderAtaqueInicial);
                    jogador.alterarAtributo("Defesa", defesaInicial);
                    console.log("");
                }
                ataqueEspecialAtivo = false;

                this.utilities.esperarValorUsuario();
            }

            danoJogador = jogador.atacar();

            if(!ataqueEspecialAtivo) monstro.sofrerDano(danoJogador);

            else {    
                console.log(`\nO ${jogador.getNome()} foi afetado pelo ataque especial do monstro "${monstro.getNome()}"... \n`);

                if(monstro.index == 0) {    // GOLEM --> reflete 70% do dano recebido e recebe 30%
                    console.log(`O jogador teve seu dano refletido em ${this.utilities.arredondarValor(taxaReducao*100)}%.`);
                    jogador.sofrerDano(danoJogador * taxaReducao);
                    console.log(`O monstro "${monstro.getNome()}" receberá ${this.utilities.arredondarValor((1 - taxaReducao) * 100)}% do dano do ${jogador.getNome()}`);
                    monstro.sofrerDano(danoJogador * (1 - taxaReducao));
                }
                else {                      // BRUXA 
                    if(rodada == rodadaInicio){
                        poderAtaqueInicial = jogador.alterarAtributo("Poder de Ataque", jogador.getPoderAtaque() * taxaReducao);
                        defesaInicial = jogador.alterarAtributo("Defesa", jogador.getDefesa() * taxaReducao);
                        this.utilities.esperarValorUsuario();
                    }
                    console.log("");
                    danoJogador = jogador.getPoderAtaque();
                    monstro.sofrerDano(danoJogador)
                }
                console.log("");
            }

            if(jogador.getVida() <= 0){
                console.log(`O ${jogador.getNome()} foi derrotado`);
                break;
            }

            if(monstro.getVida() <= 0){
                console.log(`O monstro "${monstro.getNome()}" foi derrotado`);
                if((monstro.index == 1) && (rodada <= (rodadaInicio + rodadasPoderAtivo))){     // Se a bruxa tiver morrido enquanto seu poder ainda estava ativo
                    console.log("Atributos restaurados: ");                                     // Restaura os atributos do jogador para os valores iniciais.
                    jogador.alterarAtributo("Poder de Ataque", poderAtaqueInicial);
                    jogador.alterarAtributo("Defesa", defesaInicial);
                    console.log("");
                }
                break;
            }
    
            danoMonstro = monstro.atacar();
            jogador.sofrerDano(danoMonstro);

            rodada++;
        }

        console.log("Luta encerrada...\n");

        console.log(`Vida do ${jogador.getNome()} : ${this.utilities.arredondarValor(jogador.getVida())}`);
        this.utilities.esperarValorUsuario();

        if(jogador.getVida() <= 0){
            console.log(`O aventureiro da classe ${jogador.getNome()} morreu ao lutar contra o monstro "${monstro.getNome()}" no ${this.getNome()}!`);
            this.gameOver = true;

        }else{
            this.receberRecompensas(jogador, monstro);  
            this.gameOver = false;
        }

    }

    async lutarComMonstro(monstro, jogador){
        console.log(`Você estava andando pelo caminho e acabou se deparando com uma movimentação estranha. Logo você percebe que se encontrou com um monstro. `);
        let vaiLutar = this.encontroComMonstro(monstro, jogador);
        if(vaiLutar){
            await this.lutar(monstro, jogador);
        }
    }

    async iniciarFase(jogador, gameOverStatus){
        if(!gameOverStatus){
            this.apresentarFase();
            this.utilities.esperarValorUsuario();

            await this.lutarComMonstro(golem, jogador);
            this.utilities.esperarValorUsuario();



            if(!this.getGameOver()){
                await this.lutarComMonstro(bruxa, jogador);
                this.utilities.esperarValorUsuario();
            }
            
            this.fimDaFase(jogador);
            this.utilities.esperarValorUsuario();

        }

        return this.getGameOver();
    }


}

module.exports = Fase_3;