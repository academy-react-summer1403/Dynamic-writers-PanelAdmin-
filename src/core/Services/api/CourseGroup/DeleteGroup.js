import http from '../../Interceptor'

export const DeleteGroup = async (id) => {
   try{
    const response = await http.delete(`/CourseGroup`, id)
    return response

   } catch{
    return []
   }
}