import axios from 'axios'

const API_URL = 'http://localhost:8762/tcc-puc-client'; //'http://52.67.253.69:8080'

class InteressadoDataService {

    retrieveAllInteressado(areaId) {
        return axios.get(`${API_URL}/areas/${areaId}/interessados`, {headers: {authorization: sessionStorage.getItem("BasicAuth")}}
        );
    }

    retrieveInteressado(areaId, interessadosId) {
        return axios.get(`${API_URL}/areas/${areaId}/interessados/${interessadosId}`, {headers: {authorization: sessionStorage.getItem("BasicAuth")}});
    }

    deleteInteressado(areaId, interessadosId) {
        return axios.delete(`${API_URL}/areas/${areaId}/interessados/${interessadosId}`, {headers: {authorization: sessionStorage.getItem("BasicAuth")}});
    }

    createInteressado(areaId, interessado) {
        return axios.post(`${API_URL}/areas/${areaId}/interessados`, interessado, {headers: {authorization: sessionStorage.getItem("BasicAuth")}});
    }

    updateInteressado(areaId, interessadosId, interessado) {
        return axios.put(`${API_URL}/areas/${areaId}/interessados/${interessadosId}`, interessado, {headers: {authorization: sessionStorage.getItem("BasicAuth")}});
    }
}

export default new InteressadoDataService()
