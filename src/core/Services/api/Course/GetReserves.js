import http from '../../Interceptor'

export const GetReserves = async () => {
   try{

    const response = await http.get(`/CourseReserve`)
    return response

   } catch{
    return []
   }
}