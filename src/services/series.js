import axios from 'axios';

const API_URL = 'http://localhost:3000/series';

class SeriesService {
    getSeries () {
      return axios.get(API_URL);
    }
    getSerie (id) {
      return axios.get(`${API_URL}/${id}`)
    }
    createSerie (data) {
      return axios.post(API_URL, data)
    }
    updateSerie (id, data) {
      return axios.put(`${API_URL}/${id}`, data)
    }
    deleteSerie (id) {
      return axios.delete(`${API_URL}/${id}`)
    }
}

export default new SeriesService();