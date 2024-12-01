import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const GetDepartment = async () => {
    try{
        const result = await http.get(`/Department`)
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