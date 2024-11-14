import http from '../../Interceptor'

export const GetCourseUserList = async (id) => {
   try{
    
    const response = await http.get(`/CourseUser/GetCourseUserList?PageNumber=1&RowsOfPage=5&CourseId=${id}`)
    return response

   } catch{
    return []
   }
}