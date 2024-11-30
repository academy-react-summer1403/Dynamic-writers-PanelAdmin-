import http from '../../Interceptor'
import toast from 'react-hot-toast'

export const GetDetailWorkAssistant = async (id) => {
    try{
        const response = await http.get(`/AssistanceWork/${id}`)
        return response
    }
    catch(error){
        if(error.response.data.ErrorMessage){
           toast.error(error.response.data.ErrorMessage)
        }
    }
}