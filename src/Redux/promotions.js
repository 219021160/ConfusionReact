import { PROMOTIONS } from '../Shared/promotions';
//reducer function
export const Promotions = (state = {
    isLoading: true,
    errMess: null,
    PROMOTIONS: []
}, action) =>
{
    switch (action.type) {
        
        case ActionTypes.ADD_PROMOS:
            return { ...state, isLoading: false, errMess: null, promotions: action.payload };

        case ActionTypes.PROMOS_LOADING:
            return { ...state, isLoading: true, errMess: null, promotions: [] }

        case ActionTypes.PROMOS_FAILED:
            return { ...state, isLoading: false, errMess: action.payload };
            
        default:
            return state;
    }
}