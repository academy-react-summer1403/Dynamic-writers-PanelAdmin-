import { setItem } from "../common/storage"

export const PasswordLogin = (value) => {
    setItem('password', value)
}