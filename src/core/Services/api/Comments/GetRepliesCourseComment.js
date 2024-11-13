import http from '../../Interceptor'

export const GetRepliesCommentCourse = async (courseId, commentId) => {
   try{
    const response = await http.get(`/Course/GetCourseReplyCommnets/${courseId}/${commentId}`)
    return response

   } catch{
    return []
   }
}