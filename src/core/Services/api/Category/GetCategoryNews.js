import http from '../../Interceptor'

export const GetCategoryNews = async () => {
   try{
    const response = await http.get('/News/GetListNewsCategory')
    return response

   } catch{
    return []
   }
}