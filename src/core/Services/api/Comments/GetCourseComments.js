import http from '../../Interceptor'

export const GetCourseComments = async (SortType, SortingCol, Query, PageNumber, RowsOfPage, Accept, Teacher) => {
   try{
    const response = await http.get(`/Course/CommentManagment?SortingCol=${SortingCol}&SortType=${SortType}&TeacherId=${Teacher.value}&Accept=${Accept.value}&Query=${Query}&PageNumber=${PageNumber}&RowsOfPage=${RowsOfPage}`)
    return response

   } catch{
    return []
   }
}