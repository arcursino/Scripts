import React, { useState, useEffect } from 'react';
import { Link, useHistory, matchPath } from 'react-router-dom';
import { FiArrowLeft, FiPower, FiTrash2, FiRefreshCw } from 'react-icons/fi';
import Popup from "reactjs-popup";

import api from '../../services/api'

import './perfil.css';

export default function Perfil() {
    const [contatos, setContatos] = useState([]);

    const idcontato = localStorage.getItem('idcontato');
    const idusuario = localStorage.getItem('idusuario');
    const nome = localStorage.getItem('nome');
    const telefone = localStorage.getItem('telefone');

    const history = useHistory();

    useEffect(() => {
        api.get('/select', {
            headers: {
                Authorization: idusuario,
            }        
        }).then(response => {
            setContatos(response.data.result);
        })
    }, [idusuario, nome, telefone]);

    async function deleteContato(id){
        try {
            await api.get(`/contato/${id}`,{
                headers: {
                    Authorization: idusuario,
                }
            });
            window.location.reload();
                       

        } catch (err) {
            alert('Erro ao deletar, tente novamente');
        }
    }

    async function atualizaContato(id) {
        try {
            await api.get(`/contato/${id}/${nome}/${telefone}`,{
                headers: {
                    Authorization: idusuario,
                }
                
            });
            setContatos(contatos.filter(contato => contato.id !== id)); 
            window.location.reload();
                        
        } catch (err) {
            alert('Erro ao atualizar, tente novamente');
        }        
    }
    
    async function Logout() {
        try {
            await api.get('/logout',{
                headers: {
                    Authorization: idusuario,
                }
            });
            localStorage.clear();
            history.push('/');
        } catch (err) {
            alert('Problemas para encerrar a sessão');
        }        
    }  


    return (
        <div className="content">            
            <div id="profile">
            <section>                              
                <h1>Contatos Cadastrados </h1>                
                <ul>
                    {contatos.map(contato => (
                    <p > 
                    <li key={contato.id}>
                
                    <strong>Nome:</strong>
                    {contato.nome} <br></br>
                    <strong>Telefone:</strong>
                    {contato.telefone} <br></br>

                    <button onClick={() => deleteContato(contato.idcontato)}
                        type="button"> Deleta
                    <FiTrash2 size={20} color="#a8a8b3" />
                    </button>                    
                    <Popup trigger={<button onClick={() => atualizaContato(contato.idcontato)}
                        type="button"> Atualiza
                        <FiRefreshCw size={20} color="#a8a8b3" />
                        </button>} position="right center">
                        <div>
                        <strong>Nome:</strong>
                        {contato.nome} <br></br>
                        <strong>Telefone:</strong>
                        {contato.telefone} <br></br>
                        </div>
                    </Popup>
                    </li>  
                    </p>
                    ))}
                </ul> <br></br>  
                <Link className="button" to="/">Logout</Link>
                <button onClick={Logout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button><br></br>      
                <Link className="back-link" to="/contato">
                    <FiArrowLeft  size={18} color="#066a75"/>
                        Voltar para Inserir Contatos
                </Link>     

            </section>   
            </div>        
        </div>
    );
}