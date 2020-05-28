const aluno = {
    nome:'Paulo',
    print: function(){
        console.log(this.nome);
    }
}

const professor = {
    nome:'José',
    print: () => {
        console.log(this.nome);
    }
}

aluno.print();
professor.print("Arley");

// Professor deu undefined, pois 'Funções Arrow' não possuem this em seu escopo