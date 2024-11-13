import http from '../../Interceptor'

const ActiveNews = async(id, Active) => {
    try{
        const formData = new FormData();
        formData.append('Active', Active)
        formData.append('Id',id)
        let response = await http.put('/News/ActiveDeactiveNews',formData)
        return response

    }catch(er){
        console.log(er)
    }
}
export default ActiveNews
