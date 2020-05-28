json = [{
        "nome" : "Ana Maria",
        "idiomas" : ["espanhol","francês"],
        "caracteristicas" : [{"peso" : 62.5},{"altura" : 1.67}]
    },
    {
        "nome" : "Carlos",
        "idiomas" : ["ingles"],
        "caracteristicas" : [{"sexo":"M"},{"altura":1.8},{"doador":true}]
    },
    {
        "nome" : "Rodrigo",
        "idiomas" : ["espanhol","francês","inglês"],
        "caracteristicas" : [{"desportista" : true},{"voluntario" : true}]
    }
]

var associados = json.forEach(element => {
    console.log(element.associados);
});