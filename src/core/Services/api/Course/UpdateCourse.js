import http from '../../Interceptor'

export const UpdateCourse = async (formData) => {
   try{
    console.log(formData)
    const response = await http.put(`/Course`, formData)
    return response

   } catch(error){
      if(error.response.data.ErrorMessage){
         toast.error(error.response.data.ErrorMessage)
      }
      else{
         toast.error(' مشکلی پیش آمده است ')
     }
   }
}