/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

import HeaderComponent from './HeaderComponent';

import FooterComponent from './FooterComponent';

import HomeComponent from './HomeComponent';

import ContactComponent from './ContactComponent';

import MenuComponent from './MenuComponent';

import DishDetailsComponent from './DishDetailsComponent';

import AboutComponent from './AboutComponent';


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

        const DISHWITHID = ({match})=> {
            return (

                <DishDetailsComponent selectedDish={this.state.dishes.filter((dish)=> dish.id === parseInt(match.params.dishid,10) )[0]}
                    comments={this.state.comments.filter((comment) => comment.dishId === parseInt(match.params.dishid,10) )}
                />

            );
        }

        return (

            <div >

               {/* header */}
               <HeaderComponent />

               <Switch>
                    <Route path="/home" component={() => <HomeComponent dish={this.state.dishes.filter((dish) => dish.featured)[0]}
                        promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
                        leader={this.state.leaders.filter((leader) => leader.featured)[0]} />}/>

                   <Route exact path="/menu" component={() => <MenuComponent dishes={this.state.dishes} />} />

                   <Route path="/menu/:dishid" component={DISHWITHID} />
                   <Route exact path="/contactus" component={()=><ContactComponent/>}/>
                   <Route exact path ="/aboutus" component={()=> <AboutComponent leaders={this.state.leaders}/>} />
                   
                   <Redirect to="/home" />
               </Switch>

                <FooterComponent />
            </div>


        );
    }
}
