class Inventario{
    constructor(tipo, nome, durabilidade, upgradeDeStatus, custo){
        this.tipo = tipo;
        this.nome = nome;
        this.durabilidade = durabilidade;
        this.upgradeDeStatus = upgradeDeStatus;
        this.custo = custo;
    }

    getTipo(){
        return this.tipo;
    }

    getNome(){
        this.nome = nome;
    }

    getDurabilidade(){
        return this.durabilidade;
    }

    getUpgradeDeStatus(){
        return this.upgradeDeStatus;
    }

    getCusto(){
        return this.custo;
    }

};

module.exports = Inventario;