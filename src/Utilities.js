// Classe para verificação e validação de valores, segundo o tipo de valor requisitado
const prompt = require("prompt-sync")();


class Utilities{
    constructor(){}

    arredondarValor(valor){
        return valor.toFixed(2);
    }

    esperarValorUsuario(){
        console.log("");
        let valorUsuario = prompt("Digite alguma coisa para continuar: ");
        console.log("");
        return valorUsuario;
    }

    // Função para verificar se um valor é um numero inteiro positivo (Não faz sentido se ter números negativos nesse contexto)
    // Retorna um número valido
    validarNumero(valor){
        let valorNumerico = !(isNaN(valor));   // Se não (não é um número), é um número
        let valorPositivo = (valor >= 0);
        let valorNaoVazio = (valor != "");

        let valorValido = ((valorNumerico) && (valorPositivo) && valorNaoVazio);
        return valorValido;
    }

    // função para verficar se um valor é uma string valida (valor não numerico e com conteudo)
    // Retorna uma string válida
    validarString(valor){
        let valorNaoNumerico = !(this.validarNumero(valor)); 
        let valorNaoVazio = (valor != "");           
        let valorValido = ((valorNaoNumerico) && (valorNaoVazio));
        return valorValido;
    }

    // Função para validar os valores digitados pelo usuário, segundo o tipo requisitado
    // Retorna um valor (número ou string) válido
    validarValorUsuario(mensagem, tipoValor){
        let valorUsuario;
        let valorValido;
        
        do{
            if(tipoValor == "numero"){
                valorUsuario = +(prompt(mensagem));
                valorValido = this.validarNumero(valorUsuario);
            }
            else{
                valorUsuario = (prompt(mensagem))
                valorUsuario = valorUsuario.replace(/[^a-zA-Z\s]/g,'');         // Regex (expressão regular) para permitir somente valores do alfabeto (sem numeros ou caracteres especiais)
                valorValido = this.validarString(valorUsuario);
            }

            if(!valorValido){
                console.log("Esse valor não é válido. Tente novamente.");
            }

        }while(!valorValido);                                       // Só continua o programa se o usuário fornecer um valor válido

        console.log("");

        return valorUsuario;
    }

    // Função para padronizar o nome. Iniciais maiúsculas, sem espaços no inicio e no fim e sem caracteres especiais. Não permite acentuação (Ponto a melhorar)
    // Retorna um nome valido, segundo o padrão acima.
    validarNome(nome, tamanhoNome){                                 
        let nomePadronizado = "";
        let casoMaiusculo = false;
        
        for(let i = 0; i < tamanhoNome; i++){        
            if((i == 0) && (nome[0] != " ")){                                   // Se o primeiro caractere do nome não for um espaço em branco,
                casoMaiusculo = true;                                           // coloca ele em maiúsculo
            }
    
            if(casoMaiusculo){
                nomePadronizado += nome[i].toUpperCase();
                casoMaiusculo = false;
            }
            else{   
                nomePadronizado += nome[i];                             // Colocar o resto do nome normalmente
            }
            
            if((nome[i] == " ") && ((i+1) < tamanhoNome) ){             // se houver um espaço e ele não estiver na ultima posição do nome,
                casoMaiusculo = true;                                   // o proximo caractere deve ser maiusculo
            }
        }
            
        nomePadronizado = nomePadronizado.trim();                       // Removendo espaçoes desnecessários
                
        return nomePadronizado;
    }

    // Função auxiliar
    sleep(seconds){
        return new Promise(resolve =>  {
            setTimeout(() => {
                resolve(seconds);
            }, seconds * 1000);
        });
    }



    // ========================== TEST FUNCTIONS ==============================
    // função para teste do programa. 
    // Trava o código no ponto em que a função for colocada, até que o desenvolver digite algum valor. 
    // Permite que alguma mensagem seja mostrada, pelo atributo msg.
    debug(msg){
        console.log(msg);
        let continueProgram = false;
        while(!continueProgram){
            if(prompt("Continue (type anything)?  ") != ""){
                break;
            }
        }
    }
}



module.exports = Utilities;