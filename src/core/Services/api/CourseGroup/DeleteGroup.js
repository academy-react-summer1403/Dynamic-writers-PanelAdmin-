import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const DeleteGroup = async (id) => {
   try{
      console.log(id)
    const response = await http.delete(`/CourseGroup`, id)
    return response

   } catch(error){
      return []
   }
}