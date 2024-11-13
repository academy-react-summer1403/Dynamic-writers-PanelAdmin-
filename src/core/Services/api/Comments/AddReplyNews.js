import http from '../../Interceptor'

export const AddReplyNewsComment = async (data) => {
   try{
    const response = await http.post(`/News/CreateNewsReplyComment`, data)
    return response

   } catch{
    return []
   }
}