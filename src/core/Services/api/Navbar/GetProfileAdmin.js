import http from '../../Interceptor'

export const GetProfileAdmin = async () => {
    const result = await http.get(`/SharePanel/GetProfileInfo`)
    return result
}