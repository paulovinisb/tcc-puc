import React, {Component} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import AreasDataService from '../service/AreasDataService';

class AreaComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            areaId: this.props.match.params.areaId,
            area_nome: '',
            area_coordenadas: '',
            area_tipo: '',
            erro: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        // eslint-disable-next-line
        if (this.state.areaId == -1) {
            return
        }
        AreasDataService.retrieveArea(this.state.areaId)
            .then(response => this.setState({
                area_nome: response.data.area_nome,
                area_coordenadas: response.data.area_coordenadas,
                area_tipo: response.data.area_tipo
            }))
    }

    onSubmit(values) {
        let area = {
            areaId: this.state.areaId,
            area_nome: values.area_nome,
            area_coordenadas: values.area_coordenadas,
            area_tipo: values.area_tipo
        }

        // eslint-disable-next-line
        if (this.state.areaId == -1) {
            AreasDataService.createAreas(area)
                .then(() => this.props.history.push('/areas'))
        } else {
            AreasDataService.updateAreas(this.state.areaId, area)
                .then(() => this.props.history.push('/areas'))
        }
    }

    validate(values) {
        let errors = {}
        if (!values.area_nome) {
            errors.erro = 'Digite um nome'
        }
        if (!values.area_coordenadas) {
            errors.erro = 'Digite uma coordenadas'
        }
        if (!values.area_tipo) {
            errors.erro = 'Digite um tipo'
        }
        return errors
    }

    render() {
        return (
            <div>
                <br/>
                <h1 style={{textAlign: "center"}}>Area</h1>
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
                                        <Field className="form-control" type="text" name="areaId" disabled/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Nome</label>
                                        <Field className="form-control" type="text" name="area_nome"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Coordenadas</label>
                                        <Field className="form-control" type="text" name="area_coordenadas"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Tipo</label>
                                        <Field className="form-control" type="text" name="area_tipo"/>
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

export default AreaComponent