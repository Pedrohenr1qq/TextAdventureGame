// ======================== DEPENDENCIAS EXTERNAS ========================
const prompt = require('prompt-sync')();

// ======================== INSTÂNCIAS DE CLASSES ========================
const Fase_1 = require('./Fases/fase_1');
const Fase_2 = require('./Fases/fase_2');

const Arqueiro = require('./Personagens/Heroi/Arqueiro');
const Guerreiro = require('./Personagens/Heroi/Guerreiro');
const Ladino = require('./Personagens/Heroi/Ladino');
const Mago = require('./Personagens/Heroi/Mago');

const LojaItens = require('./LojaItens/LojaItens');

// ======================== OBJETOS GLOBAIS =============================
const fase_1 = new Fase_1();
const fase_2 = new Fase_2();


const lojaItens = new LojaItens();

// ================================== INICIO DO GAME =============================
async function main(){

    //  -------- Apresentação da Dungeon -------------
    console.log("Seja bem vindo caro jogador à Dungeon das Bestas. Vamos comecar? ");
    var nomeJogador = prompt("Digite seu nome: ");
    var jogador = escolhaDeClasse(nomeJogador);


    // --------------- FASES -----------------
    // FASE 1
    console.log("");
    await fase_1.iniciarFase(jogador);

    //Apresentar Inventário:
    console.log("");
    console.log("======================================================");
    console.log("Antes de prosseguirmos, há algo que eu gostaria de te contar...");
    console.log("Agora que você completou o primeiro nível, és digno de ter acesso à loja da dungeon");
    lojaItens.apresentarLoja();
    console.log("======================================================");

    // FASE 2
    console.log("");
    await fase_2.iniciarFase(jogador);


    // FASE 3

    // FASE 4

    // FASE 5 -- BONUS

    // FASE 6 -- FINAL

}

main() // Chamando a função principal do jogo para executar o código

// =================================== FIM DO JOGO ===============================

// =================================== FUNÇOES ===================================
function escolhaDeClasse(nomeJogador){
    let valorUsuario, classeEscolhida;
    console.log("Vamos escolher sua classe. Escolha umas das classes abaixo: ");
    console.log(" 0 - Guerreiro");
    console.log(" 1 - Mago");
    console.log(" 2 - Arqueiro");
    console.log(" 3 - Ladino");
    

    do{
        valorUsuario = +prompt("Digite sua escolha: ");
        switch (valorUsuario) {
            case 0:
                classeEscolhida = new Guerreiro(nomeJogador);
                break;
        
            case 1:
                classeEscolhida = new Mago(nomeJogador);
                break;
            
            case 2: 
                classeEscolhida = new Arqueiro(nomeJogador);
                break;
            
            case 3:
                classeEscolhida = new Ladino(nomeJogador);
                break;

            default:
                console.log("Valor não reconhecido. Tente Novamente.");
                break;
        }
    }while((valorUsuario != 0) && (valorUsuario != 1) && (valorUsuario!= 2) && (valorUsuario !=3) );

    return classeEscolhida;

}

