import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const GetGroupCourse = async (teacherId, courseId) => {
   try{
    const response = await http.get(`/CourseGroup/GetCourseGroup?TeacherId=${teacherId}&CourseId=${courseId}`)
    return response

   } catch(error){
      if(error.response.data.ErrorMessage){
         toast.error(error.response.data.ErrorMessage)
      }
   }

}