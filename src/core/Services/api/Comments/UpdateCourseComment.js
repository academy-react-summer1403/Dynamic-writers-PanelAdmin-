import http from '../../Interceptor'

export const UpdateCourseComment = async (data) => {
   try{
    const response = await http.put(`/Course/UpdateCourseComment`, data)
    return response

   } catch{
    return []
   }
}