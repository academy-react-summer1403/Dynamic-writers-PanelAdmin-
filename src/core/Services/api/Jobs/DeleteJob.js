import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const DeleteJob = async (id) => {
   try{
    const response = await http.delete(`/SharePanel/DeleteJobHistory?HistoryId=${id}`)
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