import http from '../../Interceptor'

export const AddGroup = async (data) => {
   try{
    const response = await http.post(`/CourseGroup`, data)
    return response

   } catch{
    return []
   }
}