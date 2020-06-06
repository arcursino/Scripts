import React from 'react';
import { Container, Row, Col, Input, Label, Form, FormGroup, Table, } from 'reactstrap';


 export default class App extends React.Component {
   constructor() {
     super();
     this.state = {      
       erro:'',
       dia: '',       
       tempo: [],
       tempMax: [],
       tempMin: [],
       indUv: [],
     }     
   }

   formatData = data => {
    let d = data.split('-');
    return d[2] + '/' + d[1] + '/' + d[0];
   }

   
  getTempo = sigla => {
    return {
    'ec': 'Encoberto com Chuvas Isoladas',
    'ci': 'Chuvas Isoladas',
    'c': 'Chuva',
    'in': 'Instável',
    'pp': 'Poss. de Pancadas de Chuva',
    'cm': 'Chuva pela Manhã',
    'cn': 'Chuva a Noite',
    'pt': 'Pancadas de Chuva a Tarde',
    'pm': 'Pancadas de Chuva pela Manhã',
    'np': 'Nublado e Pancadas de Chuva',
    'pc': 'Pancadas de Chuva',
    'pn': 'Parcialmente Nublado',
    'cv': 'Chuvisco',
    'ch': 'Chuvoso',
    't': 'Tempestade',
    'ps': 'Predomínio de Sol',
    'e': 'Encoberto',
    'n': 'Nublado',
    'cl': 'Céu Claro',
    'nv': 'Nevoeiro',
    'g': 'Geada',
    'ne': 'Neve',
    'nd': 'Não Definido',
    'pnt': 'Pancadas de Chuva a Noite',
    'psc': 'Possibilidade de Chuva',
    'pcm': 'Possibilidade de Chuva pela Manhã',
    'pct': 'Possibilidade de Chuva a Tarde',
    'pcn': 'Possibilidade de Chuva a Noite',
    'npt': 'Nublado com Pancadas a Tarde',
    'npn': 'Nublado com Pancadas a Noite',
    'ncn': 'Nublado com Poss. de Chuva a Noite',
    'nct': 'Nublado com Poss. de Chuva a Tarde',
    'ncm': 'Nubl. c/ Poss. de Chuva pela Manhã',
    'npm': 'Nublado com Pancadas pela Manhã',
    'npp': 'Nublado com Possibilidade de Chuva',
    'vn': 'Variação de Nebulosidade',
    'ct': 'Chuva a Tarde',
    'ppn': 'Poss. de Panc. de Chuva a Noite',
    'ppt': 'Poss. de Panc. de Chuva a Tarde',
    'ppm': 'Poss. de Panc. de Chuva pela Manhã'
    }[sigla];
   }

   buscaCidades = e => {
     console.log('clicou')
     this.setState({
       nome: e.target.value
     });
     if (e.target.value.length >=3) {
       let nome = e.target.value.normalize("NFC").replace(/[\u0300.\u036f]/g,"")
       this.setState({erro: ''});
       fetch(`http://servicos.cptec.inpe.br/XML/listaCidades?city=${nome}`,{ method: "GET" })
      .then(response => response.arrayBuffer())
      .then(buffer => {
        let decoder = new TextDecoder("iso-8859-1");
        return decoder.decode(buffer);
      })
      .then(str => {
        let parser = new window.DOMParser()
        let xml = parser.parseFromString(str, "text/xml");
        console.log('cidade:' + xml);
        //obter a tag cidades
        let cidades = xml.getElementsByTagName('cidades')[0];
        let lista = [];
        lista.push(<option key='-1' value=''>Selecione a Cidade</option>);
        cidades.childNodes.forEach((obj, index) => {
          lista.push(
          <option key={index} value={obj.childNodes[2].childNodes[0].nodeValue}>
            {obj.childNodes[0].childNodes[0].nodeValue} - {obj.childNodes[1].childNodes[0].nodeValue}
          </option>
          )
        });
        console.log(lista);
        this.setState({cidades: lista});
      })
      .catch(erro => {
        console.log(erro);
        this.setState({erro: "Problemas de acesso ao servidor"});
      })
     }
   }

   buscaPrevisao = e => {
    console.log('previsao'); 
       
    if (e.target.value !== '') {   
      fetch(`http://servicos.cptec.inpe.br/XML/cidade/${e.target.value}/previsao.xml`,{ method: "GET" })
     .then(response => response.arrayBuffer())
     .then(buffer => {
       let decoder = new TextDecoder("iso-8859-1");
       return decoder.decode(buffer);
     })
     .then(str => {
       let parser = new window.DOMParser()
       let xml = parser.parseFromString(str, "text/xml");
       console.log(xml);
       //obter as tags das previsões:   
       let dia = xml.getElementsByTagName('dia');                 
       let tempo = xml.getElementsByTagName('tempo');       
       let tempMax = xml.getElementsByTagName('maxima');
       let tempMin = xml.getElementsByTagName('minima');
       let indUv = xml.getElementsByTagName('iuv');       
       
       console.log(dia, tempo, tempMax, tempMin, indUv);       
       this.setState({
         dia: dia,                
         tempo: tempo,
         tempMax: tempMax,
         tempMin: tempMin,
         indUv: indUv
        });
        console.log('1' + dia, tempo)
     })
     .catch(erro => {
       console.log(erro);
       this.setState({erro: "Problemas de acesso ao servidor"});
     })
    }
  }
   
  render() {
    return (
      <Container fluid="md" className="mt-3">
        <Form>
        <Row form>
          <Col md="6">
            <FormGroup onSubmit={this.buscaCidades}>              
              <Label>Nome</Label>
              <Input
              type="textArea" 
              value={this.state.value}
              onChange={this.buscaCidades}
              placeholder="Digite pelo menos as 3 primeiras letras"
              />              
            </FormGroup>
          </Col>
          <Col md="6">
            <FormGroup>
            <Label>Cidades</Label>
            <Input type="select" 
              value={this.state.value}
              onChange={(e) => this.buscaPrevisao(e)}
            > 
            <>{this.state.cidades}</>         
            </Input>
            </FormGroup>
          </Col>
          </Row>
          </Form>
        <Row>
          <Col>
            <Table bordered onSubmit={this.buscaPrevisao}>
              <thead>
                <tr>
                  <th className="text-center" colSpan="5"> Cidade - UF (dia) </th>                  
                </tr>
              </thead>
              <thead>
                <tr>
                  <th scope="row">Dia</th>
                  <th>dia1</th> 
                  <th>Dia2</th> 
                  <th>Dia3</th>  
                  <th>Dia4</th>                 
                </tr>
              </thead>
              <thead>
                <tr>
                  <th scope="row">Condições do Tempo</th> 
                  <th>dia</th> 
                  <th>Dia2</th> 
                  <th>Dia3</th>  
                  <th>Dia4</th>                 
                </tr>
              </thead>
              <thead>
                <tr>
                  <th scope="row">Temp. máxima</th> 
                  <th>Dia1</th> 
                  <th>Dia2</th> 
                  <th>Dia3</th>  
                  <th>Dia4</th>                 
                </tr>
              </thead>
              <thead>
                <tr>
                  <th scope="row">Temp. mínima</th> 
                  <th>Dia1</th> 
                  <th>Dia2</th> 
                  <th>Dia3</th>  
                  <th>Dia4</th>                 
                </tr>
              </thead>
              <thead>
                <tr>
                  <th scope="row">Índice ultravioleta</th> 
                  <th>Dia1</th> 
                  <th>Dia2</th> 
                  <th>Dia3</th>  
                  <th>Dia4</th>                 
                </tr>
              </thead>              
            </Table>
          </Col>
        </Row>
      
      </Container>
    )
  }
}