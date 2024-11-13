import { useMutation, useQueryClient } from '@tanstack/react-query'
import http from '../../Interceptor'

export const AddUser = async (data) => {
    // const client = useQueryClient()
    // const {mutate} = useMutation({
    //     mutationFn: async (data) => {
    //         const response = await http.post(`/User/CreateUser`, data)
    //         return response
    //     } 
    // })

    // return {mutate}
    try{
        const response = await http.post(`/User/CreateUser`, data)
        return response
    }
    catch(err){
        return []
    }
}