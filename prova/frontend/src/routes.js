import React from 'react';
import { BrowserRouter, Route, Switch} from 'react-router-dom';

import Login from './pages/Login';
import Contato from './pages/Contato';
import Perfil from './pages/Contato/perfil';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/contato" exact component={Contato} />
                <Route path="/perfil" exact component={Perfil} />   
            />               
            </Switch>
        </BrowserRouter>
    )
}