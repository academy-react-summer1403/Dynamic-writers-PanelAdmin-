import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const UpdateSchedule = async (data, id) => {
   try{
    const response = await http.put(`/Schedual/UpdateSchedualSingle?currentCurseId=${id}`, data)
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