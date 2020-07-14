import React, {Component} from 'react';

import { Card, CardImg, CardText, CardTitle, CardBody, Modal, ModalBody, ModalHeader } from 'reactstrap';

import {format} from 'date-fns';

import {Breadcrumb, BreadcrumbItem} from 'reactstrap';

import {Link} from 'react-router-dom';

import { Button, Label, Col, Row } from 'reactstrap';

import { Control, LocalForm, Errors } from 'react-redux-form'; 


//validation
const required = val => val && val.length;

const maxLength = (len) => (val) => !(val) || (val.length <= len);

const minLength = (len) => (val) => val && (val.length >= len);


export default class DishDetailsComponent extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
    };

    toggleModal() {
        this.setState({ isModalOpen: !this.isModalOpen });
    }

    onSubmit=(values)=>{
        alert(JSON.stringify(values));
        alert(JSON.stringify(values.firstname));
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
                        <Button onClick={this.toggleModal} className="btn btn-light btn-outline-dark"><i className="fa fa-pencil "></i>{' '}Submit Comment</Button>
                    </div>

                </div>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>

                    <ModalHeader toggle={() => this.setState({ isModalOpen: false })}>Submit Comment</ModalHeader>

                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.onSubmit(values)}>

                            <Row className="mt-3">
                                <Col xs={{size:12}}>
                                <Label htmlFor="rating">Rating</Label>
                                </Col>
                                <Col xs={{ size: 12 }}>
                                    <Control.select defaultValue={1} model=".rating" name="rating" id="rating" className="form-control" >
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                </Col>
                            </Row>

                            <Row>
                                <Col xs={{ size: 12 }}>
                                    <Label htmlFor="firstname">Your Name</Label>
                                </Col>
                                <Col xs={{ size: 12 }}>
                                    <Control.text model=".firstname" name="firstname" id="firstname" placeholder="Your Name" className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(10)
                                        }}/>
                                        <Errors className="text-danger" model=".firstname" show="touched" messages={{
                                            //assuming that they are not met
                                            required: 'Required ',
                                            minLength: ' Must be greater than 2 characters ',
                                            maxLength: ' Must be 10 characters or less '
                                        }} />
                                </Col>
                                
                            </Row>

                            <Row className="mt-3">
                                <Col xs={{ size: 12 }}>
                                    <Label htmlFor="comment">Comment</Label>
                                </Col>
                                <Col xs={{ size: 12 }}>
                                    <Control.textarea rows={6} model=".comment" name="comment" id="comment" placeholder="Type your comment here..." className="form-control"
                                        validators={{
                                            required
                                        }} />
                                    <Errors className="text-danger" model=".firstname" show="touched" messages={{
                                        //assuming that they are not met
                                        required: 'Required  '
                                    }} />
                                </Col>
                            </Row>

                            <Row className="mt-3">
                                <Col xs={{ size: 12 }}>
                                    <Button type="submit" color="primary" >Submit</Button>
                                </Col>
                            </Row>

                        </LocalForm>
                    </ModalBody>
                </Modal>

                
                                      
            </div>
        );
    }
}