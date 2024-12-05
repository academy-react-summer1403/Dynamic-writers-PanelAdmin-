import toast from 'react-hot-toast'
import { getItem } from '../common/storage'
import http from '../Interceptor'

export const LoginTwoStep = async (code) => {
    try{
        const auth = {
            phoneOrGmail: getItem('email'),
            password: getItem('password'),
            rememberMe: true
        }
        const result = await http.post(`/Sign/LoginTwoStep?VrifyCode=${code}`, auth)
        return result

    } catch(error){
        if(error.response.data.ErrorMessage){
           toast.error(error.response.data.ErrorMessage)
        }
    }
}