import React, {Component} from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import InteressadoDataService from '../service/InteressadoDataService';

class CadastrarComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            areaId: '',
            interessadoId: '',
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
    }

    onSubmit(values) {
        let interessado = {
            interessadoId: -1,
            interessado_nome: values.interessado_nome,
            interessado_celular: values.interessado_celular,
            interessado_email: values.interessado_email,
            interessado_endereco: values.interessado_endereco
        }

        InteressadoDataService.createInteressado(values.areaId, interessado)
            .then(() => {
                window.alert("Cadastro realizado com sucesso!");
            }).then(() => this.props.history.push(`/`))
    }

    validate(values) {
        let errors = {}
        if (!values.areaId) {
            errors.erro = 'Selecione uma área'
        }
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
                <h1 style={{textAlign: "center"}}>Cadastrar Interessado</h1>
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
                                        <label>Área</label>
                                        <Field
                                            className="form-control"
                                            name="areaId"
                                            component="select">
                                            <option value="1">Área 1</option>
                                            <option value="2">Área 2</option>
                                        </Field>
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

export default CadastrarComponent