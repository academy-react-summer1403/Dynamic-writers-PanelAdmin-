import { getItem } from '../common/storage'
import http from '../Interceptor'

export const PostLogin = async () => {
    const auth = {
        phoneOrGmail: getItem('email'),
        password: getItem('password'),
        rememberMe: false
    }
    console.log(auth)
    const result = await http.post(`/Sign/Login`, auth)
    return result
}