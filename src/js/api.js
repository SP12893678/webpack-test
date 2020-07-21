import axios from 'axios'

const userRequest = axios.create({
    baseURL: '../php',
})

export const apiTest = (data) => userRequest.get('/test.php', { params: data })
