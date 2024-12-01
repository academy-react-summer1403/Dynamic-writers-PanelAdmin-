import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const UpdateDepartment = async (data) => {
    try{
        const result = await http.put(`/Department`, data)
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