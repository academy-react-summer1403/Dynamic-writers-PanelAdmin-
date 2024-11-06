import http from '../../Interceptor'

export const GetDetailCourse = async (id) => {
   try{
    
    const response = await http.get(`/Course/${id}`)
    return response

   } catch{
    return []
   }
}