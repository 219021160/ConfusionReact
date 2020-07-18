/* eslint-disable no-unused-vars */
import React, { Component, Fragment } from 'react';


import HeaderComponent from './HeaderComponent';

import FooterComponent from './FooterComponent';

import HomeComponent from './HomeComponent';

import ContactComponent from './ContactComponent';

import MenuComponent from './MenuComponent';

import DishDetailsComponent from './DishDetailsComponent';

import AboutComponent from './AboutComponent';

import {connect} from 'react-redux';

import {Switch, Route, Redirect, withRouter} from 'react-router-dom';

import { addComment, fetchDishes} from '../Redux/ActionCreators';


//map state properties to props in component
//to get access to state
const mapStateToProps = state => {

    return {
        dishes: state.dishes,
        comments: state.comments,
        promotions: state.promotions,
        leaders: state.leaders
    };

};

//recieves dipatch function from store
const mapDispatchToProps = (dispatch) =>{
    return ({
        addComment: (dishId, rating, author, comment) => dispatch(addComment(dishId, rating, author, comment)),
        fetchDishes: () => { dispatch(fetchDishes()) }
    });
};



class MainComponent extends Component {

    componentDidMount() {
        this.props.fetchDishes();
    }


    render() {

        const DISHWITHID = ({match})=> {
            return (

                <Fragment>

                <DishDetailsComponent selectedDish={this.props.dishes.dishes.filter((dish)=> {if(dish.id === parseInt(match.params.dishid,10)){return dish}} )[0]}
                    comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishid,10) )}
                    addComment={this.props.addComment}
                    errMess={this.props.dishes.errMess}
                    isLoading={this.props.dishes.isLoading}
                />
                  
                </Fragment>
            );
        }

        return (

            <div >

               {/* header */}
               <HeaderComponent />

               <Switch>
                    <Route path="/home" component={() => <HomeComponent dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                        promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                        leader={this.props.leaders.filter((leader) => leader.featured)[0]}
                        dishesLoading={this.props.dishes.isLoading}
                        dishesErrMess={this.props.dishes.errMess} />}/>

                   <Route exact path="/menu" component={() => <MenuComponent dishes={this.props.dishes.dishes} />} />

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


//the map... functions are passed here so that all within them
//are available to use
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MainComponent));
