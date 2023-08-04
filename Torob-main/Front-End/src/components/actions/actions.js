import { CH_USERNAME } from './action-types/actions-types'

export const changeUsername = (username, token) => {
    return{
        type: CH_USERNAME,
        username,
        token
    }
}
