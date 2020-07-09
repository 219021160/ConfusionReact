/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

import HeaderComponent from './HeaderComponent';

import FooterComponent from './FooterComponent';

import HomeComponent from './HomeComponent';

import ContactComponent from './ContactComponent';

import MenuComponent from './MenuComponent';

import DishDetails from './DishDetailsComponent';


import { DISHES } from '../Shared/dishes';
import { COMMENTS } from '../Shared/comments';
import { LEADERS } from '../Shared/leaders';
import { PROMOTIONS } from '../Shared/promotions';

import {Switch, Route, Redirect} from 'react-router-dom';



export default class MainComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes:DISHES,
            comments:COMMENTS,
            promotions:PROMOTIONS,
            leaders:LEADERS
        }

    }

    render() {

        return (

            <div >

               {/* header */}
               <HeaderComponent />

               <Switch>
                    {/* eslint-disable-next-line array-callback-return */}
                    <Route path="/home" component={() => <HomeComponent dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                        leader={this.state.leaders.filter((leader) => leader.featured)[0]} />}/>

                   <Route exact path="/menu" component={() => <MenuComponent dishes={this.state.dishes} />} />

                   <Route exact path="/contactus" component={()=><ContactComponent/>}/>
                   
                   <Redirect to="/home" />
               </Switch>


                {/* <MenuComponent dishes={this.state.dishes} onClick={(selectedDishID)=>this.onDishSelect(selectedDishID)} /> */}
                {/* [0] tells filter to return only one item in this case 1 dish */}
                {/* filter will return a dish of matching id */}
                {/* eslint-disable-next-line array-callback-return */}
                <DishDetails selectedDish={this.state.dishes.filter((dish) => {if(dish.id===this.state.selectedDishID){return dish}})[0] }/>


                <FooterComponent />
            </div>


        );
    }
}
