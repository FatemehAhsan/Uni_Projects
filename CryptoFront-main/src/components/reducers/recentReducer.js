import { ADD_RECENT, CUR_ITEM, CH_THM } from '../actions/action-types/recent-actions'

const initState = {
    items: [],
    curItemInd: -1,
    thm: -1 //0: light -1: black 
}

// Using filter method to create a remove method
function arrayRemove(arr, value) {
 
    return arr.filter(function(newArray){
        return newArray !== value;
    });
  
}

const recentReducer= (state = initState, action)=>{
    
    if(action.type === CUR_ITEM){
        let curItemIndx = action.id
        return{
            ...state,
            curItemInd: curItemIndx 
        }        
    }
    else if(action.type === CH_THM){
        return{
            ...state,
            thm: ~state.thm
        }        
    }
    //INSIDE HOME COMPONENT
    else if(action.type === ADD_RECENT){
        let newItems = arrayRemove(state.items, action.id);
        if(state.items.length < 3)
            newItems = [action.id, ...newItems]
        else
            newItems = [action.id, ...newItems.slice(0, 2)]                
        console.log(newItems)
        return{
            ...state,
            items: newItems
        }
    }
    else{
        return state
    }
    
}

export default recentReducer
