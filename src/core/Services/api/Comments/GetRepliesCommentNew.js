import http from '../../Interceptor'

export const GetRepliesCommentNews = async (id) => {
   try{
    const response = await http.get(`/News/GetAdminRepliesComments?CommentId=${id}`)
    return response

   } catch{
    return []
   }
}