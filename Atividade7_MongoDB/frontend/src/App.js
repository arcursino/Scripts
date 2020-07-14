import React from 'react';
import rotas from './components/routes';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

export default function App (){ 
    return (
      <BrowserRouter>        
        <Switch>
          {rotas.map((rota, indice) => (
            <Route key={indice} {...rota} />
          ))}
        </Switch>
      </BrowserRouter>
    );  
}

