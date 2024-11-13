import http from '../../Interceptor'

export const GetTotalNews = async () => {
   try{
    
    const response = await http.get(`/News/AdminNewsFilterList?PageNumber=1&RowsOfPage=5`)
    return response

   } catch{
    return []
   }
}