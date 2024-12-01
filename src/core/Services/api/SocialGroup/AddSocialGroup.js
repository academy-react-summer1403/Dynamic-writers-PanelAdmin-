import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const AddSocialGroup = async (data) => {
    try{
        const result = await http.post(`/CourseSocialGroup`, data)
        return result
    }
    catch(error){
        if(error.response.data.ErrorMessage){
           toast.error(error.response.data.ErrorMessage)
        }
        else{
           toast.error(' مشکلی پیش آمده است ')
       }
     }
}