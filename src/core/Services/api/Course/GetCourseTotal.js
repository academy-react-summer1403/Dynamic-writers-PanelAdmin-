import http from '../../Interceptor'

export const GetCourseTotal = async () => {
   try{
    
    const response = await http.get(`/Course/CourseList?PageNumber=1&RowsOfPage=7`)
    return response

   } catch{
    return []
   }
}