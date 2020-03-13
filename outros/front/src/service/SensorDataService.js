import axios from 'axios'

const API_URL = 'http://localhost:8762/tcc-puc-client'; //'http://52.67.253.69:8080'

class SensorDataService {

    retrieveAllSensor(areaId) {
        return axios.get(`${API_URL}/areas/${areaId}/sensors`, {headers: {authorization: sessionStorage.getItem("BasicAuth")}}
        );
    }

    retrieveSensor(areaId, sensorId) {
        return axios.get(`${API_URL}/areas/${areaId}/sensors/${sensorId}`, {headers: {authorization: sessionStorage.getItem("BasicAuth")}});
    }

    deleteSensor(areaId, sensorId) {
        return axios.delete(`${API_URL}/areas/${areaId}/sensors/${sensorId}`, {headers: {authorization: sessionStorage.getItem("BasicAuth")}});
    }

    createSensor(areaId, sensor) {
        return axios.post(`${API_URL}/areas/${areaId}/sensors`, sensor, {headers: {authorization: sessionStorage.getItem("BasicAuth")}});
    }

    updateSensor(areaId, sensorId, sensor) {
        return axios.put(`${API_URL}/areas/${areaId}/sensors/${sensorId}`, sensor, {headers: {authorization: sessionStorage.getItem("BasicAuth")}});
    }
}

export default new SensorDataService()
