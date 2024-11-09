import http from '../../Interceptor'

export const UpdateCourse = async (formData) => {
   try{
    console.log(formData)
    const response = await http.put(`/Course`, formData)
    return response

   } catch{
    return []
   }
}