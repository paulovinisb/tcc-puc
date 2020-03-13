import axios from 'axios'

const API_URL = 'http://localhost:8762/tcc-puc-client'; //'http://52.67.253.69:8080'

class AreasDataService {

    retrieveAllAreas() {
        return axios.get(`${API_URL}/areas`, {headers: {authorization: sessionStorage.getItem("BasicAuth")}}
        );
    }

    retrieveArea(id) {
        return axios.get(`${API_URL}/areas/${id}`, {headers: {authorization: sessionStorage.getItem("BasicAuth")}});
    }

    deleteAreas(id) {
        return axios.delete(`${API_URL}/areas/${id}`, {headers: {authorization: sessionStorage.getItem("BasicAuth")}});
    }

    createAreas(area) {
        return axios.post(`${API_URL}/areas`, area, {headers: {authorization: sessionStorage.getItem("BasicAuth")}});
    }

    updateAreas(id, area) {
        return axios.put(`${API_URL}/areas/${id}`, area, {headers: {authorization: sessionStorage.getItem("BasicAuth")}});
    }
}

export default new AreasDataService()
