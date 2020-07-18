import React from 'react';

import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';

import {Link} from 'react-router-dom';

import { Loading } from './LoadingComponent';


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

    const Menu = props.dishes.map((dish) => {
        
        if (props.dishes.isLoading) {
            return (
                <div className="container">
                    <div className="row">
                     <Loading />
                 </div>
                </div>
            );
        }
        else if (props.dishes.errMess) {
         return (
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h4>{props.dishes.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else {

            return (
                //perform this
                //key neededs to be unique
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <RenderMenuItem dish={dish} />
                </div >
            );

        }

        


});


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
        