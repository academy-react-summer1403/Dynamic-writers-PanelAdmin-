import http from '../../Interceptor'

export const GetTotalActiveNews = async () => {
   try{
    
    const response = await http.get(`/News/AdminNewsFilterList?PageNumber=1&RowsOfPage=5&IsActive=false`)
    return response

   } catch{
    return []
   }
}