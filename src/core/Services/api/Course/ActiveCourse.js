import http from '../../Interceptor'

export const ActiveCourse = async (data) => {
   try{
    const response = await http.put(`/Course/ActiveAndDeactiveCourse`, data)
    return response

   } catch{
    return []
   }
}