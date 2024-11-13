import http from '../../Interceptor'

export const GetProfileAdmin = async () => {
    try{
        const result = await http.get(`/SharePanel/GetProfileInfo`)
        return result
    }
    catch{
        return []
    }
}