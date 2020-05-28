import React from "react";


export default class Form extends React.Component {
  constructor () {
    super();
    this.state = {
      nome: ''
    }
  }

  alterar = (evento) => {
    this.setState({
      nome: evento.target.value
    });
  }

  limpar = () => {
    this.setState ({
      nome:''
    });
  }

  submeter = (evento) => {
    evento.preventDefault();
    this.props.adicionar(this.state.nome);
    this.limpar();
  }


  render() {
    return (
      <form onReset={this.limpar} onSubmit={this.submeter}>
        <div> 
          <label>Nome </label>
            <input type="text" value={this.state.nome}
              onChange={this.alterar}></input>            
        </div>
        <div>
          <button type="submit" disabled={this.state.nome === ''}> Salvar </button>
          <button type = "reset"> Limpar </button>
        </div> 
      </form>       
               
    );
  }
}