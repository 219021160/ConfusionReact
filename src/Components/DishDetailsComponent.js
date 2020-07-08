import React, {Component} from 'react';

import { Card, CardImg, CardText, CardTitle, CardBody } from 'reactstrap';

import {format} from 'date-fns';

export default class DishDetailsComponent extends Component{
    constructor(props){
        super(props);
        this.state={}
    }

    getDate = (date)=>{
        // pass split a reguler expression (regex) which specifys the separator(s)
        let arrDate = date.split(/-|T/);
        
        let month = arrDate[1];
        month--;

        let day = arrDate[2];
        day++;

        let year = arrDate[0] ;
        //note january is 0
        //expected format month date, year
        const DATE = format(new Date(year, month , day) , 'MMM dd, yyyy');
        return DATE;

    }

    renderDish(dish) {
        if (dish != null) {
            return (
 
                <div key={dish.key} >
                    <Card >
                        <CardImg width="100%" src={dish.image} alt={dish.name} />

                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
                

            );

        } else {
            return (<div></div>);
        }
    }

    //renderComments
    renderComments(dish) {
        if (dish != null) {
            return (

                <div key={dish.id} >
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {dish.comments.map(comment => (
                            <li key={comment.id}>
                                {comment.comment} <br /> <br />
                                -- {comment.author}, {this.getDate(comment.date)}<br /> <br />
                            </li>
                        ))}
                    </ul>
                </div>

            );

        } else {
            return (<div></div>);
        }
    }



    render(){
        return (
            // className = "col-12 col-md-5 m-1"
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {this.renderDish(this.props.selectedDish)}
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.selectedDish)}
                    </div>

                </div>
                                      
            </div>
        );
    }
}