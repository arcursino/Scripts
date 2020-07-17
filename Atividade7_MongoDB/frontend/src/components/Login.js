import React, { useState } from 'react';
import api from './api';
import {
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Row,
    Col,
    Alert,
} from 'reactstrap';
import { Redirect, Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import text1 from '../static/text1.png';
import logo from '../static/logo.PNG';


export default function Login () {
    const [mail, setMail] = useState('')
    const [senha, setSenha] = useState('')
    const [message, setMessage] = useState('')
    const [result, setResult] = useState('')
    const [logado, setLogado] = useState(false)
    
    const enviar = (e) => {
        e.preventDefault();
        setMessage('')
        if (mail === '')
            setMessage('Forneça o e-mail')
        else if (senha === '')
            setMessage('Forneça a senha')
        else {
            api.post(
                '/login', { mail, senha })
            .then(res => {
                if (res.data.result){
                    setResult(res.data.result)
                    setMail('')
                    setSenha('')
                    setLogado(true)                    
                }
                else
                    setMessage(res.data.message )
            })
            .catch(e => setMessage(e.message))
        }
    }
    
    return (
        <Row className="justify-content-center mt-2" style={{marginTop:0, paddingTop:0}}>
            <Col xs='8' sm='6' md='4' lg='4' xl='3'> 
                <img src={logo} alt="Logo" style={{width: 200, height: 160, marginTop:30, marginLeft:50}}/>
                <img src={text1} alt="Texto 1" style={{width: 280, height: 50, marginBottom:20, marginLeft:5}} />                            
                <Form onSubmit={enviar}>
                    <FormGroup>
                        <Label for="mail">Email</Label>
                        <Input 
                            type="email"
                            placeholder="e-mail de login"
                            value={mail}
                            onChange={(e) => setMail(e.target.value.trim())}
                            required />
                    </FormGroup>
                    <FormGroup>
                        <Label for="senha">Senha</Label>
                        <Input
                            type="password"
                            placeholder="senha de login"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value.trim())}
                            minLength="6" maxLength="10"
                            required />
                    </FormGroup>
                    <Button color="success" style={{width: 310, height: 40, marginBottom:10}}>Entrar</Button>
                    {
                        message !== '' &&
                        <Alert color="danger" className="mt-3">{message}</Alert>
                    }
                    {
                        result !== '' &&
                        <Alert color="success" className="mt-3">{result}</Alert>
                    }
                    {
                        logado  && <Redirect to="/dados" />
                    } 
                    <Row style={{marginLeft:5}}> 
                    <Link className="back-link" to="/cadastro">
                        <FiLogIn size={16} color="#009e73"/>
                        Nao tenho cadastro
                    </Link> 
                    </Row>                 
                </Form>
            </Col>
        </Row>
    )    
}
