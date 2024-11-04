import http from '../../Interceptor'

export const DeleteUser = async (roleId, id, status) => {
   try{
    
    const response = await http.post(`/User/AddUserAccess?Enable=${status}`, {
        roleId: roleId,
        userId: id
      })

    return response

   } catch{
    return []
   }
}