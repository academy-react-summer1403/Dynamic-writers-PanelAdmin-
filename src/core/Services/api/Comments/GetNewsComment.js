import http from '../../Interceptor'

export const GetNewsComment = async (id) => {
   try{
    const response = await http.get(`/News/GetAdminNewsComments?NewsId=${id}`)
    return response

   } catch{
    return []
   }
}