import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const GetBuildings = async () => {
    try{
        const result = await http.get(`/Building`)
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