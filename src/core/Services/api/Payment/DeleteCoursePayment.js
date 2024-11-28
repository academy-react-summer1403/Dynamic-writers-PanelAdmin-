import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const DeleteCoursePayments = async (id) => {
   try{
     const data = new FormData()
     data.append('PaymentId', id)
     const response = await http.delete(`/CoursePayment`, data)
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