import http from '../../Interceptor'

export const ChangeStatusCourse = async (data) => {
   try{
    const response = await http.put(`/Course/UpdateCourseStatus`, data)
    return response

   } catch{
    return []
   }
}