import http from '../../Interceptor'

export const GetTotalCount = async () => {
    try{
        const response = await http.get(`/User/UserMannage?PageNumber=1&RowsOfPage=10`)
        return response
    }
    catch(err){
        return []
    }
}