import toast from 'react-hot-toast'
import http from '../../Interceptor'

export const UpdateBuilding = async (id,title,time,floor,lat,long,status) => {
    try{
        const result = await http.put(`/Building`, 
        {
            "id":id,
            "buildingName":title,
            "workDate":time,
            "floor":floor,
            "latitude":lat,
            "longitude":long,
            "active":status
        }
        )
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