import axios from "axios";

// Base da URL: https://api.themoviedb.org/3/
// URL da APi:  https://api.themoviedb.org/3/movie/550?api_key=057bb6ccbcb145d33c949936a2a625c0

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;

