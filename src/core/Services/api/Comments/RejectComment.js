import http from '../../Interceptor'

export const RejectCourseComment = async (id) => {
   try{
    const response = await http.post(`/Course/RejectCourseComment?CommentCourseId=${id}`)
    return response

   } catch{
    return []
   }
}