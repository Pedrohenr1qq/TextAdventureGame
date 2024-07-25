// ======================== DEPENDENCIAS EXTERNAS ========================
const prompt = require('prompt-sync')();

// ======================== INSTÂNCIAS DE CLASSES ========================
const Fase_1 = require('./Fases/fase_1');
const Fase_2 = require('./Fases/fase_2');
const Fase_3 = require('./Fases/Fase_3');

const Arqueiro = require('./Personagens/Heroi/Arqueiro');
const Guerreiro = require('./Personagens/Heroi/Guerreiro');
const Ladino = require('./Personagens/Heroi/Ladino');
const Mago = require('./Personagens/Heroi/Mago');

const LojaItens = require('./LojaItens/LojaItens');

const Utilities = require("./Utilities");

// ======================== OBJETOS GLOBAIS =============================
const utilities = new Utilities();

const fase_1 = new Fase_1();
const fase_2 = new Fase_2();
const fase_3 = new Fase_3();

const lojaItens = new LojaItens();

// ================================== INICIO DO GAME =============================
async function main(){

    //  -------- Apresentação da Dungeon -------------
    console.log("Seja bem vindo caro jogador à Dungeon das Bestas. Vamos comecar? ");
    var nomeJogador = getNome();
    utilities.esperarValorUsuario();
    var jogador = escolhaDeClasse(nomeJogador);
    utilities.esperarValorUsuario();

    var gameOverStatus;

    // --------------- FASES -----------------
    // FASE 1
    console.log("");
    
    gameOverStatus = await fase_1.iniciarFase(jogador);

    utilities.esperarValorUsuario();
    
    console.log("================================================================================================================");

    // FASE 2
    console.log("");
    gameOverStatus = await fase_2.iniciarFase(jogador, gameOverStatus);

    console.log("================================================================================================================");

    // FASE 3

    console.log("");
    await fase_3.iniciarFase(jogador, gameOverStatus);


    // FASE 4

    // FASE 5 -- BONUS

    // FASE 6 -- FINAL

}

main() // Chamando a função principal do jogo para executar o código

// =================================== FIM DO JOGO ===============================

// =================================== FUNÇOES ===================================
function getNome(){
    let valorUsuario = "", nomePadronizado = "", tamanhoNome= 0;
    valorUsuario = utilities.validarValorUsuario("Digite seu nome (Sem acentuação): ", "string");

    tamanhoNome = valorUsuario.length;

    nomePadronizado = utilities.validarNome(valorUsuario, tamanhoNome);  // Realizar a padronização explicada no comentário da função

    console.log("Faça seu nome ser marcado na história, caro Aventureiro!\n");
    
    return nomePadronizado;
}



function escolhaDeClasse(nomeJogador){
    let valorUsuario, classeEscolhida;

    do{
        console.log("Vamos escolher sua classe. Escolha umas das classes abaixo: ");
        console.log(" 1 - Guerreiro");
        console.log(" 2 - Mago");
        console.log(" 3 - Arqueiro");
        console.log(" 4 - Ladino");

        do{
            valorUsuario = utilities.validarValorUsuario("Digite sua escolha: ", "numero");
            switch (valorUsuario) {
                case 1:
                    classeEscolhida = new Guerreiro(nomeJogador);
                    break;
            
                case 2:
                    classeEscolhida = new Mago(nomeJogador);
                    break;
                
                case 3: 
                    classeEscolhida = new Arqueiro(nomeJogador);
                    break;
                
                case 4:
                    classeEscolhida = new Ladino(nomeJogador);
                    break;
    
                default:
                    console.log("Valor não reconhecido. Tente Novamente.");
                    break;
            }
    
    
        }while((valorUsuario != 1) && (valorUsuario != 2) && (valorUsuario!= 3) && (valorUsuario !=4) );
    
        classeEscolhida.mostrarDados();
    
        valorUsuario = utilities.validarValorUsuario("Tem certeza da sua escolha (digite y para continuar e qualquer outro valor para escolher outra classe) ? ");
    
    }while(valorUsuario != 'y');


    console.log(`\nClasse escolhida com sucesso: ${classeEscolhida.getNome()}! Boa sorte ${nomeJogador}.`);

    return classeEscolhida;

}

