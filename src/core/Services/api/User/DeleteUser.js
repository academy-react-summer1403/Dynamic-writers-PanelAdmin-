import http from '../../Interceptor'

export const DeleteUser = async (id) => {
   try{
    
    console.log(id)
    const response = await http.delete(`/User/DeleteUser`, {
        userId: id
      })

    return response

   } catch{
    return []
   }
}