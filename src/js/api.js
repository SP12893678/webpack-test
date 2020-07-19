import axios from 'axios'

const userRequest = axios.create({
    baseURL: './src/php',
})

export const apiTest = (data) => userRequest.get('/test.php', { params: data })
