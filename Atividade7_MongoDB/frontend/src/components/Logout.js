import React, { useState, useEffect } from 'react';
import api from './api';
import {
    Row,
    Col,
} from 'reactstrap';

import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';


export default function Logout() {
    const [result, setResult] = useState('Efetuando o logout')
    const [message, setMessage] = useState('')    

    useEffect( () =>  {
        api.post('/logout')
            .then(res => {
                if (res.data.result) {
                    setResult(res.data.result)
                    setMessage('')
                }                   
                else {
                    setResult('')
                    setMessage(res.data.message)
                }
            })
            .catch(e => {
                setResult('')
                setMessage(e.message)                
            })
    }, []) // componentDidMount

    return (
        <Row className="justify-content-center mt-5">
            <Col xs='11' sm='9' md='6' lg='5' xl='3'>
                { 
                    result !== ''&& <p style={{textAlign:'center'}}>{result}</p>
                }
                { 
                    result !== ''&& <p style={{textAlign:'center', color:'red'}}>{message}</p>
                }
                <Row style={{marginLeft:5}}>
                    <Link className="back-link" to="/login">
                        <FiLogIn className='mr-2' size={20} color="#009e73"/>
                        Voltar para Home
                    </Link> 
                </Row>
            </Col>
        </Row>
    )    
}
