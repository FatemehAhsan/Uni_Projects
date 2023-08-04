import { ADD_RECENT, CUR_ITEM, CH_THM } from './action-types/recent-actions'

//add cart action
export const addRecent= (id)=>{
    return{
        type: ADD_RECENT,
        id
    }
}
export const curItem= (id)=>{
    return{
        type: CUR_ITEM,
        id
    }
}
export const chThm= (id)=>{
    return{
        type: CH_THM,
        id
    }
}
