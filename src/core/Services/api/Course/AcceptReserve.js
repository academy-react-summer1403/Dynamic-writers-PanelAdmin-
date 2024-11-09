import http from '../../Interceptor'

export const AcceptReserve = async (courseId, studentId) => {
   try{
    const response = await http.post(`/CourseReserve/SendReserveToCourse`, {
        courseId: courseId,
        courseGroupId: "1",
        studentId: studentId
      })
    return response

   } catch{
    return []
   }
}