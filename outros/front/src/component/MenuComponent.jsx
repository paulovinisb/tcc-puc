import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import AuthenticationService from '../service/AuthenticationService';

class MenuComponent extends Component {

    render() {
        const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

        return (
            <header>
                <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                    <div><a href="/" className="navbar-brand">Principal</a></div>
                    <ul className="navbar-nav">
                        <li><Link className="nav-link" to="/areas">Áreas</Link></li>
                        <li><Link className="nav-link" to="/leituras">Leituras</Link></li>
                        <li><Link className="nav-link" to="/usuario">Usuários</Link></li>
                        <li><Link className="nav-link" to="/setor">Setores</Link></li>
                    </ul>
                    <ul className="navbar-nav navbar-collapse justify-content-end">
                        {!isUserLoggedIn && <li><Link className="nav-link" to="/login">Entrar</Link></li>}
                        {isUserLoggedIn && <li><Link className="nav-link" to="/logout" onClick={AuthenticationService.logout}>Sair</Link></li>}
                    </ul>
                </nav>
            </header>
        )
    }
}

export default withRouter(MenuComponent)