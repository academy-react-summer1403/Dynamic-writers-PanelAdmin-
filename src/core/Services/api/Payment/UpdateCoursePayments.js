import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const UpdateCoursePayments = async (data) => {
   try{
    const response = await http.put(`/CoursePayment`, data)
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