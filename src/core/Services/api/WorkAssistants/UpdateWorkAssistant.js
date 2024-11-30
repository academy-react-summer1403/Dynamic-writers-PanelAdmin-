import http from '../../Interceptor'
import toast from 'react-hot-toast'

export const UpdateWorkAssistant = async (data) => {
    try{
        const response = await http.put(`/AssistanceWork`, data)
        return response
    }
    catch(error){
        if(error.response.data.ErrorMessage){
           toast.error(error.response.data.ErrorMessage)
        }
    }
}