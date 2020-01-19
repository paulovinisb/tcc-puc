import React, {Component} from 'react'
import AuthenticationService from '../service/AuthenticationService';

class LoginComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            username: 'admin@admin.com',
            password: '',
            hasLoginFailed: false,
            showSuccessMessage: false
        }

        this.handleChange = this.handleChange.bind(this)
        this.loginClicked = this.loginClicked.bind(this)
    }

    handleChange(event) {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }

    loginClicked() {
        //admin,dummy
        // if(this.state.username==='admin' && this.state.password==='dummy'){
        //     AuthenticationService.registerSuccessfulLogin(this.state.username,this.state.password)
        //     this.props.history.push(`/courses`)
        //     //this.setState({showSuccessMessage:true})
        //     //this.setState({hasLoginFailed:false})
        // }
        // else {
        //     this.setState({showSuccessMessage:false})
        //     this.setState({hasLoginFailed:true})
        // }

        AuthenticationService
            .executeBasicAuthenticationService(this.state.username, this.state.password)
            .then(() => {
                AuthenticationService.registerSuccessfulLogin(this.state.username, this.state.password)
                this.props.history.push('/areas')
            }).catch(() => {
            this.setState({showSuccessMessage: false})
            this.setState({hasLoginFailed: true})
        })

        // AuthenticationService
        //     .executeJwtAuthenticationService(this.state.username, this.state.password)
        //     .then((response) => {
        //         AuthenticationService.registerSuccessfulLoginForJwt(this.state.username, response.data.token)
        //         this.props.history.push(`/courses`)
        //     }).catch(() => {
        //         this.setState({ showSuccessMessage: false })
        //         this.setState({ hasLoginFailed: true })
        //     })

    }

    render() {
        return (
            <div>
                <h1 style={{textAlign: "center"}}>Login</h1>
                <br/>
                <div className="container" style={{textAlign: "center"}}>
                    {/*<ShowInvalidCredentials hasLoginFailed={this.state.hasLoginFailed}/>*/}
                    {this.state.hasLoginFailed && <div className="alert alert-warning">Usuário ou Senha incorretos!</div>}
                    {this.state.showSuccessMessage && <div>Login Sucessful</div>}
                    {/*<ShowLoginSuccessMessage showSuccessMessage={this.state.showSuccessMessage}/>*/}
                    <div>
                        Usuário
                        <br/>
                        <input type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
                        <br/><br/>
                        Senha
                        <br/>
                        <input type="password" name="password" value={this.state.password}
                               onChange={this.handleChange}/>
                        <br/><br/>
                        <button className="btn btn-success" onClick={this.loginClicked}>Entrar</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default LoginComponent