import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

export default function Contato() {
    const [mail, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.get(`/login/${mail}/${senha}`);            
            
            history.push('/contato');
        }catch (err) {
            alert('Login efetuado com sucesso');
        }
    }

    return (
        <div className="content">
            <div id="login">
            <section className="form">
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Login </h1>

                    <p>
                    <label for="email" class="label">Email</label>
                    <input required
                        placeholder="Seu email" 
                        value={mail}
                        onChange={e => setEmail(e.target.value)}
                    /> 
                    </p>
                    <p>
                    <label for="senha" class="label">Senha</label>   
                    <input type="password" required
                        placeholder="Senha" 
                        value={senha}
                        onChange={e => setSenha(e.target.value)}
                    />
                    </p>
                    <button className="button" type="submit">Entrar</button>                

                </form>                
            </section>   
            </div>        
        </div>
    );
}