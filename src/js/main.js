import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import cookie from 'js-cookie';
import $, { ajax } from 'jquery';

export default class Main extends Component {
  logOut(){
    cookie.remove('current_user')
    cookie.remove('newTrip')
    $('.logout').addClass('hidden');
  }

  render(){
    return (
      <div className="main-wrapper">
        <div className='top-main-wrapper'>
          <div className="main-logo">
            <Link to="/">L I F T E R I</Link>
          </div>

          <div className="main-nav">
            <Link to="/">Home</Link>
            <Link to="/myprofile"> Profile </Link>
            <Link to="/hosttripbooking">Host A Trip</Link>
            <Link to="/login">LOGIN/REGISTER</Link>
            <Link to="/"><button className='logout' onClick={::this.logOut}>Log Out</button></Link>
          </div>
        </div>
        {this.props.children}

      </div>
    )
  }
}


            // Move me back when we have data
            // <Link to={`/profile/${{user_name}}`}>Profile</Link>
