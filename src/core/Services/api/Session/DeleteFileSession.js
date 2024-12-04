import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const DeleteFileSession = async (data) => {
   try{
    const response = await http.delete(`/Session/DeleteSessionFile`, data)
    return response

   } catch(error){
      if(error.response.data.ErrorMessage){
         toast.error(error.response.data.ErrorMessage)
      }
      else{
         toast.error(' مشکلی پیش آمده است ')
     }
   }
}