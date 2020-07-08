import React, {Component} from 'react';

import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';


export default class MenuComponent extends Component{

    render(){
    
        const Menu = this.props.dishes.map( (dish) => (
            //perfom this

            //key neededs to be unique
            <div key={dish.key} className="col-12 col-md-5 m-1">
                {/*'tag="li"' everything that follows will be a list item*/}
                <Card onClick={()=>this.props.onClick(dish.id)} >
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

                <div className="row">
                    {Menu}
                </div>      
                
            </div>

        );
    }




//end of class
}