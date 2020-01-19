import React, {Component} from 'react'
import InteressadoDataService from '../service/InteressadoDataService.js';

class ListInteressadoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            areaId: this.props.match.params.areaId,
            interessado: [],
            message: null
        }
        this.refreshInteressado = this.refreshInteressado.bind(this)
        this.deleteInteressadoClicked = this.deleteInteressadoClicked.bind(this)
        this.updateInteressadoClicked = this.updateInteressadoClicked.bind(this)
        this.addInteressadoClicked = this.addInteressadoClicked.bind(this)
    }

    componentDidMount() {
        this.refreshInteressado();
    }

    refreshInteressado() {
        InteressadoDataService.retrieveAllInteressado(this.state.areaId)
            .then(
                response => {
                    this.setState({interessado: response.data})
                }
            )
    }

    deleteInteressadoClicked(areaId, id) {
        InteressadoDataService.deleteInteressado(areaId, id)
            .then(
                response => {
                    this.setState({message: `Exclusão do interessado ${id} feito com sucesso!`})
                    this.refreshInteressado()
                }
            )
    }

    updateInteressadoClicked(areaId, id) {
        this.props.history.push(`/interessado/${areaId}/${id}`)
    }

    addInteressadoClicked(areaId) {
        this.props.history.push(`/interessado/${areaId}/-1`)
    }

    render() {
        return (
            <div className="container">
                <br/>
                <h3 style={{textAlign: "center"}}>Interessados</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <br/>
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Celular</th>
                            <th>Email</th>
                            <th>Endereco</th>
                            <th>Atualizar</th>
                            <th>Deletar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.interessado.map(
                                interessado =>
                                    <tr key={interessado.interessado_id}>
                                        <td>{interessado.interessado_id}</td>
                                        <td>{interessado.interessado_nome}</td>
                                        <td>{interessado.interessado_celular}</td>
                                        <td>{interessado.interessado_email}</td>
                                        <td>{interessado.interessado_endereco}</td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.updateInteressadoClicked(this.state.areaId, interessado.interessado_id)}>Atualizar
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                                    onClick={() => this.deleteInteressadoClicked(this.state.areaId, interessado.interessado_id)}>Deletar
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <button className="btn btn-success"
                            onClick={() => this.addInteressadoClicked(this.state.areaId)}>Adicionar
                    </button>
                </div>
            </div>
        )
    }
}

export default ListInteressadoComponent
