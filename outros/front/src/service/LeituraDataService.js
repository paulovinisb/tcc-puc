import axios from 'axios'

const API_URL = 'http://localhost:8762/tcc-puc-client'; //'http://52.67.253.69:8080'

class LeituraDataService {

    retrieveAllLeitura() {
        return axios.get(`${API_URL}/leituras`, {headers: {authorization: sessionStorage.getItem("BasicAuth")}}
        );
    }
}

export default new LeituraDataService()