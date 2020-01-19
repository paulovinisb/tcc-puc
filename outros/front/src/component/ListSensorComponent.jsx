import React, {Component} from 'react'
import SensorDataService from '../service/SensorDataService.js';

class ListSensorComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            areaId: this.props.match.params.areaId,
            sensor: [],
            message: null
        }
        this.refreshSensor = this.refreshSensor.bind(this)
        this.deleteSensorClicked = this.deleteSensorClicked.bind(this)
        this.updateSensorClicked = this.updateSensorClicked.bind(this)
        this.addSensorClicked = this.addSensorClicked.bind(this)
    }

    componentDidMount() {
        this.refreshSensor();
    }

    refreshSensor() {
        SensorDataService.retrieveAllSensor(this.state.areaId)
            .then(
                response => {
                    this.setState({sensor: response.data})
                }
            )
    }

    deleteSensorClicked(areaId, id) {
        SensorDataService.deleteSensor(areaId, id)
            .then(
                response => {
                    this.setState({message: `Exclusão do sensor ${id} feito com sucesso!`})
                    this.refreshSensor()
                }
            )
    }

    updateSensorClicked(areaId, id) {
        this.props.history.push(`/sensores/${areaId}/${id}`)
    }

    addSensorClicked(areaId) {
        this.props.history.push(`/sensores/${areaId}/-1`)
    }

    render() {
        return (
            <div className="container">
                <br/>
                <h3 style={{textAlign: "center"}}>Sensores</h3>
                {this.state.message && <div class="alert alert-success">{this.state.message}</div>}
                <br/>
                <div className="container">
                    <table className="table">
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Tipo</th>
                            <th>Coordenada</th>
                            <th>Status</th>
                            <th>Atualizar</th>
                            <th>Deletar</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.sensor.map(
                                sensor =>
                                    <tr key={sensor.sensorId}>
                                        <td>{sensor.sensorId}</td>
                                        <td>{sensor.sensor_tipo}</td>
                                        <td>{sensor.sensor_coordenada}</td>
                                        <td>{sensor.sensor_status}</td>
                                        <td>
                                            <button className="btn btn-success"
                                                    onClick={() => this.updateSensorClicked(this.state.areaId, sensor.sensorId)}>Atualizar
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger"
                                                    onClick={() => this.deleteSensorClicked(this.state.areaId, sensor.sensorId)}>Deletar
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
                            onClick={() => this.addSensorClicked(this.state.areaId)}>Adicionar
                    </button>
                </div>
            </div>
        )
    }
}

export default ListSensorComponent
