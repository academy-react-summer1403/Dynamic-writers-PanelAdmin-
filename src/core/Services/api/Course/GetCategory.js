import http from '../../Interceptor'

export const GetCategory = async () => {
   try{
    
    const response = await http.get(`/Home/GetTechnologies`)
    return response

   } catch{
    return []
   }
}