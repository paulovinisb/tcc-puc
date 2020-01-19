import React, {Component} from 'react'
import AreasDataService from '../service/AreasDataService.js';

class ListAreasComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            areas: [],
            message: null
        }
        this.refreshAreas = this.refreshAreas.bind(this)
        this.deleteAreasClicked = this.deleteAreasClicked.bind(this)
        this.updateAreasClicked = this.updateAreasClicked.bind(this)
        this.addAreasClicked = this.addAreasClicked.bind(this)
        this.interessadoAreasClicked = this.interessadoAreasClicked.bind(this)
        this.sensoresAreasClicked = this.sensoresAreasClicked.bind(this)
    }

    componentDidMount() {
        this.refreshAreas();
    }

    refreshAreas() {
        AreasDataService.retrieveAllAreas()
            .then(
                response => {
                    this.setState({areas: response.data})
                }
            )
    }

    deleteAreasClicked(id) {
        AreasDataService.deleteAreas(id)
            .then(
                response => {
                    this.setState({message: `Exclusão da area ${id} feita com sucesso!`})
                    this.refreshAreas()
                }
            )
    }

    updateAreasClicked(id) {
        this.props.history.push(`/areas/${id}`)
    }

    addAreasClicked() {
        this.props.history.push(`/areas/-1`)
    }

    interessadoAreasClicked(id){
        this.props.history.push(`/interessado/${id}`)
    }

    sensoresAreasClicked(id){
        this.props.history.push(`/sensores/${id}`)
    }

    render() {
        return (
            <div className="container">
                <br/>
                <h3 style={{textAlign: "center"}}>Áreas</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <br/>
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nome</th>
                            <th>Coordenadas</th>
                            <th>Tipo</th>
                            <th>Interessados</th>
                            <th>Sensores</th>
                            <th>Atualizar</th>
                            <th>Deletar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.areas.map(
                                area =>
                                    <tr key={area.areaId}>
                                        <td>{area.areaId}</td>
                                        <td>{area.area_nome}</td>
                                        <td>{area.area_coordenadas}</td>
                                        <td>{area.area_tipo}</td>
                                        <td>
                                            <button className="btn btn-primary"
                                                    onClick={() => this.interessadoAreasClicked(area.areaId)}>Interessados
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-info"
                                                    onClick={() => this.sensoresAreasClicked(area.areaId)}>Sensores
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.updateAreasClicked(area.areaId)}>Atualizar
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                                    onClick={() => this.deleteAreasClicked(area.areaId)}>Deletar
                                            </button>
                                        </td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
                <div className="row">
                    <button className="btn btn-success" onClick={this.addAreasClicked}>Adicionar</button>
                </div>
            </div>
        )
    }
}

export default ListAreasComponent
