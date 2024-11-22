import axios from "axios";
import {getItem, removeItem } from "../common/storage";
import toast from "react-hot-toast";

const baseURL = import.meta.env.VITE_BASE_URL

const instance = axios.create({
   baseURL: baseURL
})

const onSuccess = (response) => {
   toast.dismiss('loading');
   return response.data;
}


const onError = (err) => {
   toast.dismiss('loading');
   console.log(err)

   if(err.response) {
      const status = err.response.status

      // if(status === 401) {
      //    removeItem('token')
      //    window.location.pathname = '/Error401'
      // }
      
      // if(status === 403) {
      //    window.location.pathname = '/Error403'
      // }
      
      // if(status === 408) {
      //    window.location.pathname = '/Error408'
      // }
      
      // if(status === 500) {
         // window.location.pathname = '/Error500'
         // alert('Error 500: Network Server Internet')
      // }
      // if(status == 422){
      //    return err.response.data.ErrorMessage
      // }
   }
   // else{
   //    removeItem('token')
   //    window.location.pathname = '/login'
   // }

   return Promise.reject(err);
}

instance.interceptors.response.use(onSuccess, onError)
instance.interceptors.request.use((opt) => {
   const token = getItem('token')
   if(token === 'undefined') {
      removeItem('token')
   }
   if(token === null){
      removeItem('token')
   }

   if (token) opt.headers.Authorization = 'Bearer ' + token;

   toast.dismiss('loading')
   toast.loading('در حال باگزاری...', {id: 'loading'});
   return opt
})

export default instance;