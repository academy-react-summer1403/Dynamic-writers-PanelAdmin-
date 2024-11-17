import http from '../../Interceptor'

export const GetNewsFile = async (id) => {
    try{
        const result = await http.get(`/News/GetNewsFileList?NewsId=${id}`)
        return result
    }
    catch{
        return []
    }
}