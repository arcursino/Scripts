import React, { useState, useEffect } from 'react';
import {
    Alert, Row, Col, Form, FormGroup, Label, Input, Button, CardImg, InputGroup
} from 'reactstrap';
import api from './api'
import {moneyFormat, dateFormat, dateTimeFormat, groupDadosByDate} from './operations'
import Grafico from './Grafico'
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import * as locales from 'react-date-range/dist/locale';
import { confirmAlert } from 'react-confirm-alert'; // https://www.npmjs.com/package/react-confirm-alert
import 'react-confirm-alert/src/react-confirm-alert.css';

import { Link } from 'react-router-dom';

import { GiReceiveMoney, GiPayMoney, GiCalendar } from 'react-icons/gi';
import { IoMdLogOut, IoMdTrash } from 'react-icons/io';

import text1 from '../static/text1.png';

export default function Dados() {
    const [ganhos, setGanhos] = useState([])
    const [gastos, setGastos] = useState([])
    const [grafGastos, setGrafGastos] = useState([])
    const [grafGanhos, setGrafGanhos] = useState([])
    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('')
    const [result, setResult] = useState('')
    const [message, setMessage] = useState('')
    const [showDatePicker, setShowDatePicker] = useState(false)
    const [intervalo, setIntervalo] = useState([
        {
            startDate: addDays(new Date(), -30),
            endDate: new Date(),
            key: 'selection'
        }
    ]);

    useEffect(() => {
        if (!showDatePicker)
            list()
    },[showDatePicker])


    const add = (op) => {
        const url = op === 'ganho' ? '/addganho' : '/addgasto'
        api.post(url, {
            descricao: descricao,
            valor: valor
        })
            .then(res => {
                if (res.data.result) {
                    setResult(res.data.result)
                    setMessage('')
                    setDescricao('')
                    setValor('')
                    list()
                }
                else
                    setMessage(res.data.message)
            })
            .catch(e => setMessage(e.message))
    }
    
    const deletar = (oid,tipo) => {
        confirmAlert({
            message: `Quer excluir este ${tipo}?`,
            buttons: [
              {
                label: 'Sim',
                onClick: () => {
                    const url = tipo === 'ganho' ? '/deleteganho' : '/deletegasto'
                    api.post(url, {oid})
                        .then(res => {
                            if (res.data.result) {
                                setResult(res.data.result)
                                setMessage('')
                                list()
                            }
                            else
                                setMessage(res.data.message)
                        })
                        .catch(e => setMessage(e.message))
                }
              },
              {
                label: 'Não'
              }
            ]
          });
    }
    
    const list = () => {
        const [syear, smonth, sday, eyear, emonth, eday] = [
            intervalo[0].startDate.getFullYear(),
            intervalo[0].startDate.getMonth(),
            intervalo[0].startDate.getDate(),
            intervalo[0].endDate.getFullYear(),
            intervalo[0].endDate.getMonth(),
            intervalo[0].endDate.getDate()
        ]
        api.post('/listByInterval', { syear, smonth, sday, eyear, emonth, eday })
            .then(res => {
                if (res.data.ganhos || res.data.gastos) {
                    const ganhos = res.data.ganhos.map(ganho =>                        
                        <option key={ganho._id} {...ganho} onClick={()=>{console.log(ganho._id);deletar(ganho._id,'ganho')}}>
                            {ganho.descricao} {moneyFormat(ganho.valor)} {dateTimeFormat(ganho.data)}
                            <Link className="delete" to="/deleteganho" />
                    {/*<IoMdTrash size={16} color="#009e73"/>*/}                                                
                        </option>   
                    )
                    const gastos = res.data.gastos.map(gasto =>
                        <option key={gasto._id} {...gasto} onClick={()=>deletar(gasto._id,'gasto')}>
                            {gasto.descricao} {moneyFormat(gasto.valor)} {dateTimeFormat(gasto.data)}
                            <Link className="delete" to="/deletegasto" />
                            <IoMdTrash size={16} color="#009e73"/>
                        </option>
                    )
                    setGanhos(ganhos)
                    setGastos(gastos)
                    const [tempGanho, tempGasto] = groupDadosByDate(res.data.ganhos,res.data.gastos)
                    setGrafGanhos(tempGanho)
                    setGrafGastos(tempGasto)
                    setMessage('')
                }
                else
                    setMessage(res.data.message)
            })
            .catch(e => setMessage(e.message))
    }

    const startDate = dateFormat(intervalo[0].startDate);
    const endDate = dateFormat(intervalo[0].endDate);

    const series = [
        {
          name: 'Ganho',
          data: grafGanhos
        },
        {
          name: 'Gasto',
          data: grafGastos
        },
      ];


    return (
        <Row className="justify-content-center mt-2" style={{marginTop:0, paddingTop:0}}>
            <Col xs="auto" >
                <img src={text1} alt="Texto 1" style={{width: 260, height: 40, marginTop:5, marginBottom:10, marginLeft:80}} />
            </Col>
            <Col xs="auto">
                <Link className="back-link mr-50" to="/logout" style={{marginRight:10, marginTop:5}}>
                        <IoMdLogOut size={20} color="#E02041"/>
                            
                </Link>
            </Col>         
        <Form>
            {message !== '' &&
                <Row className="justify-content-center mt-2" style={{marginTop:0, paddingTop:0}}>
                    <Col xs='12' sm='8' md='4' lg='4' xl='3'>
                        <Alert color="danger">{message}</Alert>
                    </Col>
                </Row>
            }
            {result !== '' &&
                <Row className="justify-content-center mt-2" style={{marginTop:0, paddingTop:0}}>
                    <Col xs='12' sm='8' md='4' lg='4' xl='3'>
                        <Alert color="success">{result}</Alert>
                    </Col>
                </Row>
            }
            <Row className="justify-content-center mt-2" style={{marginTop:0, paddingTop:0}}>
                <Col xs='12' sm='8' md='4' lg='4' xl='3'>
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
                        <GiReceiveMoney className='mr-2 ml-2'size={20} color="#009e73" onClick={add.bind(this, 'ganho')}/> 
                            Adicionar Ganho
                        <GiPayMoney className='mr-2 ml-2' size={20} color="#E02041" onClick={add.bind(this, 'gasto')}/> 
                            Adicionar Gasto
                        <GiCalendar className='mr-2 ml-2' size={20} color="#1a1aff" onClick={() => setShowDatePicker(!showDatePicker)}>                            
                             {showDatePicker ? 'Esconder Calendário' : 'Exibir Calendário'}
                        </GiCalendar>                        
                    </FormGroup>
                    <FormGroup>
                        {showDatePicker &&
                            <DateRange
                                onChange={item => setIntervalo([item.selection])}
                                months={1}
                                showMonthAndYearPickers={false}
                                moveRangeOnFirstSelection={false}
                                ranges={intervalo}
                                maxDate={new Date()}
                                locale={locales['pt']}
                                dateDisplayFormat="dd/MM/yyyy"
                                direction="vertical"
                                scroll={{ enabled: true }}
                            />
                        }
                    </FormGroup>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs='12' sm='8' md='4' lg='4' xl='3'>
                    <FormGroup>
                        <Label for="ganhos">Ganhos</Label>
                        <Input type="select" id="ganhos" style={{ height: '200px' }} multiple>
                            {ganhos}                          
                        </Input>
                        
                    </FormGroup>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs='12' sm='8' md='4' lg='4' xl='3'>
                    <FormGroup>
                        <Label for="gastos">Gastos</Label>
                        <Input type="select" id="gastos" style={{ height: '200px' }} multiple>
                            {gastos}
                        </Input>
                    </FormGroup>
                </Col>
            </Row>
            <Row className="justify-content-center">
                <Col xs='12' sm='8' md='4' lg='4' xl='3'>
                    <FormGroup style={{height:'300px'}}>
                        <Grafico startDate={startDate} endDate={endDate} series={series} />
                    </FormGroup>
                </Col>
            </Row>
        </Form>
        </Row>
    )
}
