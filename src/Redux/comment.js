import { COMMENTS } from '../Shared/comments';
import * as ActionTypes from './ActionTypes';


//reducer function
export const Comments = (state = { errMess: null, COMMENTS: [] } , action) => 
{
 
    switch(action.type){
        case ActionTypes.ADD_COMMENT:
            var comment = action.payload;
            comment.id = state.comments.length;
            //ISO format
            comment.date = new Date().toISOString();

            //since we cannot directly change/mutate our state
            //concat() is an immutable operation/function which returns
            //a new object of COMMENTS in this case with the required changes
            //comment obj will be added to COMMENTS array
            //think of vector.push_back(comment) different is we return a new obj
            return state.concat(comment); 
            
        case ActionTypes.ADD_COMMENTS:
            return { ...state, errMess: null, comments: action.payload };

        case ActionTypes.COMMENTS_FAILED:
            return { ...state, errMess: action.payload };
            
        default:
            return state;   
    }
}

