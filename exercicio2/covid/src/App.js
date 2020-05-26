import React from 'react';
import { Table } from 'reactstrap';

const apikey = "SUA CHAVE";

export default class App extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {
    fetch("https://covid-193.p.rapidapi.com/statistics", {
      method: "GET",
      headers: {
        "x-rapidapi-host": "covid-193.p.rapidapi.com",
        "x-rapidapi-key": apikey
      }
    })
      .then(response => response.text())
      .then(texto => JSON.parse(texto))
      .then(json => {
        const { response } = json; //pega apenas parte do objeto
        response.sort((a, b) => b.cases.total - a.cases.total);  
        const aux = response.map(item => (
          <tr>
            <td>{item.country}</td>
            <td>{item.cases.total}</td>
            <td>{item.cases.new}</td>
            <td>{item.deaths.total}</td>
            <td>{item.deaths.new}</td>
          </tr>
        ));

        this.setState({
          dados: aux
        });
      })
      .catch(err => {
        console.log(err);
      });    
  }

 
  render() {
    return (
      <Container className="mt-2">
        <Row className="justify-content-center">
          <Col className="col-md-12 col-lg-10 col-xl-8">
            <Table className="table-striped table-hover table-sm">
              <thead>
                <tr>
                  <th>País</th>
                  <th>Total de casos</th>
                  <th>Novos casos</th>
                  <th>Total de mortos</th>
                  <th>Novas mortes</th>
                </tr>
              </thead>
              <tbody>{this.state.dados}</tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    );
  }
}