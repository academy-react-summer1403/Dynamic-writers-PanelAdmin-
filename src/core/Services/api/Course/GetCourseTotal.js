import http from '../../Interceptor'

export const GetCourseTotal = async () => {
   try{
    
    const response = await http.get(`/Course/CourseList?PageNumber=1&RowsOfPage=10`)
    return response

   } catch{
    return []
   }
}