import { LEADERS } from '../Shared/leaders';

//reducer function
export const Leaders = (state = LEADERS, action)=>{
    switch(action.type){
        default:
            return state;
    }
}