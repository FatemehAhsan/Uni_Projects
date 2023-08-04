import { CH_USERNAME } from '../actions/action-types/actions-types'

const initState = {
    username: null,
    token: null,
    items: []
}

const Reducer = (state = initState, action) => {
    if(action.type === CH_USERNAME){
        return{
            ...state,
            username: action.username,
            token: action.token
        }        
    }
    else{
        return state
    }
}

export default Reducer
