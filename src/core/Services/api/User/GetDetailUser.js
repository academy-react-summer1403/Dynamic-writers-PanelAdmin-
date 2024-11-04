import http from '../../Interceptor'

export const GetDetailUser = async (id) => {
   try{
    
    const response = await http.get(`/User/UserDetails/${id}`)
    return response

   } catch{
    return []
   }
}