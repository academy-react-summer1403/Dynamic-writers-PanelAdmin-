import http from '../../Interceptor'

export const AddNewsFile = async (data) => {
    try{
        const result = await http.post(`/News/CreateNewsFile`, data)
        return result
    }
    catch(error){
        if(error.response.data.ErrorMessage){
           toast.error(error.response.data.ErrorMessage)
        }
        else{
           toast.error(' مشکلی پیش آمده است ')
       }
     }
}