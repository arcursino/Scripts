import React from 'react';
import Login from './Login';
import Logout from './Logout';
import Cadastro from './Cadastro';
import Dados from './Dados';
import NoMatch from './NoMatch';

const rotas = [
    {
        path: "/",
        exact: true,
        component: () => <Login />
    },
    {
        path: "/login",
        exact: true,
        component: () => <Login />
    },
    {
        path: "/cadastro",
        exact: true,
        component: () => <Cadastro />
    },
    {
        path: "/dados",
        exact: true,
        component: () => <Dados />
    },
    {
        path: "/logout",
        exact: true,
        component: () => <Logout />
    },
    {
        path: "*",
        component: () => <NoMatch />
    }
];

export default rotas;