import {createStore, combineReducers} from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comment';
import { Promotions } from './promotions';
import { Leaders } from './leaders';

export const ConfigureStore =()=>{
    const store = createStore(combineReducers({
        //how to combine reducers
        //mapping map reducers to their properties
        dishes : Dishes,
        comments : Comments,
        promotions : Promotions,
        leaders: Leaders

    }));
    return store;
};



