 import axios from 'axios';

 export const api = axios.create({
    baseURL: '/api'
 })

 //cada service é uma intergração com um serviço