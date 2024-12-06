import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const GetHomeWorkSession = async (id) => {
   try{
    const response = await http.get(`/Session/GetSessionHomeWork?SessionId=${id}`)
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