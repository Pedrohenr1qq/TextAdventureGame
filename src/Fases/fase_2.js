const FaseGeral = require('./FaseGeral');
const Fantasma = require('../Personagens/Monstros/andar_2/Fantasma');
const Basilico = require('../Personagens/Monstros/andar_2/Basilico');

// Monstros da fase/andar 2 da dungeon
const fantasma = new Fantasma();
const basilico = new Basilico();

class Fase_2 extends FaseGeral{
    entradaSecreta = false;
    gameOver = false;
    constructor(){
        super("Andar das Bestas Mágicas") // Nome do andar/fase
    }

    getNome(){
        return this.nome;
    }
    // Uma breve apresentação do andar/fase
    apresentarFase(){
        console.log(` =================== ${this.getNome()} ===============================`);
        console.log(`Seja bem vindo caro jogador ao segundo andar desta dungeon!`);
        console.log("Este andar é repleto de seres mágicos e imprevisíveis.");
        console.log("Você tem a destreza e, principalmente, a sorte para iniciar nesta jornada? ");
    }

    // Luta contra os monstros
    async lutar(monstro, jogador){
        let rodadasPoderAtivo, rodadaInicio = 3;  // O poder especial do monstro é ativado na 3ª rodada
        let danoJogador, danoMonstro, rodada = 1, danoInicialJogador, pretrificacao = false, ataqueEspecialAtivo = false;

        rodadasPoderAtivo = parseInt(Math.random() * 5 + 1); // O monstro podera ter seu poder ativo por no minimo 1 rodada e no max 5. Valor aleatório. 

        console.log("\n -------------------------- LUTA COM O MONSTRO -------------------------------------\n");
        console.log(`O jogador da classe ${jogador.getNome()} esta lutando com o monstro "${monstro.getNome()}"`);

        // Loop para execução da luta 
        while((jogador.getVida() > 0) && (monstro.getVida() > 0)){
            console.log("Lutando... \n");
            console.log(`\n--------------------- RODADA - ${rodada} ------------------------\n`);
            await this.utilities.sleep(1);                  // Uma pequena pausa entre as rodadas para dar a ideia de uma luta real.

            if(rodada == rodadaInicio){ // Ataque especial dos monstros ativado
                ataqueEspecialAtivo = true;
                if(monstro.index == 0) danoInicialJogador = monstro.ataqueEspecial(jogador);    // Poder especial do fantasma.
                else pretrificacao = monstro.ataqueEspecial(jogador);                           // Poder especial do Basilico;
                console.log(`Você deve aguentar por: ${rodadasPoderAtivo} rodadas`);
                console.log("");
                this.utilities.esperarValorUsuario();
            }

            if(rodada == (rodadaInicio + rodadasPoderAtivo)){ // Após n = rodadasPoderAtivo rodadas, o jogador volta ao normal
                console.log(`\nParabéns Aventureiro, o efeito de ataque especial do monstro "${monstro.getNome()}" passou. Você aguentou bem...\n`);
                // Restauração dos atributos do jogador
                if(monstro.index == 0) jogador.setPoderAtaque(danoInicialJogador);      
                pretrificacao = false;                                                          
                ataqueEspecialAtivo = false;
                this.utilities.esperarValorUsuario();
            }
            
            // Vez de ataque do jogador.
            if(!ataqueEspecialAtivo) {
                danoJogador = jogador.atacar();
                monstro.sofrerDano(danoJogador)
            }

            else{
                console.log(`O ${jogador.getNome()} está sob efeito do ataque especial do monstro "${monstro.getNome()}"`);
                console.log();
                if(pretrificacao){
                    console.log(`O ${jogador.getNome()} está petrificado e não poderá atacar...`);
                }
                else{
                    danoJogador = jogador.atacar(); // Apenas para visualização
                    console.log(`O ${jogador.getNome()} não consegue acertar seus ataques...`);
                }
            }

            // Caso o jogador morra antes do monstro, devido ao ataque especial, termina a luta.
            if(jogador.getVida() <= 0){
                console.log(`O ${jogador.getNome()} foi derrotado`);
                break;
            }
            
            // Se o monstro morrer após ser atacado, ele não ataca o jogador e a luta termina.
            if(monstro.getVida() <= 0){
                console.log(`O monstro "${monstro.getNome()}" foi derrotado`);
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

    // Função para dar acesso à fase bonus, que concede tesouros extras ao jogador.
    encontroEntradaSecreta(){
        let userInput;
        console.log("-----------------------------------------------------------------------------------------------");
        console.log("Ao andar pela dundeon, você se deparou com uma porta secreta");
        console.log("Coberta de mugos e simbolos arcanos, ela parece levar para um local cheio de riquezas desconhecidas da dungeon.")
        console.log("Se você seguir adiante, entrará na fase final e, caso consiga derrotar os ultimos montros, terá concluído a dungeon e seu nome entrará para a história.");
        console.log("E então, caro aventureiro, o que você irá fazer? ");
        console.log("");
        userInput = this.utilities.validarValorUsuario("Digite y para adentrar a porta secreta e qualquer outro valor para ignorar: ", "string");
        if(userInput.toUpperCase() == 'Y'){
            console.log("Muito bem. Vejo que você é corajoso. Que você encontre tesouros jamais visto por olho humano e que a dungeon te guie...");
            this.entradaSecreta = true;
        }
        else{
            console.log("Continuando com o caminho...\n");
            this.entradaSecreta = false;
        }

        console.log("--------------------------------------------------------------------");
    }

    // Função que dá inicio à fase que é chamada na parte principal do cógigo (index js)
    async iniciarFase(jogador){
        this.apresentarFase();
        this.utilities.esperarValorUsuario();
        
        // Encontro e possível luta com o 1º monstro
        await this.lutarComMonstro(fantasma, jogador);
        this.utilities.esperarValorUsuario();

        // Encontro e luta com o 2º monstro, se o jogador não tiver morrido contra o primeiro.
        if(!this.getGameOver()){
            await this.lutarComMonstro(basilico, jogador);
            this.utilities.esperarValorUsuario();
        }

        // Finalizar a fase e avançar para o proximo andar.
        this.fimDaFase(jogador);
        this.utilities.esperarValorUsuario();

        // Entrada secreta, caso o jogador não tenha perdido contra os monstros
        if(!this.getGameOver()){
            this.encontroEntradaSecreta();
            this.utilities.esperarValorUsuario();
        }
    }
}

module.exports = Fase_2;