import http from '../../Interceptor'

export const GetTopNews = async () => {
   try{
    
    const response = await http.get(`/News/AdminNewsFilterList?PageNumber=1&RowsOfPage=4&SortType=DESC`)
    return response

   } catch{
    return []
   }
}