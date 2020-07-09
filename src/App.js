/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

import MainComponent from './Components/MainComponent';

import './App.css';

import {BrowserRouter} from 'react-router-dom';

export default class App extends Component{

  render(){
    return(

      //BrowserRouter allows navigation
      <BrowserRouter>
        <div >
          <MainComponent/>
        </div>
      </BrowserRouter>

    );
  }
}
