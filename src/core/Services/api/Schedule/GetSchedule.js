import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const GetSchedule = async (startDate, endDate) => {
   try{
    const response = await http.get(`/Schedual/GetAdminScheduals?startDate=${startDate}&endDate=${endDate}`)
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