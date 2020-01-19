import React, {Component} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import SensorDataService from '../service/SensorDataService';

class SensorComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            areaId: this.props.match.params.areaId,
            sensorId: this.props.match.params.sensorId,
            sensor_tipo: '',
            sensor_coordenada: '',
            sensor_status: '',
            erro: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        // eslint-disable-next-line
        if (this.state.sensorId == -1) {
            return
        }
        SensorDataService.retrieveSensor(this.state.areaId, this.state.sensorId)
            .then(response => this.setState({
                sensor_tipo: response.data.sensor_tipo,
                sensor_coordenada: response.data.sensor_coordenada,
                sensor_status: response.data.sensor_status
            }))
    }

    onSubmit(values) {
        let sensor = {
            sensorId: this.state.sensorId,
            sensor_tipo: values.sensor_tipo,
            sensor_coordenada: values.sensor_coordenada,
            sensor_status: values.sensor_status
        }

        // eslint-disable-next-line
        if (this.state.sensorId == -1) {
            SensorDataService.createSensor(this.state.areaId, sensor)
                .then(() => this.props.history.push(`/sensores/${this.state.areaId}`))
        } else {
            SensorDataService.updateSensor(this.state.areaId, this.state.sensorId, sensor)
                .then(() => this.props.history.push(`/sensores/${this.state.areaId}`))
        }
    }

    validate(values) {
        let errors = {}
        if (!values.sensor_tipo) {
            errors.erro = 'Digite um tipo'
        }
        if (!values.sensor_coordenada) {
            errors.erro = 'Digite uma coordenada'
        }
        if (!values.sensor_status) {
            errors.erro = 'Digite um status'
        }
        return errors
    }

    render() {
        return (
            <div>
                <br/>
                <h1 style={{textAlign: "center"}}>Sensor</h1>
                <div className="container">
                    <Formik initialValues={this.state}
                            onSubmit={this.onSubmit}
                            validateOnChange={false}
                            validateOnBlur={false}
                            validate={this.validate}
                            enableReinitialize={true}>
                        {
                            (props) => (
                                <Form>
                                    <ErrorMessage name="erro" component="div"
                                                  className="alert alert-warning"/>
                                    <fieldset className="form-group">
                                        <label>Id</label>
                                        <Field className="form-control" type="text" name="sensorId" disabled/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Tipo</label>
                                        <Field className="form-control" type="text" name="sensor_tipo"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Coordenada</label>
                                        <Field className="form-control" type="text" name="sensor_coordenada"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Status</label>
                                        <Field className="form-control" type="text" name="sensor_status"/>
                                    </fieldset>
                                    <button className="btn btn-success" type="submit">Salvar</button>
                                </Form>
                            )
                        }
                    </Formik>
                </div>
            </div>
        )
    }
}

export default SensorComponent