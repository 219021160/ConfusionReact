/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

import HeaderComponent from './HeaderComponent';

import FooterComponent from './FooterComponent';

import HomeComponent from './HomeComponent';

import ContactComponent from './ContactComponent';

import MenuComponent from './MenuComponent';

import DishDetailsComponent from './DishDetailsComponent';

import AboutComponent from './AboutComponent';

import {connect} from 'react-redux';


import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

//map state properties to props in component
const mapStateToProps = state => {

    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    };

}


class MainComponent extends Component {


    render() {

        const DISHWITHID = ({match})=> {
            return (

                <DishDetailsComponent selectedDish={this.props.dishes.filter((dish)=> dish.id === parseInt(match.params.dishid,10) )[0]}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishid,10) )}
                />

            );
        }

        return (

            <div >

               {/* header */}
               <HeaderComponent />

               <Switch>
                    <Route path="/home" component={() => <HomeComponent dish={this.props.dishes.filter((dish) => dish.featured)[0]}
                        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                        leader={this.props.leaders.filter((leader) => leader.featured)[0]} />}/>

                   <Route exact path="/menu" component={() => <MenuComponent dishes={this.props.dishes} />} />

                   <Route path="/menu/:dishid" component={DISHWITHID} />
                   <Route exact path="/contactus" component={()=><ContactComponent/>}/>
                   <Route exact path ="/aboutus" component={()=> <AboutComponent leaders={this.props.leaders}/>} />
                   
                   <Redirect to="/home" />
               </Switch>

                <FooterComponent />
            </div>


        );
    }
}



export default withRouter(connect(mapStateToProps)(MainComponent));
