import http from '../../Interceptor'

export const EditGroup = async (data) => {
   try{
    const response = await http.put(`/CourseGroup`, data)
    return response

   } catch{
    return []
   }
}