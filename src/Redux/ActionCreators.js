
import * as ActionTypes from './ActionTypes';

import { DISHES } from '../Shared/dishes';

export const addComment = (dishId, rating, author, comment)=>({
    type : ActionTypes.ADD_COMMENT,
    //carries information to reducer function
    payload: {
        dishId : dishId,
        rating : rating,
        author : author,
        comment : comment
    }
});

//ASYNC ACTION CREATORS through thunk
export const fetchDishes = () => (dispatch) => {

    dispatch(dishesLoading(true));

    setTimeout(() => {
        dispatch(addDishes(DISHES));
    }, 2000);
}

export const dishesLoading = () => ({
    type: ActionTypes.DISHES_LOADING
});

export const dishesFailed = (errmess) => ({
    type: ActionTypes.DISHES_FAILED,
    payload: errmess
});

export const addDishes = (dishes) => ({
    type: ActionTypes.ADD_DISHES,
    payload: dishes
});













