import http from '../../Interceptor'
import toast from 'react-hot-toast'

export const AddUser = async (data) => {
    try{
        const response = await http.post(`/User/CreateUser`, data)
        return response
    }
    catch(error){
        if(error.response.data.ErrorMessage){
           toast.error(error.response.data.ErrorMessage)
        }
    }
}