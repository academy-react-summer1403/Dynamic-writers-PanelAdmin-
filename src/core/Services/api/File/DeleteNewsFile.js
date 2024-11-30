import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const DeleteNewsFile = async (id) => {
    try{
        const result = await http.delete(`/News/DeleteNewsFile?fileId=${id}`)
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