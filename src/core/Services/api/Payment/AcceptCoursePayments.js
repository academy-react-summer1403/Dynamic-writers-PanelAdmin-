import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const AcceptCoursePayments = async (id) => {
   try{
    const response = await http.put(`/CoursePayment/Accept`, id)
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