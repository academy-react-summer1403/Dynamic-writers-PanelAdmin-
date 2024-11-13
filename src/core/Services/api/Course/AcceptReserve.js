import http from '../../Interceptor'

export const AcceptReserve = async (courseId, studentId, groupId) => {
   try{
    console.log(courseId, studentId, groupId)
    const response = await http.post(`/CourseReserve/SendReserveToCourse`, {
        courseId: courseId,
        courseGroupId: groupId,
        studentId: studentId
      })
    return response

   } catch{
    return []
   }
}