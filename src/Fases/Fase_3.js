const FaseGeral = require('./FaseGeral');
const Golem = require('../Personagens/Monstros/andar_3/Golem');
const Bruxa = require("../Personagens/Monstros/andar_3/Bruxa");

// Monstros da fase/andar 3 da dungeon
const golem = new Golem();
const bruxa = new Bruxa();

class Fase_3 extends FaseGeral{
    constructor(){
        super("Andar das Bestas Algozes"); // Nome do andar/fase
    }

    getNome(){
        return this.nome;
    }

    // Uma breve apresentação do andar/fase
    apresentarFase(){
        console.log(` =================== ${this.getNome()} ===============================`);
        console.log(`Seja bem vindo caro jogador ao primeiro andar desta dungeon!`);
        console.log("O Andar das Bestas Algozes é um labirinto sombrio, onde criaturas ferozes espreitam a cada esquina.");
        console.log("A sobrevivência depende de derrotar seu líder maligno, escondido nas profundezas.");
    }

    // Luta contra os monstros
    async lutar(monstro, jogador){
        let rodadasPoderAtivo, rodadaInicio = 2;  // O poder espcoial do monstro é ativado na 2ª rodada
        let danoJogador, danoMonstro, rodada = 1, taxaReducao, ataqueEspecialAtivo = false, poderAtaqueInicial, defesaInicial;

        rodadasPoderAtivo = parseInt(Math.random() * 8 + 1); // O monstro podera ter seu poder ativo por no minimo 1 rodada e no max 8. Valor aleatório. 

        console.log("\n---------------------------- LUTA COM O MONSTRO -------------------------------------\n");
        console.log(`O jogador da classe ${jogador.getNome()} esta lutando com o monstro ${monstro.getNome()}`);
        
        // Loop para execução da luta 
        while((jogador.getVida() > 0) && (monstro.getVida() > 0)){
            console.log("Lutando... \n");
            console.log(`\n--------------------- RODADA - ${rodada} ------------------------\n`);
            await this.utilities.sleep(1);                  // Uma pequena pausa entre as rodadas para dar a ideia de uma luta real.


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

            // Vez de ataque do jogador.
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
                else {                      // BRUXA --> Enfraquece o poder de ataque e defesa do jogador para 40% do poder original
                    if(rodada == rodadaInicio){     // Os status são afetados somente na primeira vez em que são ativados
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

            // Caso o jogador morra antes do monstro, devido ao ataque especial, termina a luta.
            if(jogador.getVida() <= 0){
                console.log(`O ${jogador.getNome()} foi derrotado`);
                break;
            }

            // Se o monstro morrer após ser atacado, ele não ataca o jogador e a luta termina.
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
    
            // Vez de ataque do monstro
            danoMonstro = monstro.atacar();
            jogador.sofrerDano(danoMonstro);

            rodada++;
        }
        
        // Fim da luta e anuncio do resultado
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

    // Função para verificar se o jogador vai lutar com o monstro. Caso sim, inicia a luta.
    async lutarComMonstro(monstro, jogador){
        console.log(`Você estava andando pelo caminho e acabou se deparando com uma movimentação estranha. Logo você percebe que se encontrou com um monstro. `);
        let vaiLutar = this.encontroComMonstro(monstro, jogador);
        if(vaiLutar){
            await this.lutar(monstro, jogador);
        }
    }

    // Função que dá inicio à fase que é chamada na parte principal do cógigo (index.js)
    async iniciarFase(jogador, gameOverStatus){
        this.apresentarFase();
        this.utilities.esperarValorUsuario();

        // Encontro e possível luta com o 1º monstro
        await this.lutarComMonstro(golem, jogador);
        this.utilities.esperarValorUsuario();

        // Encontro e luta com o 2º monstro, se o jogador não tiver morrido contra o primeiro.
        if(!this.getGameOver()){
            await this.lutarComMonstro(bruxa, jogador);
            this.utilities.esperarValorUsuario();
        }

        // Finalizar a fase e avançar para o proximo andar.
        this.fimDaFase(jogador);
        this.utilities.esperarValorUsuario();
    }
}

module.exports = Fase_3;