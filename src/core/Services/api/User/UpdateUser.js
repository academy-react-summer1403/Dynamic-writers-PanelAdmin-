import http from '../../Interceptor'

export const DeleteUser = async () => {
   try{
    
    const response = await http.put()

    return response

   } catch{
    return []
   }
}