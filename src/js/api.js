import axios from 'axios'

const userRequest = axios.create({
    baseURL: '../php',
})

export const apiTest = (data) => userRequest.get('/test.php', { params: data })
export const apiManageEnviroment = (data) => userRequest.get('/enviroment.php', { params: data })
export const apiManageObject = (data) => userRequest.get('/object.php', { params: data })
export const apiManageAudio = (data) => userRequest.get('/audio.php', { params: data })
export const apiManageExcel = (file, data) => userRequest.post('/excel.php', file, { params: data })
export const apiGetFolderFileList = (data) => userRequest.get('/dir.php', { params: data })
