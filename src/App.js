/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import logo from './logo.svg';

import {Navbar, NavbarBrand} from 'reactstrap';

import './App.css';

import MenuComponent from './Components/MenuComponent';

import {DISHES, NAME} from './Shared/dishes';


export default class App extends Component{

  render(){
    return(

      <div >

        <Navbar dark color="primary" >
          <div className="container">

            <NavbarBrand href="/">Ristorante Con Fusion</NavbarBrand>

          </div>
        </Navbar>

        <MenuComponent dishes={DISHES}/>

      

      </div>


    );
  }
}
