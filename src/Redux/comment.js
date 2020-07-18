import { COMMENTS } from '../Shared/comments';
import * as ActionTypes from './ActionTypes';


//reducer function
export const Comments = (state = COMMENTS, action)=> {
 
    switch(action.type){
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.length;
            //ISO format
            comment.date = new Date().toISOString();

            //since we cannot directly change/mutate our state
            //concat() is an immutable operation/function which returns
            //a new object of COMMENTS in this case with the required changes
            //comment obj will be added to COMMENTS array
            //think of vector.push_back(comment) different is we return a new obj
            return state.concat(comment); 
            
        default:
            return state;   
    }
}

