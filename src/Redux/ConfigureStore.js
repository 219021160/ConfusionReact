import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Dishes } from './dishes';
import { Comments } from './comment';
import { Promotions } from './promotions';
import { Leaders } from './leaders';

import {createForms} from 'react-redux-form';
import { InitialFeedback } from './forms';

import thunk from 'redux-thunk';
import logger from 'redux-logger';


export const ConfigureStore =()=>{

    const store = createStore(combineReducers({
        //how to combine reducers
        //mapping map reducers to their properties
        dishes : Dishes,
        comments : Comments,
        promotions : Promotions,
        leaders: Leaders,
        ...createForms({
            feedback: InitialFeedback
        })
        

    }), applyMiddleware(thunk, logger));

    return store;

};



