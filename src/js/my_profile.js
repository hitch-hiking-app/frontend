import React, { Component } from 'react';
import { Link, hashHistory } from 'react-router';
import {ajax} from 'jquery';
import cookie from 'js-cookie'



//////MY PROFILE HAS EDITING CAPABILITIES ONLY AVAILABLE FOR CREATOR OF PROFILE////


export default class MyProfile extends Component {
  constructor(...args){
  super(...args);
  this.state = {
    current_user_trips: [],
    current_user: {},
    loading: true
    }
  }

  componentWillMount(){
    let user = cookie.getJSON('current_user').current_user
    if (user){
        ajax({
        url: `https://salty-river-31528.herokuapp.com/profile/${user.id}`,
        type: 'GET',
        headers: {
          'Auth-Token': user.auth_token
        }
        }).then( resp => {
          console.log(resp.user)
            this.setState({
              current_user_trips: resp.user.host,
              current_user: resp.user,
              loading: false
            })
            }
        )
    }
    }


          gettrips(trip){
            return (
            <div className="profile_get_trips" key={trip.host_id}>
              <span className="profile-cities"> {trip.departing_city} to {trip.destination} </span>

                <div className="get_trips_flex">
                  <span className="profile-dates"> {trip.date_leave} to {trip.date_arrive} </span>
                  <Link className="profile-trip-details" to={`/tripdetails/${trip.id}`}> details + </Link>
                </div>

            </div>
          )}
renderLoading(){
  return (
    <div>Loading...</div>
    )
}
renderPage(){
  let trips = this.state.current_user_trips;
      let current_user = this.state.current_user
      console.log(current_user)
    return (
      <div className="profile-wrapper">

      <div className="profile-header">
        <div className="profile-picture">
          <img src= {current_user.pictures[0].image_url} />
          </div>

          <div className="profile-user-details">

            <div className="profile-name">
              {current_user.first_name} {current_user.last_name}
            </div>

            <div className="profile-status">
              Rider / Driver status
            </div>


          </div>
        </div>





        <div className="profile-trips">
          <div className="profile-new-trips">
            <span className="your-trips"> Your Trips </span>
            <Link to="/hosttripbooking" className="new-trips-btn"> + MAKE A NEW TRIP </Link>
          </div>

          <div className="profile-trips-list">

           { trips.map(::this.gettrips) }

          </div>



        <Link className="hidden edit-btn" to={`/editprofile/${current_user.id}`}> EDIT YOUR PROFILE </Link>


        </div>


      </div>
    )
  }
  render(){
      let {loading} = this.state;
      return loading
      ? this.renderLoading()
      : this.renderPage()
 }
}

