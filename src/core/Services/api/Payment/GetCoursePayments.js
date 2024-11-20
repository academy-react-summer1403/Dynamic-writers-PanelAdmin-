import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const GetCoursePayments = async (id) => {
   try{
    const response = await http.get(`/CoursePayment?CourseId=${id}`)
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