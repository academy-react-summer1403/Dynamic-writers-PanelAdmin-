import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const AddImageCoursePayments = async (data) => {
   try{
    const response = await http.post(`/CoursePayment/AddPeymentImage`, data)
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