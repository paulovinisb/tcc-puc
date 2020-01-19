import React, {Component} from 'react';
import ListAreasComponent from './ListAreasComponent';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import LoginComponent from './LoginComponent';
import LogoutComponent from './LogoutComponent';
import MenuComponent from './MenuComponent';
import AuthenticatedRoute from './AuthenticatedRoute';
import PrincipalComponent from './PrincipalComponent';
import AreasComponent from './AreasComponent';
import UsuarioComponent from './UsuarioComponent';
import SetorComponent from './SetorComponent';
import ListInteressadoComponent from './ListInteressadoComponent';
import InteressadoComponent from './InteressadoComponent';
import ListSensorComponent from './ListSensorComponent';
import SensorComponent from './SensorComponent';
import ListLeituraComponent from "./ListLeituraComponent";
import CadastrarComponent from "./CadastrarComponent";

class GestaoApp extends Component {
    render() {
        return (
            <>
                <Router>
                    <>
                        <MenuComponent/>
                        <Switch>
                            <Route path="/" exact component={PrincipalComponent}/>
                            <Route path="/login" exact component={LoginComponent}/>
                            <Route path="/cadastrar" exact component={CadastrarComponent}/>
                            <Route path="/logout" exact component={LogoutComponent}/>
                            <AuthenticatedRoute path="/areas" exact component={ListAreasComponent}/>
                            <AuthenticatedRoute path="/areas/:areaId" component={AreasComponent} />
                            <AuthenticatedRoute path="/interessado/:areaId" exact component={ListInteressadoComponent}/>
                            <AuthenticatedRoute path="/interessado/:areaId/:interessadoId" component={InteressadoComponent} />
                            <AuthenticatedRoute path="/sensores/:areaId" exact component={ListSensorComponent}/>
                            <AuthenticatedRoute path="/sensores/:areaId/:sensorId" component={SensorComponent} />
                            <AuthenticatedRoute path="/leituras" exact component={ListLeituraComponent}/>
                            <AuthenticatedRoute path="/usuario" exact component={UsuarioComponent}/>
                            <AuthenticatedRoute path="/setor" exact component={SetorComponent}/>
                        </Switch>
                    </>
                </Router>
            </>
        )
    }
}

export default GestaoApp