import http from '../../Interceptor'

export const GetNewsList = async (SortType,RowsOfPage,PageNumber,IsActive,querySearch) => {
   try{
    
    const response = await http.get(`/News/AdminNewsFilterList?PageNumber=${PageNumber}&RowsOfPage=${RowsOfPage}&SortType=${SortType}&IsActive=${IsActive}&Query=${querySearch}`)
    console.log(response)
    return response

   } catch{
    return []
   }
}