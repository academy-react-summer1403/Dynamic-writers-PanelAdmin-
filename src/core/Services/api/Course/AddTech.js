import http from '../../Interceptor'

export const AddTech = async (id, techId) => {
   try{
    console.log(techId)
    const response = await http.post(`/Course/AddCourseTechnology?courseId=${id}`,   
        [{
        techId: techId
      }])
    return response

   } catch{
    return []
   }
}