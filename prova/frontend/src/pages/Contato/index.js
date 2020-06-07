import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

export default function Contato() {
    const [nome, setNome] = useState('');
    const [telefone, setTelefone] = useState('');

    const history = useHistory();

    const idusuario = localStorage.getItem('idusuario');

    async function insertContato(e) {
        e.preventDefault();

        const data = {
            nome,
            telefone,
        }

        try {
            await api.get(`/contato/:${nome}/:${telefone}`, data, {
                headers: {
                    Authorization: idusuario,
                }
            })            
            
            
        }catch (err) {
            alert('Erro ao inserir contato, tente novamente.');
        }
    }

    return (
        <div className="content">
            <div id="login">
            <section className="form">
                <form onSubmit={insertContato}>
                    <h1>Inserir Contato </h1>

                    <p>
                    <label for="nome" class="label">Nome: </label>
                    <input 
                        placeholder="Nome Completo" 
                        value={nome}
                        onChange={e => setNome(e.target.value)}
                    /> 
                    </p>
                    <p>
                    <label for="telefone" class="label">Telefone:</label>   
                    <input type="text" required
                        placeholder="Telefone" 
                        value={telefone}
                        onChange={e => setTelefone(e.target.value)}
                    />
                    </p> <br></br>
                    <button className="button" type="submit" to="/contato">Inserir</button>                

                </form>
                
                <div id="link">
                <Link className="back-link" to="/">
                    <FiArrowLeft  size={18} color="#066a75"/>
                        Voltar para home
                </Link>  
                <Link className="back-link" to="/perfil">
                    <FiArrowRight  size={18} color="#066a75"/>
                        Listar Contatos
                </Link>
                </div>
                 

            </section>   
            </div>        
        </div>
    );
}