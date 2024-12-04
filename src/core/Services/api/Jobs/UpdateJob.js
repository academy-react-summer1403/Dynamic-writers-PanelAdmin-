import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const UpdateJob = async (data) => {
   try{
    const response = await http.post(`/SharePanel/UpdateJobHistory`, data)
    return response

   } catch(error){
      if(error.response.data){
         toast.error(error.response.data.ErrorMessage)
      }
      else{
         toast.error(' مشکلی پیش آمده است ')
     }
   }
}