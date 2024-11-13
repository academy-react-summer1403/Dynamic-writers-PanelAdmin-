import http from '../../Interceptor'

const GetCategoriesForNews = async(CurrentImageAddress,googletitle,googleDescribe,Active,Title,MiniDescribe,Describe,NewsCatregoryId,News) => {
    try{

        const formData = new FormData();
        formData.append('Id',News.detailsNewsDto.id);
        formData.append('Image',CurrentImageAddress);
        formData.append('Active', Active);
        formData.append('Title', Title);
        formData.append('GoogleTitle', googletitle);
        formData.append('GoogleDescribe',googleDescribe);
        formData.append('MiniDescribe', MiniDescribe);
        formData.append('Describe',Describe);
        formData.append('Keyword', Title);
        formData.append('IsSlider', News.detailsNewsDto.isSlider);
        formData.append('NewsCatregoryId', Number(NewsCatregoryId));
        let response = await http.put(`/News/UpdateNews`,formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }})
        return response

    }catch(er){
        console.log(er)
    }
}
export default GetCategoriesForNews
