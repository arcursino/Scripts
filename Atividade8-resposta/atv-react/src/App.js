import React from 'react';
import { Container, Row, Col, Input, Label, FormGroup, Table, } from 'reactstrap';


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
     nome: '',
     lista: [{
       id: '',
       cidade: '',
       estado: ''
     }],
     cidade: {
       nome: '',
       uf: '',
       atualizacao: ''
     },
     previsao: [{
       dia: '',
       tempo: '',
       maxima: '',
       minima: '',
       iuv: ''
     }],
     
   };
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
      let cidade = xml.getElementsByTagName('cidade')[0];
      this.setState({ cidade: {} })
      this.setState({ previsao: [] })       
      
           
      this.setState({
        previsao: [],
        cidade: {} 
       });

      for (let i = 3; i < 7; i++) {
       this.setState(prevState => ({
         previsao: [
           ...prevState.previsao,
           {
             dia: cidade.childNodes[i].childNodes[0].childNodes[0].nodeValue,
             tempo: cidade.childNodes[i].childNodes[1].childNodes[0].nodeValue,
             maxima: cidade.childNodes[i].childNodes[2].childNodes[0].nodeValue,
             minima: cidade.childNodes[i].childNodes[3].childNodes[0].nodeValue,
             iuv: cidade.childNodes[i].childNodes[4].childNodes[0].nodeValue
           }]
       })
       )
     }

     this.setState(prevState => ({
       cidade: {
         ...prevState.cidade,
         nome: cidade.childNodes[0].childNodes[0].nodeValue,
         uf: cidade.childNodes[1].childNodes[0].nodeValue,
         atualizacao: cidade.childNodes[2].childNodes[0].nodeValue
       }
     })
     )

   })
   .catch(erro => {       
    console.log(erro);
    this.setState({
     previsao: [],
     cidade: {} ,
     erro: "Problemas de acesso ao servidor"});
  })
 }
 }
   
 render() {
  return (
    <Container fluid="md" className="mt-3">
      <Row form>
        <Col  md="6">
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
      <Row>
        <Col>
        
        <Table responsive >          
        {
            this.state.value !== '' &&
            <>
              <tr>
                <th className="text-center" colSpan="5">
                  {this.state.cidade.nome} - {this.state.cidade.uf} ({this.state.cidade.atualizacao})
                </th>
              </tr>
              <tr>
                <th>Dia</th>
                {this.state.previsao.map((item) =>
                  <td>{this.formatData(item.dia)}</td>)}
              </tr>
              <tr>
            
                <th>Dia</th>
                {this.state.previsao.map((item) =>
                  <td>{this.formatData(item.dia)}</td>)}
              </tr>
              <tr>
                <th>Condições do Tempo</th>
                {this.state.previsao.map((item) =>
                  <td>{this.getTempo(item.tempo)}</td>)}
              </tr>
              <tr>
                <th>Temp. máxima</th>
                {this.state.previsao.map((item) =>
                  <td>{item.maxima}</td>)}
              </tr>
              <tr>
                <th>Temp. mínima</th>
                {this.state.previsao.map((item) =>
                  <td>{item.minima}</td>)}
              </tr>
              <tr>
                <th>Índice ultravioleta</th>
                {this.state.previsao.map((item) =>
                  <td>{item.iuv}</td>)}
              </tr>
              </>
            }
            {
              this.state.erro !== '' &&
              <td>Mensagem de erro: {this.state.erro}</td>
            } 
        </Table>      
        </Col>
      </Row>      
    </Container>
  )
  }
}