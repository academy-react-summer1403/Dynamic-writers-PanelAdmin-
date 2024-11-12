import http from '../../Interceptor'

const ActiveNews = async(id) => {
    try{
        const formData = new FormData();
        formData.append('Active',true)
        formData.append('Id',id)
        let response = await http.put('/News/ActiveDeactiveNews',formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }})
        return response

    }catch(er){
        console.log(er)
    }
}
export default ActiveNews
