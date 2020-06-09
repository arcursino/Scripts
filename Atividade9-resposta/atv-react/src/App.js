import React from 'react';
import { Box, Container, Grid, TextField, FormControl,
         InputLabel, Select, Table, MenuItem } from '@material-ui/core';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


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
           
       this.setState({
         dia: dia,                
         tempo: tempo,
         tempMax: tempMax,
         tempMin: tempMin,
         indUv: indUv
        });        
     })
     .catch(erro => {
       console.log(erro);
       this.setState({erro: "Problemas de acesso ao servidor"});
     })
    }
  }
   
  render() {
    return (
      <Box mt={6}>
        <Container maxWidth="md">
          <Grid container spacing={3}>
            <Grid item sm={6}>
              <TextField onSubmit={this.buscaCidades}              
               label="Nome da Cidade"
               fullWidth={true}              
               value={this.state.nome}
               onChange={this.buscaCidades}
               placeholder="Digite pelo menos as 3 primeiras letras"
              />
            </Grid>
          <Grid  item sm={6}>
            <FormControl>
            <InputLabel id="cidades">Cidades</InputLabel>
            <Select 
              labelId="cidades"
              fullWidth={true}
              value={this.state.value}
              onChange={(e) => this.buscaPrevisao(e)}
            > 
            <MenuItem>{this.state.cidades}</MenuItem>         
            </Select>
            </FormControl>
          </Grid> 
        </Grid>
        <Grid item xs={12}>
          <Table> 
            <TableHead> 
              <TableRow>
                <TableCell colSpan="5">
                 {this.state.cidade.nome} - {this.state.cidade.uf} ({this.state.cidade.atualizacao})
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody> 
              <TableRow>
                <TableCell> Dia </TableCell>
                {this.state.previsao.map((item) =>
                <TableCell>{this.formatData(item.dia)}</TableCell>)}
              </TableRow>
              <TableRow>
                <TableCell> Condições do Tempo </TableCell>
                {this.state.previsao.map((item) =>
                <TableCell>{this.getTempo(item.tempo)}</TableCell>)}
              </TableRow>
              <TableRow>
                <TableCell> Temp. máxima </TableCell>
                {this.state.previsao.map((item) =>
                <TableCell>{item.maxima}</TableCell>)}
              </TableRow>
              <TableRow>
                <TableCell> Temp. mínima </TableCell>
                {this.state.previsao.map((item) =>
                <TableCell>{item.minima}</TableCell>)}
              </TableRow>
              <TableRow>
                <TableCell> Índice ultravioleta </TableCell>
                {this.state.previsao.map((item) =>
                <TableCell>{item.iuv}</TableCell>)}
              </TableRow>
            </TableBody>  
          </Table>        
        </Grid> 
      </Container>
    </Box>
    )
  }
}