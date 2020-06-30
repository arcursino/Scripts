import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from 'reactstrap';
import { Link } from "react-router-dom";

export default class Header extends React.Component {
    constructor() {
        super();
        this.state = {
            collapsed: true
        }
    }

    toggleNavbar = () => {
        const aux = !this.state.collapsed
        this.setState({
            collapsed: aux
        })
    }

    render() {
        return (
            <Navbar color="dark" dark expand="sm">
                <NavbarBrand href="/">Gastos e Ganhos</NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <Nav className="mr-auto" navbar>
                    </Nav>
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar>
                            <DropdownToggle nav caret>Cadastro</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem>
                                    <Link to='/login'>Logar</Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to='/cadastro'>Cadastrar-se</Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Link to='/dados'>Dados</Link>
                                </DropdownItem>
                                <DropdownItem divider />
                                <DropdownItem>
                                    <Link to='/logout'>Sair</Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        )
    }
}
