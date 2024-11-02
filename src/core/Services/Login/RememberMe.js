import { setItem } from "../common/storage"

export const RememberMe = (value) => {
    setItem('rememberMe', value)
    console.log(value)
}