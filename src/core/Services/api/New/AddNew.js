import http from '../../Interceptor'

const AddNew = async(CurrentImageAddress,googletitle,googleDescribe,Title,MiniDescribe,Describe,NewsCatregoryId) => {
    try{
        
        const formData = new FormData();
        formData.append('Image',CurrentImageAddress);
        formData.append('Title', Title);
        formData.append('GoogleTitle', googletitle);
        formData.append('GoogleDescribe',googleDescribe);
        formData.append('MiniDescribe', MiniDescribe);
        formData.append('Describe',Describe);
        formData.append('Keyword', Title);
        formData.append('NewsCatregoryId', Number(NewsCatregoryId));
        let response = await http.post(`/News/CreateNews`,formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }})
        return response

    }catch(er){
        console.log(er)
    }
}
export default AddNew
