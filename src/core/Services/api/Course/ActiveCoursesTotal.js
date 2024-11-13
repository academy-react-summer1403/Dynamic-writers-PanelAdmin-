import http from '../../Interceptor'

export const GetTotalActiveCourse = async () => {
   try{
    const response = await http.get(`/Home/GetCoursesWithPagination?PageNumber=1&RowsOfPage=10`)
    return response

   } catch{
    return []
   }
}