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
        <Row className="justify-content-center">
            <Col xs='11' sm='9' md='6' lg='5' xl='4'>
                <Form className='mt-5' onSubmit={this.enviar} >
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
                    <Button>Enviar</Button>
                    {
                        erro !== '' && 
                        <Alert color="danger" className="mt-3"> {erro} </Alert>
                    }
                    {
                        msg !== '' &&
                        <Alert color="success" className="mt-3">{msg}</Alert>
                    }
                </Form>
            </Col>
        </Row>
    )    
}
