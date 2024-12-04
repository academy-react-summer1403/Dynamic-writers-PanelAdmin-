import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const AddFileSession = async (SessionId, Url, FileName, FileFormat) => {
   try{
    const response = await http.post(`/Session/AddSessionFileWithUrl?SessionId=${SessionId}&Url=${Url}&FileName=${FileName}&FileFormat=${FileFormat}`)
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