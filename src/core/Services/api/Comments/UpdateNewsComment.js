import http from '../../Interceptor'

export const UpdateNewsComment = async (data) => {
   try{
    const response = await http.put(`/News/UpdateNewsComment`, data)
    return response

   } catch{
    return []
   }
}