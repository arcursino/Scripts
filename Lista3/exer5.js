const random = async max => Math.floor(Math.random() * max);

random(20).then(
    resultado => {
        console.log(resultado+resultado)
    }
)