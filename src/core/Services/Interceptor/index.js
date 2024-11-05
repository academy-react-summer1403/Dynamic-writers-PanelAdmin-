import axios from "axios";
import {getItem, removeItem } from "../common/storage";

const baseURL = import.meta.env.VITE_BASE_URL

const instance = axios.create({
   baseURL: baseURL
})

const onSuccess = (response) => {
   return response.data;
}


const onError = (err) => {
   console.log(err)

   // if(err.response) {
   //    const status = err.response.status

   //    if(status === 401) {
   //       removeItem('token')
   //       window.location.pathname = '/Error401'
   //    }
      
   //    if(status === 403) {
   //       window.location.pathname = '/Error403'
   //    }
      
   //    if(status === 408) {
   //       window.location.pathname = '/Error408'
   //    }
      
   //    if(status === 500) {
   //       window.location.pathname = '/Error500'
   //    }
   //    if(status == 422){
   //       return err.response.data.ErrorMessage
   //    }
   // }

   // return Promise.reject(err);
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
   return opt
})

export default instance;