import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import { getToken } from './token'
// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 5000 // request timeout
})

service.interceptors.request.use(config => {
    const token = store.getters.token || getToken()
    if (token) {
        config.headers['token'] = token
    }
    config.headers['client-id'] = store.getters.client_id
    config.headers['client-version'] = store.getters.client_version
    config.headers['Content-Type'] = 'application/json'

    return config
},
    error => {
        Message({
            message: error.message,
            type: 'error',
            duration: 5000
        })
        return Promise.reject(error)
    })

export default service
