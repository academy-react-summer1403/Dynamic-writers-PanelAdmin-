import http from '../../Interceptor'

const GetCategoriesForNews = async() => {
    try{
        let response = await http.get(`/News/GetListNewsCategory`);
        return response

    }catch(er){
        console.log(er)
    }
}
export default GetCategoriesForNews
