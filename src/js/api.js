import axios from 'axios'

const userRequest = axios.create({
    baseURL: '../php',
})

export const apiTest = (data) => userRequest.get('/test.php', { params: data })
export const apiManageEnviroment = (data) => userRequest.get('/enviroment.php', { params: data })
export const apiManageAudio = (data) => userRequest.get('/audio.php', { params: data })
