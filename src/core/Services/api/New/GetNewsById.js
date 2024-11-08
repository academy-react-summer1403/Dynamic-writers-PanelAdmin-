import http from '../../Interceptor'

const GetNewsById = async(id) => {
    try{
        let response = await http.get(`/News/${id}`);
        return response

    }catch(er){
        console.log(er)
    }
}
export default GetNewsById
