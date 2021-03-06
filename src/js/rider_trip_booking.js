import React, { Component, PropTypes } from 'react';
import { Link, hashHistory } from 'react-router';
import SSF from 'react-simple-serial-form';
import { ajax } from 'jquery';
import cookie from 'js-cookie';
import Modal from './modal';
import LoginAtTripBook from './login_rider_booking';

       //// add me to route to RIDER TRIP BOOKED AFTER COOKIE.SET // hashHistory.push('/tripdetails');


// PUT REQUEST/////
///need to make this so that were just sending backend the user ID because the CC info is dummy data//////

export default class RiderTripBooking extends Component {
	constructor(...args){
		super(...args);
		this.state = {
			current_user: null,
			showLogin: false
		}
	}
		componentWillMount(){
			let current_user = cookie.getJSON('current_user')
			? cookie.getJSON('current_user').current_user
			: null;
			this.setState({current_user})
		}

	loginHandler(){
		let current_user = cookie.getJSON('current_user')
		? cookie.getJSON('current_user').current_user
		: null;
			this.setState({ current_user });
			if (current_user){
				this.hideLoginHandler()
			}
	}
	showLoginHandler() {
		let { current_user } = this.state;
		console.log('current_user', current_user)
		if(!current_user){
			this.setState({showLogin: true})
		}
	}
	hideLoginHandler() {
		let current_user = cookie.getJSON('current_user')
		? cookie.getJSON('current_user').current_user
		: null;
			this.setState({showLogin: false, current_user  });
	}

	  book(bookingInfo) {
			let {id} = this.props.params;
			let current_user = cookie.getJSON('current_user')
			? cookie.getJSON('current_user').current_user
			: null;
				this.setState({
					current_user
				});
			if (current_user){
				ajax({
					url: `https://salty-river-31528.herokuapp.com/riders/${id}`,
					type: 'PUT'
				}).then(resp => {
					hashHistory.push('/riderconfirmation')})
					.fail(e => alert(`You've already booked this trip!`))
	}else {
		this.setState({ showLogin: true})
	}
}

fakeFunction(){
	return;
}

  render(){
		let { showLogin } = this.state;
    return (
      <div className="rider-trip-booking-wrapper">


      <SSF className='rider-trip-booking' onData={::this.fakeFunction}>

      		

            <label>
              Name as it appears on card:
              <input
                type='text'
                name='name_on_card'
                placeholder='first last'/>
            </label>

            <label>
              Card Number:
              <input
                type='text'
                name='credit_card_number'
                placeholder='CC number here'/>
            </label>

            <label>
              Expiration Date:
              <input
                type='date'
                name='expiration_date'
                placeholder='MM/YY format'/>
            </label>
            <label>
              3 digit security code:
              <input
                type='text'
                name='security_code'
                placeholder='###'/>
            </label>




        </SSF>
				<SSF className='rider-trip-booking-book'onData={::this.book}>

					<input
						type='hidden'
						name='user_id'/>
					<button>Book This Trip</button>
				</SSF>
				<Modal show={showLogin} onCloseRequest={::this.hideLoginHandler}>
          <LoginAtTripBook onLogin={::this.loginHandler}/>
        </Modal>
      </div>
    )
  }
}
