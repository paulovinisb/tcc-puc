import React, {Component} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import InteressadoDataService from '../service/InteressadoDataService';

class InteressadoComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            areaId: this.props.match.params.areaId,
            interessadoId: this.props.match.params.interessadoId,
            interessado_nome: '',
            interessado_celular: '',
            interessado_email: '',
            interessado_endereco: '',
            erro: ''
        }
        this.onSubmit = this.onSubmit.bind(this)
        this.validate = this.validate.bind(this)
    }

    componentDidMount() {
        // eslint-disable-next-line
        if (this.state.interessadoId == -1) {
            return
        }
        InteressadoDataService.retrieveInteressado(this.state.areaId, this.state.interessadoId)
            .then(response => this.setState({
                interessado_nome: response.data.interessado_nome,
                interessado_celular: response.data.interessado_celular,
                interessado_email: response.data.interessado_email,
                interessado_endereco: response.data.interessado_endereco
            }))
    }

    onSubmit(values) {
        let interessado = {
            interessadoId: this.state.interessadoId,
            interessado_nome: values.interessado_nome,
            interessado_celular: values.interessado_celular,
            interessado_email: values.interessado_email,
            interessado_endereco: values.interessado_endereco
        }

        // eslint-disable-next-line
        if (this.state.interessadoId == -1) {
            InteressadoDataService.createInteressado(this.state.areaId, interessado)
                .then(() => this.props.history.push(`/interessado/${this.state.areaId}`))
        } else {
            InteressadoDataService.updateInteressado(this.state.areaId, this.state.interessadoId, interessado)
                .then(() => this.props.history.push(`/interessado/${this.state.areaId}`))
        }
    }

    validate(values) {
        let errors = {}
        if (!values.interessado_nome) {
            errors.erro = 'Digite um nome'
        }
        if (!values.interessado_celular) {
            errors.erro = 'Digite um celular'
        }
        if (!values.interessado_email) {
            errors.erro = 'Digite um email'
        }
        if (!values.interessado_endereco) {
            errors.erro = 'Digite um endereço'
        }
        return errors
    }

    render() {
        return (
            <div>
                <br/>
                <h1 style={{textAlign: "center"}}>Interessado</h1>
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
                                        <Field className="form-control" type="text" name="interessadoId" disabled/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Nome</label>
                                        <Field className="form-control" type="text" name="interessado_nome"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Celular</label>
                                        <Field className="form-control" type="text" name="interessado_celular"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Email</label>
                                        <Field className="form-control" type="text" name="interessado_email"/>
                                    </fieldset>
                                    <fieldset className="form-group">
                                        <label>Endereço</label>
                                        <Field className="form-control" type="text" name="interessado_endereco"/>
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

export default InteressadoComponent