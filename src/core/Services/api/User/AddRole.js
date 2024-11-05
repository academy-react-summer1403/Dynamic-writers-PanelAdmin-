import http from '../../Interceptor'

export const AddRole = async (roleId, id, status) => {
   try{
    
    const response = await http.post(`/User/AddUserAccess?Enable=${status}`, {
        roleId: roleId,
        userId: id
      })

    return response

   } catch(err){
    console.log(err)
    return []
   }
}