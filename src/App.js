/* eslint-disable no-unused-vars */
import React, { Component } from 'react';

import {Provider} from 'react-redux';

import {ConfigureStore} from './Redux/ConfigureStore';

import MainComponent from './Components/MainComponent';

import './App.css';

import {BrowserRouter} from 'react-router-dom';

const store = ConfigureStore();


export default class App extends Component{

  render(){


    return(

      <Provider store={store} >

        {/* BrowserRouter allows navigation */}
        <BrowserRouter>
          <div >
            <MainComponent/>
          </div>
        </BrowserRouter>
      </Provider>

    );
  }
}
