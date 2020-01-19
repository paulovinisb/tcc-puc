import React, { Component } from 'react'

class PrincipalComponent extends Component {
    render() {
        return (
            <div style={{textAlign: "center"}}>
                <br/>
                <h2>Bem-vindo!</h2>
                <div className="container">
                    SISTEMA DE GESTÃO E CONTROLE AMBIENTAL VOLTADO À EMPRESAS MINERADORAS
                    <br/>
                    <br/>
                    <a href="/cadastrar"><button className="btn btn-primary">Cadastrar Interessado</button></a>
                </div>
            </div>
        )
    }
}

export default PrincipalComponent