import { removeItem } from '../../common/storage'
import http from '../../Interceptor'

export const GetTotalCount = async () => {
    try{
        const response = await http.get(`/User/UserMannage?PageNumber=1&RowsOfPage=7`)
        return response
    }
    catch(error){
        return []
     }
}