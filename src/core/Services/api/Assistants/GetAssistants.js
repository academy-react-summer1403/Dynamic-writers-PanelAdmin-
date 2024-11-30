import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const GetAssistants = async () => {
   try{
    const response = await http.get(`/CourseAssistance`)
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