import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const SendToIndex = async (id, show) => {
   try{
    const response = await http.post(`/SharePanel/HistoryToIndex?JobId=${id}&show=${show}`)
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