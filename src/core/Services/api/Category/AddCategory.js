import http from '../../Interceptor'

export const AddCategory = async (id,CategoryName,GoogleTitle,GoogleDescribe) => {
   try{
    const formData = new FormData();
    formData.append('Id', id)
    formData.append('CategoryName',CategoryName)
    formData.append('GoogleTitle',GoogleTitle)
    formData.append('GoogleDescribe',GoogleDescribe)
    formData.append('Image',null)
    formData.append('IconAddress',null)
    formData.append('IconName',null)

    console.log(formData)
    let response = await http.post('/News/CreateNewsCategory',formData ,{
        headers: {
          'Content-Type': 'multipart/form-data'
        }})
    return response
   } catch{
    return []
   }
}