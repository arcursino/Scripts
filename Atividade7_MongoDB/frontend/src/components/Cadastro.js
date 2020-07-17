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
    Alert
} from 'reactstrap';

import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import text1 from '../static/text1.png';
import logo from '../static/logo.PNG';

export default function Cadastro () {
    const [mail, setMail] = useState('')
    const [senha, setSenha] = useState('')    
    const [confirmacao, setConfirmacao] = useState('')
    const [erro, setErro] = useState('')
    const [msg, setMsg] = useState('') 

    const enviar = (e) => {
        e.preventDefault();
        setErro('')        
        if( mail === '')
            setErro('Forneça o e-mail')
        else if( senha === '')
            setErro('Forneça a senha')
        else if( senha !== confirmacao )
            setErro('A senha e a confirmação precisam ser iguais')
        else{
            api.post('/add', { mail, senha })
              .then(res => {
                if(res.data.result){
                    setMsg(res.data.result)
                    setMail('')
                    setSenha('')
                }                                        
                else
                    setErro(res.data.message)
              })
              .catch(e => setErro(e.message))
        }
    }
  
    return (
        <Row className="justify-content-center mt-2" style={{marginTop:0, paddingTop:0}}>
            <Col xs='8' sm='6' md='4' lg='4' xl='3'>
                <img src={logo} alt="Logo" style={{width: 200, height: 160, marginTop:30, marginLeft:50}}/>
                <img src={text1} alt="Texto 1" style={{width: 280, height: 50, marginBottom:20, marginLeft:5}} />
            <Form className='mt-2' onSubmit={enviar} >
                    <FormGroup>
                    <Label>Email de cadastro</Label>
                    <Input
                        type="email"
                        placeholder="forneça o seu e-mail"
                        value={mail}
                        onChange={(e) => setMail(e.target.value)}
                        required />
                </FormGroup>
                <FormGroup>
                    <Label>Senha</Label>
                    <Input
                        type="password"
                        placeholder="senha para login"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        minLength="6" maxLength="10"
                        required />
                </FormGroup>
                <FormGroup>
                    <Label>Confirmação da senha</Label>
                    <Input
                        type="password"
                        placeholder="repetir a senha"
                        value={confirmacao}
                        onChange={(e) => setConfirmacao(e.target.value)}
                        minLength="6" maxLength="10"
                        required />
                </FormGroup>
                <Button color="success" style={{width: 310, height: 40, marginBottom:10}}>Cadastrar</Button>
                {
                    erro !== '' && 
                    <Alert color="danger" className="mt-3"> {erro} </Alert>
                }
                {
                    msg !== '' &&
                    <Alert color="success" className="mt-3">{msg}</Alert>
                }               
                <Row style={{marginLeft:5}}>
                    <Link className="back-link" to="/login">
                        <FiLogIn className='mr-2' size={20} color="#009e73"/>
                        Voltar para Home
                    </Link> 
                </Row>
            </Form>
        </Col>
        </Row>
    )    
}
