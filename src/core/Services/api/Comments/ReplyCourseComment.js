import http from '../../Interceptor'

export const ReplyCourseComment = async (data) => {
   try{
    const response = await http.post(`/Course/AddReplyCourseComment`, data)
    return response

   } catch{
    return []
   }
}