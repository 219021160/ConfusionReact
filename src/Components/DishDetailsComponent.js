import React, {Component} from 'react';

import { Card, CardImg, CardText, CardTitle, CardBody, Modal, ModalBody, ModalHeader } from 'reactstrap';

import {format} from 'date-fns';

import {Breadcrumb, BreadcrumbItem} from 'reactstrap';

import {Link} from 'react-router-dom';

import { Button, Label, Col, Row } from 'reactstrap';

import { Control, LocalForm, Errors } from 'react-redux-form'; 

import { Loading } from './LoadingComponent';

import { baseUrl } from '../shared/baseUrl';

let DISHNAME = '';

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
        this.onSubmit = this.onSubmit.bind(this);
    };

    toggleModal() {
        this.setState({ isModalOpen: !this.isModalOpen });
    }

    onSubmit=(values)=>{

        this.props.addComment(this.props.selectedDish.dishid, values.rating, values.author, values.comment);

        this.setState({ isModalOpen: !this.isModalOpen });
        
        
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
            //DISHNAME = JSON.stringify(dish.name); 
            return (
                
 
                <div key={dish.key} >
                    <Card >
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name} />

                        <CardBody>
                            <CardTitle>{DISHNAME}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>       
            );

        } else if (this.props.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.errMess) {
            return (
                <div className="container">
                    <div className="row">
                        <h4>{this.props.errMess}</h4>
                    </div>
                </div>
            );
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
              //  this.props.addcomment, this.props.dishid

            );

        } else {
            return (<div></div>);
        }
    }

    componentWillMount(dish = this.props.selectedDish){

        if (dish != null) {
            DISHNAME = dish.name;
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
                            {DISHNAME}
                            {/* {this.props.selectedDish.name} */}
                        </BreadcrumbItem>
                    </Breadcrumb>
                </div>


                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        {DISHNAME}
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
                        <LocalForm onSubmit={(values)=>this.onSubmit(values)} addCommentt={this.props.addComment} >

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
                                    <Label htmlFor="author">Your Name</Label>
                                </Col>
                                <Col xs={{ size: 12 }}>
                                    <Control.text model=".author" name="author" id="author" placeholder="Your Name" className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(10)
                                        }}/>
                                        <Errors className="text-danger" model=".author" show="touched" messages={{
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