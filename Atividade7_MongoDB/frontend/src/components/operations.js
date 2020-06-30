import axios from 'axios';

export const addInstituicao = async (nome, mail, senha) => {
    console.log(nome, mail, senha);
    return await axios.post('/addInstituicao',{nome,mail,senha})
}
