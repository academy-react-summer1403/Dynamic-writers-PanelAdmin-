import { getItem } from '../common/storage'
import http from '../Interceptor'

export const PostLogin = () => {
    const result = http.post(`/Sign/Login`, {
        phoneOrGmail: getItem('email'),
        password: getItem('password'),
        rememberMe: getItem('rememberMe')
    })
}