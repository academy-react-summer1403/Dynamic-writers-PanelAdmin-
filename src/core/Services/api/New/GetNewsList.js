import http from '../../Interceptor'

export const GetNewsList = async (RowsOfPage,PageNumber,IsActive,Query) => {
   try{
    
    const response = await http.get(`/News/AdminNewsFilterList?PageNumber=${PageNumber}&RowsOfPage=${RowsOfPage}&Query=${Query}&IsActive=${IsActive}`)
    return response

   } catch{
    return []
   }
}