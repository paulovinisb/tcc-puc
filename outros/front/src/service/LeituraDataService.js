import axios from 'axios'

const API_URL = 'http://localhost:8080'

class LeituraDataService {

    retrieveAllLeitura() {
        return axios.get(`${API_URL}/leituras`, {headers: {authorization: sessionStorage.getItem("BasicAuth")}}
        );
    }
}

export default new LeituraDataService()