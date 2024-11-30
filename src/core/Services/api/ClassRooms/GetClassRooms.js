import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const GetClassRooms = async () => {
    try{
        const result = await http.get(`/ClassRoom`)
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