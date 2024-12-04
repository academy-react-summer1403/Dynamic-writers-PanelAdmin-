import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const AddBuilding = async (id,title,time,floor,lat,long) => {
    try{
        const result = await http.post(`/Building`, {
            "id":id,
            "buildingName":title,
            "workDate":time,
            "floor":floor,
            "latitude":lat,
            "longitude":long

        })
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