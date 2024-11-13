import { getItem } from '../../common/storage'
import http from '../../Interceptor'

export const CreateCourse = async (data) => {
   try{
    console.log(data)

    const response = await http.post(`/Course`, data)
    return response

   } catch(err){
    return [err.ErrorMessage]
   }
}