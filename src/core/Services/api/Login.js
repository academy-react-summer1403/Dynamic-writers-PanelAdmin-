import { getItem } from '../common/storage'
import http from '../Interceptor'

export const PostLogin = async () => {
    try{
        const auth = {
            phoneOrGmail: getItem('email'),
            password: getItem('password'),
            rememberMe: true
        }
        const result = await http.post(`/Sign/Login`, auth)
        return result

    } catch(err){
        return []
    }
}