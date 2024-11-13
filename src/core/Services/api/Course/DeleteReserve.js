import http from '../../Interceptor'

export const DeleteReserve = async (id) => {
   try{
    console.log(id)
    const response = await http.delete(`/CourseReserve`, {
        data: {id: id}
    })
    return response

   } catch{
    return []
   }
}