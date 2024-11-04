import http from '../../Interceptor'

export const GetTotalCount = async () => {
    const response = await http.get(`/User/UserMannage?PageNumber=1&RowsOfPage=10`)
    return response
}