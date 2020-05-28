import React from 'react';
import { render } from "react-dom";
import Form from "./components/Form";
import Tabela from "./components/Tabela";


class App extends React.Component {
    constructor() {
      super();
      this.state = {        
        nome: []
      };
      
    }    

    adicionar (evento) {
        this.setState({nome: [...this.state.array, evento]
        })
    }
      
    render() {
        return (
            <div> 
                <Form add={(evento) =>this.adicionar(evento)}/> 
                <Tabela  nome={this.nome}/>
            </div>
        );                     
    }
}
  
render(<App />, document.getElementById("root"));
