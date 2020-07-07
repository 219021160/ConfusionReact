import React, {Component} from 'react';

import {Card, CardImg, CardImgOverlay, CardText, CardTitle, CardBody} from 'reactstrap';

export default class MenuComponent extends Component{

    constructor(props){
        super(props);
        this.state ={
            selectedDish:null
        }
    }

    onDishSelecct(dish){
        this.setState({selectedDish:dish});
    }

    renderDish(dish){
        if (dish!=null){
            return (
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name} />
                    
                    <CardBody>
                        <CardTitle heading>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>

                </Card>
            );

        }else {
            return (<div></div>);
        }
    }
    

    render(){
    
        const Menu = this.props.dishes.map( (dish) => (
            //perfom this

            //key neededs to be unique
            <div key={dish.key} className="col-12 col-md-5 m-1">
                {/*'tag="li"' everything that follows will be a list item*/}
                <Card onClick={()=> this.onDishSelecct(dish)} >
                    {/* picture of dish */ }
        
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                   
                    {/* content */}
                    <CardImgOverlay>
                        <CardTitle heading>{dish.name}</CardTitle>
                    </CardImgOverlay>

                </Card >
            </div >


         ) );



        return (

            <div className="container">

                {/* first row contains the menu list */}
                <div className="row">
                    {Menu}
                </div>
                <div className="row">
                    {this.renderDish(this.state.selectedDish)}
                </div>
                
            </div>

        );
    }




//end of class
}