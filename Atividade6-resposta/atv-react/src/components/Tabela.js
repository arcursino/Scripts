import React from "react";

export default class Tabela extends React.Component {
    render() {
        const nomeOrdenado = this.props.nome.sort().map(nome => <li>{nome}</li>)
        return (
            <div>
                <ol>{nomeOrdenado} </ol>
            </div>
        );
    }
}