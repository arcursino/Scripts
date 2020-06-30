import React, { useState, useEffect } from 'react';
import api from './api';
import {
    Alert, Row, Col, Form, FormGroup, Label, Input, Button
} from 'reactstrap';

export default function Dados() {
    const [ganhos, setGanhos] = useState([]);
    const [gastos, setGastos] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [result, setResult] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        list()
        // eslint-disable-next-line
    }, []);

    const moneyFormat = (valor) => valor !== '' ? 'R$' + parseFloat(valor).toFixed(2).replace(".", ",") : '';

    const dateFormat = (data) => {
        if (data !== '') {
            const d = new Date(data);
            const dia = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
            const mes = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
            const hora = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
            const minuto = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
            const segundos =
                d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
            return (
                dia +
                '/' +
                mes +
                '/' +
                d.getFullYear() +
                ' ' +
                hora +
                ':' +
                minuto +
                ':' +
                segundos
            );
        } else return '';
    }


    const add = (op) => {
        const url = op === 'ganho' ? '/addganho' : '/addgasto'
        api.post(url, {
            descricao,
            valor
        })
            .then(res => {
                if (res.data.result) {
                    setResult(res.data.result);
                    setMessage('');
                    setDescricao('');
                    setValor('');
                    list();
                }
                else
                    setMessage(res.data.message);
            })
            .catch(e => setMessage(e.message));
    }

    const list = () => {
        api.post('/list')
            .then(res => {
                if (res.data.result) {
                    const ganhos = res.data.result.ganhos.map(ganho =>
                        <option key={ganho._id} {...ganho}>{ganho.descricao} {moneyFormat(ganho.valor)} {dateFormat(ganho.data)}</option>
                    )
                    const gastos = res.data.result.gastos.map(gasto =>
                        <option key={gasto._id} {...gasto}>{gasto.descricao} {moneyFormat(gasto.valor)} {dateFormat(gasto.data)}</option>
                    )
                    setGanhos(ganhos);
                    setGastos(gastos);
                    setMessage('');
                }
                else
                    setMessage(res.data.message);
            })
            .catch(e => setMessage(e.message));
    }

    return (
        <Form>
            {message !== '' &&
                <Row className="justify-content-center mt-5">
                    <Col xs='12' sm='10' md='7' lg='6' xl='5'>
                        <Alert color="danger">{message}</Alert>
                    </Col>
                </Row>
            }
            {result !== '' &&
                <Row className="justify-content-center mt-5">
                    <Col xs='12' sm='10' md='7' lg='6' xl='5'>
                        <Alert color="success">{result}</Alert>
                    </Col>
                </Row>
            }
            <Row className="justify-content-center mt-3">
                <Col xs='12' sm='10' md='7' lg='6' xl='5'>
                    <FormGroup>
                        <Label for="descricao">Descrição</Label>
                        <Input
                            type="text"
                            id="descricao"
                            placeholder="digite algo para identificar"
                            value={descricao}
                            onChange={e => setDescricao(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="valor">Valor</Label>
                        <Input
                            type="number"
                            id="valor"
                            placeholder="digite o valor do ganho ou gasto"
                            value={valor}
                            onChange={e => setValor(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Button color="primary" className='mr-2' onClick={add.bind(this, 'ganho')}>Adicionar ganho</Button>
                        <Button color="danger" onClick={add.bind(this, 'gasto')}>Adicionar gasto</Button>
                    </FormGroup>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs='12' sm='10' md='7' lg='6' xl='5'>
                    <FormGroup>
                        <Label for="ganhos">Ganhos</Label>
                        <Input type="select" id="ganhos" style={{ height: '200px' }} multiple>
                            {ganhos}
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs='12' sm='10' md='7' lg='6' xl='5'>
                    <FormGroup>
                        <Label for="gastos">Gastos</Label>
                        <Input type="select" id="gastos" style={{ height: '200px' }} multiple>
                            {gastos}
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
        </Form>
    )
}