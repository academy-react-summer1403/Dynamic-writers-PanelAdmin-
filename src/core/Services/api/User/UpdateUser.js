import http from '../../Interceptor'

export const UpdateUser = async (data) => {
   try{
    
    const response = await http.put(`/User/UpdateUser`, data)

    return response

   } catch(err){
    return err.message
   }
}