// ======================== DEPENDENCIAS EXTERNAS ========================
const prompt = require('prompt-sync')();

// ======================== INSTÂNCIAS DE CLASSES ========================
const Fase_1 = require('./Fases/fase_1');
const Fase_2 = require('./Fases/fase_2');
const Fase_3 = require('./Fases/Fase_3');
const FaseBonus = require('./Fases/FaseBonus');

const Arqueiro = require('./Personagens/Heroi/Arqueiro');
const Guerreiro = require('./Personagens/Heroi/Guerreiro');
const Ladino = require('./Personagens/Heroi/Ladino');
const Mago = require('./Personagens/Heroi/Mago');

const Utilities = require("./Utilities");

// ======================== OBJETOS GLOBAIS =============================
const utilities = new Utilities();

const fase_1 = new Fase_1();
const fase_2 = new Fase_2();
const fase_3 = new Fase_3();
const faseBonus = new FaseBonus();

// ================================== INICIO DO GAME =============================
async function main(){

    //  -------- Apresentação da Dungeon -------------
    console.log("Seja bem vindo caro aventureiro à Dungeon das Bestas. Vamos comecar? ");
    var nomeJogador = getNome();
    utilities.esperarValorUsuario();

    // --------- Escolha de Classe ------------------
    var jogador = escolhaDeClasse(nomeJogador);
    utilities.esperarValorUsuario();

    // --------------- FASES -----------------
    // FASE 1
    console.log("");
    
    await fase_1.iniciarFase(jogador);    
    console.log("================================================================================================================");

    // FASE 2

    console.log("");
    await fase_2.iniciarFase(jogador);
    console.log("================================================================================================================");

    // FASE BONUS
    console.log("");
    if(fase_2.entradaSecreta){
        faseBonus.iniciarFase(jogador);
        console.log("================================================================================================================");
    }    

    // FASE 3 -- FINAL
    console.log("");
    await fase_3.iniciarFase(jogador);    


    // ---------------- Fim do Jogo -------------------
    fimDeJogo();


    // ================================== INICIO DO GAME =============================

}

main() // Chamando a função principal do jogo para executar o código

// =================================== FIM DO JOGO ===============================



// =================================== FUNÇOES ===================================
//função para pegar o nome do jogador e fazer algumas validações. 
function getNome(){
    let valorUsuario = "", nomePadronizado = "", tamanhoNome= 0;
    valorUsuario = utilities.validarValorUsuario("Digite seu nome (Sem acentuação): ", "string");

    tamanhoNome = valorUsuario.length;

    nomePadronizado = utilities.validarNome(valorUsuario, tamanhoNome);  // Realizar a padronização explicada no comentário da função

    console.log("Faça seu nome ser marcado na história, caro Aventureiro!\n");
    
    return nomePadronizado;
}

// Função para que o jogador escolha sua classe desejada.
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
    
    }while(valorUsuario.toUpperCase() != 'Y');


    console.log(`\nClasse escolhida com sucesso: ${classeEscolhida.getNome()}! Boa sorte ${nomeJogador}.`);

    return classeEscolhida;
}


// Função para finalizar o jogo + alguns créditos
function fimDeJogo(){
    console.log("\n============================== FIM DO JOGO =======================================\n");
    console.log("Parabens caro aventureiro, por ter finalizado a Dungeon das Bestas...");
    console.log("Seu nome ficará marcado por toda história como sendo o maior dentre todos.")
    console.log("Que, em suas próximas aventuras, você se lembre dessa conquista e use como motivação em sua jornada");
    console.log("\n==================================================================================\n");
    // Créditos
    console.log(" ------------------------------------ TEXT ADVENTURE GAME --------------------------------------------");
    console.log("- Nome do jogo: Dungeon das Bestas");
    console.log("- Densenvolvido por: Pedro H. P. Silva");
    console.log("- Ano: 2024")
    console.log("\nTodos os direitos reservados.");
}

