import React from 'react';

import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';

import {Link} from 'react-router-dom';

function RenderMenuItem({dish, onClick, ...props}){
    return (

        /*'tag="li"' everything that follows will be a list item*/ 
        < Card>
            <Link to={`/menu/${dish.id}`}>
    
                {/* picture of dish */}
                < CardImg width="100%" src={ dish.image } alt = { dish.name } />

                {/* content */}
                < CardImgOverlay >
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay >
            </Link>
        </Card >

    );
}
    

const MenuComponent = (props) =>{

    const Menu = props.dishes.map((dish) => (
        //perfom this
        //key neededs to be unique
        <div key={dish.id} className="col-12 col-md-5 m-1">
            <RenderMenuItem dish={dish}/>
        </div >


    ));


    return (

        <div className="container">

            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem>
                        <Link to="/home">Home</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem active>
                        <Link to="/Menu">Menu</Link>
                    </BreadcrumbItem>
                </Breadcrumb>

                <div className="col-12">
                    <h3>Menu</h3>
                    <hr/>
                </div>
            </div>

            <div className="row">
                {Menu}
            </div>

        </div>

    );

}


export default MenuComponent;
        