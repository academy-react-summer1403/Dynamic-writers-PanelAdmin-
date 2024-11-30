import http from '../../Interceptor'
import toast from 'react-hot-toast'

export const GetWorkAssistants = async () => {
    try{
        const response = await http.get(`/AssistanceWork`)
        return response
    }
    catch(error){
        if(error.response.data.ErrorMessage){
           toast.error(error.response.data.ErrorMessage)
        }
    }
}