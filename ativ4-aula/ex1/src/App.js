import React from 'react';
import { Container, Row, Col, Input, InputGroup, InputGroupAddon, Button, Card, CardBody,
   CardTitle, CardText } from 'reactstrap';
import {chaves} from './keys';

 export default class App extends React.Component {
   constructor() {
     super();
     this.state = {
       cidade: '',
       entrada: '',
       temperatura: '',
       umidade: '',
       erro:''
     }     
   }

   requisicao = () => {
     console.log('clicou')
     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.state.entrada},br&APPID=${chaves.appid}`)
     .then(r => r.json())
     .then(json => {
       console.log(json.main);
       if (json.message !== undefined) {
         this.setState({
           erro: json.message
         })
       }
       else {
         this.setState({
           cidade: json.name,
           temperatura: json.main.temp,
           umidade: json.main.humidity,
           erro: ''
         })
       }
     })
     .catch(erro => {
       this.setState({
        cidade: '',
        temperatura: '',
        umidade: '',
         erro: erro.message
       })
     });
   }

  render() {
    return (
      <Container className="mt-3">
        <Row className="justify-content-center">
          <Col xs="12" sm="10" md="8" lg="6" xl="5" className="p-0"> 
          <InputGroup>
              <InputGroupAddon addonType="prepend">Cidade</InputGroupAddon>
              <Input 
              placeholder="Nome Completo" 
              value={this.state.entrada}
              onChange={e => this.setState({entrada:e.target.value})}
              />
              <InputGroupAddon addonType="append">
                <Button color="secondary" onClick={this.requisicao} >Buscar</Button></InputGroupAddon>
          </InputGroup>
          </Col>
        </Row>
        <Row className="justify-content-center mt-2">
          <Col xs="12" sm="10" md="8" lg="6" xl="5" className="p-0">
          <Card>            
            <CardBody>
              <CardTitle>Resultado da OpenWeather API </CardTitle>
              {
                this.state.cidade !== '' &&
                <>
                  <CardText>Cidade: {this.state.cidade}</CardText>
                  <CardText>Temperatura: {this.state.temperatura}ºC</CardText>
                  <CardText>Umidade Relativa do Ar: {this.state.umidade}%</CardText>
                </>
              }              
              {
                this.state.erro !== '' &&
                <CardText>Mensagem de erro: {this.state.erro}</CardText>
              }              
            </CardBody>
          </Card>
          </Col>
        </Row>
      
      </Container>
    )
  }
}