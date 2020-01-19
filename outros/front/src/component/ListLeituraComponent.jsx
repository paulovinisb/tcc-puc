import React, {Component} from 'react'
import LeituraDataService from '../service/LeituraDataService.js';

class ListLeituraComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leitura: [],
            message: null
        }
        this.refreshLeitura = this.refreshLeitura.bind(this)
    }

    componentDidMount() {
        this.refreshLeitura();
    }

    refreshLeitura() {
        LeituraDataService.retrieveAllLeitura()
            .then(
                response => {
                    this.setState({leitura: response.data})
                }
            )
    }

    render() {
        return (
            <div className="container">
                <br/>
                <h3 style={{textAlign: "center"}}>Leituras</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <br/>
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tipo</th>
                            <th>Valor</th>
                            <th>Horário</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.leitura.map(
                                leitura =>
                                    <tr key={leitura.leitura_id}>
                                        <td>{leitura.leitura_id}</td>
                                        <td>{leitura.leitura_tipo}</td>
                                        <td>{leitura.leitura_valor}</td>
                                        <td>{leitura.leitura_horario}</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default ListLeituraComponent
