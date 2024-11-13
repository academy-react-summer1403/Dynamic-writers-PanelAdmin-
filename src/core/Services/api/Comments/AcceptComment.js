import http from '../../Interceptor'

export const AcceptCourseComment = async (id) => {
   try{
    const response = await http.post(`/Course/AcceptCourseComment?CommentCourseId=${id}`)
    return response

   } catch{
    return []
   }
}