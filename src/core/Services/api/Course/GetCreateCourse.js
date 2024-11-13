import http from '../../Interceptor'

export const GetCreateCourse = async () => {
   try{
    
    const response = await http.get(`/Course/GetCreate`)
    return response

   } catch{
    return []
   }
}