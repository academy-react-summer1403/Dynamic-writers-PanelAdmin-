import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const AddRole = async (roleId, id, status) => {
   try{
    
    const response = await http.post(`/User/AddUserAccess?Enable=${status}`, {
        roleId: roleId,
        userId: id
      })

    return response

   } catch(error){
    if(error.response.data.ErrorMessage){
       toast.error(error.response.data.ErrorMessage + '  ' + error.response.data.StatusCode)
    }
    else{
       toast.error(' مشکلی پیش آمده است ')
   }
 }
}