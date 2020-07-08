import React from 'react';

import {Card, CardImg, CardImgOverlay, CardTitle} from 'reactstrap';


function RenderMenuItem({dish, onClick, ...props}){
    return (

        /*'tag="li"' everything that follows will be a list item*/ 
        < Card onClick={()=> onClick(dish.id)}>
    
            {/* picture of dish */}
            < CardImg width="100%" src={ dish.image } alt = { dish.name } />

            {/* content */}
            < CardImgOverlay >
                <CardTitle>{dish.name}</CardTitle>
            </CardImgOverlay >

        </Card >

    );
}
    

const MenuComponent = (props) =>{

    const Menu = props.dishes.map((dish) => (
        //perfom this
        //key neededs to be unique
        <div key={dish.id} className="col-12 col-md-5 m-1">
            <RenderMenuItem dish={dish} onClick={props.onClick}/>
        </div >


    ));


    return (

        <div className="container">

            <div className="row">
                {Menu}
            </div>

        </div>

    );

}


export default MenuComponent;
        