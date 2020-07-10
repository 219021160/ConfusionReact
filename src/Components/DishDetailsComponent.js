import React, {Component} from 'react';

import { Card, CardImg, CardText, CardTitle, CardBody } from 'reactstrap';

import {format} from 'date-fns';

import {Breadcrumb, BreadcrumbItem} from 'reactstrap';

import {Link} from 'react-router-dom'

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
    renderComments(comments) {
        if (comments != null) {
            return (

                <div>
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map(comment => (
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
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu" >Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>
                            {this.props.selectedDish.name}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>


                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <h3>Dish Details : {this.props.selectedDish.name}</h3>
                        {this.renderDish(this.props.selectedDish)}
                    </div>
            
                    <div className="col-12 col-md-5 m-1">
                        {this.renderComments(this.props.comments)}
                    </div>

                </div>
                                      
            </div>
        );
    }
}