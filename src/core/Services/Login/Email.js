import { setItem } from "../common/storage"

export const EmailLogin = (value) => {
    setItem('email', value)
}