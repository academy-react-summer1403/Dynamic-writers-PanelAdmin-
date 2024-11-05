import http from '../../Interceptor'

export const GetCourseList = async (SortType, SortingCol, Query, PageNumber, RowsOfPage) => {
   try{
    
    const response = await http.get(`/Course/CourseList?PageNumber=${PageNumber}&RowsOfPage=${RowsOfPage}&SortingCol=${SortingCol}&SortType=${SortType}&Query=${Query}`)
    return response

   } catch{
    return []
   }
}