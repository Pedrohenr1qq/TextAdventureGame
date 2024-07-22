// ======================== DEPENDENCIAS EXTERNAS ========================
const prompt = require('prompt-sync')();

// ======================== INSTÂNCIAS DE CLASSES ========================
const Fase_1 = require('./Fases/fase_1');
const Guerreiro = require('./Personagens/Heroi/Guerreiro');
const Mago = require('./Personagens/Heroi/Mago');

// ======================== OBJETOS GLOBAIS =============================
const fase_1 = new Fase_1();
const guerreiro = new Guerreiro();
const mago = new Mago();

// ================================== INICIO DO GAME =============================
//  -------- Apresentação da fase -------------
console.log("Seja bem vindo caro jogador à Dungeon das Bestas. Vamos comecar? ");
var nome = prompt("Digite seu nome: ");
var jogador = escolhaDeClasse();


// --------------- FASES -----------------
// FASE 1
console.log("");
fase_1.apresentarFase();
fase_1.iniciarFase(jogador);
fase_1.fimDaFase(jogador);
console.log();




// =================================== FIM DO JOGO ===============================

// =================================== FUNÇOES ===================================
function escolhaDeClasse(){
    let valorUsuario, classeEscolhida;
    console.log("Vamos escolher sua classe. Escolha umas das classes abaixo: ");
    console.log(" 0 - Guerreiro");
    console.log(" 1 - Mago");

    do{
        valorUsuario = +prompt("Digite sua escolha: ");
        switch (valorUsuario) {
            case 0:
                classeEscolhida = guerreiro;
                break;
        
            case 1:
                classeEscolhida = mago;
                break;
    
            default:
                console.log("Valor não reconhecido. Tente Novamente.");
                break;
        }
    }while((valorUsuario != 0) && (valorUsuario != 1));

    return classeEscolhida;

}

