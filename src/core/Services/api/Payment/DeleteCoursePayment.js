import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const DeleteCoursePayments = async (id) => {
   try{
    const response = await http.delete(`/CoursePayment`, id)
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