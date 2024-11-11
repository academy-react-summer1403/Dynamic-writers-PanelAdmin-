import http from '../../Interceptor'

export const AddReplyCourseComment = async (data) => {
   try{
    const response = await http.post(`/Course/AddReplyCourseComment`, data)
    return response

   } catch{
    return []
   }
}