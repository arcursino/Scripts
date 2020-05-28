class Pessoa{
    constructor(nome,idade){
        this.nome = nome;
        this.idade = idade;
    }

    print = (nome, idade) => {
        console.log( this.nome +" "+ this.idade );
    }
}

class Cliente extends Pessoa{
    constructor(nome, idade, telefone){
        super(nome, idade)
        this.telefone = telefone;
    }

    print = (nome, idade, telefone) => {
        console.log( this.nome +" "+ this.idade + " " + this.telefone);
    }
}

const cliente1 = new Cliente("Ariana",36,12981447997);
const cliente2 = new Cliente("Beatriz",20,1291919191);


cliente1.print();
cliente2.print();