import http from '../../Interceptor'

export const DeleteCourseComment = async (id) => {
   try{
    const response = await http.delete(`/Course/DeleteCourseComment?CourseCommandId=${id}`)
    return response

   } catch{
    return []
   }
}