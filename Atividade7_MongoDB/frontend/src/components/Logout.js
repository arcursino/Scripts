import React, { useState, useEffect } from 'react';
import api from './api';
import {
    Row,
    Col,
} from 'reactstrap';


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
            </Col>
        </Row>
    )    
}
