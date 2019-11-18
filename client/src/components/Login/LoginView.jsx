import React from 'react'
import './login.scss';
import DatePicker from "react-datepicker";
import moment from 'moment'
import "react-datepicker/dist/react-datepicker.css";
import isEmail from 'validator/lib/isEmail';

import {
  faAddressBook, faEnvelope, faLock, faUser, faPhone
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LoginView extends React.Component {
  constructor() {
    super()
    this.state = {
      dob: null, isLoginUserNameEmpty: false, isLoginPasswordEmpty: false,
      isSignUpFullNameEmpty: false, isSignUpEmailEmpty: false, isSignUpPaswordEmpty: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDateOfBirth = this.handleDateOfBirth.bind(this)
    this.birthDate = null
  }
  handleDateOfBirth = (value) => {
    this.birthDate = value
    this.setState({ dob: moment(value).format("YYYY-MM-DD") })
    this.props.clearErrorBorders()
  }
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    this.props.clearErrorBorders()
  };

  validateSignUpFormAndSubmit() {
    let isSignUpFullNameEmpty = true, isSignUpEmailEmpty = true, isSignUpPaswordEmpty = true;
      {/*isSignUpEmailInValid = true;*/}
    if (this.state.first_name && this.state.first_name.trim() !== "") {
      isSignUpFullNameEmpty = false;
    }
    if (this.state.email && this.state.email.trim() !== "") {
      isSignUpEmailEmpty = false;
     {/* isSignUpEmailInValid = isEmail(this.state.email.trim());*/}
    }
    if (this.state.password && this.state.password.trim() !== "") {
      isSignUpPaswordEmpty = false;
    }


    if ( isSignUpPaswordEmpty || isSignUpEmailEmpty || isSignUpFullNameEmpty ) {
      this.setState({  isSignUpPaswordEmpty, isSignUpEmailEmpty, isSignUpFullNameEmpty });
    } else {
      this.setState({  isSignUpPaswordEmpty, isSignUpEmailEmpty, isSignUpFullNameEmpty });
      this.props.signup(this.state);
    }
  }

  validateLoginFormAndSubmit() {
    let isLoginUserNameEmpty = true, isLoginPasswordEmpty = true;
    if (this.state.email && this.state.email.trim() !== "") {
      isLoginUserNameEmpty = false;
    }
    if (this.state.password && this.state.password.trim() !== "") {
      isLoginPasswordEmpty = false;
    }
    if (isLoginPasswordEmpty || isLoginUserNameEmpty) {
      this.setState({ isLoginPasswordEmpty, isLoginUserNameEmpty });
    } else {
      this.setState({ isLoginPasswordEmpty, isLoginUserNameEmpty });
      this.props.login(this.state);
    }
  }

  render() {
    return (
      <div className="container-fluid loginContainer mt-5">
        <div>
          {this.props.signUpCondition ? <div className='w-100'>
            <form className='col-12 col-xl-4 col-lg-6 col-md-8 col-sm-10 signupArea offset-xl-4 offset-lg-3 offset-md-2 offset-sm-1'>
              <h1 className='slide-design-header mb-5 text-center'>Create Account</h1>
              {
                this.props.message
                && (
                  <span className='slide-design-a' style={{ color: 'red' }}>{this.props.message}</span>
                )
              }

              <div className={this.props.signUpFailed ? 'input-group login-failed-border mt-3' : 'input-group mt-3'}>
                <div className="input-group-prepend">
                  <span className="input-group-text"> <FontAwesomeIcon
                    icon={faAddressBook}
                  /></span>
                </div>

                <input
                  name='first_name'
                  className="form-control"
                  type='text'
                  placeholder='Full name'
                  onChange={this.handleChange}
                />
              </div>
              {this.state.isSignUpFullNameEmpty && <div className="alert text-danger w-100 text-left m-0 p-0">

                <i className="fa fa-warning"></i > Full name is required</div>}

              <div className={this.props.signUpFailed ? 'input-group login-failed-border mt-3' : 'input-group mt-3'}>
                <div className="input-group-prepend">
                  <span className="input-group-text"><FontAwesomeIcon
                    icon={faEnvelope}
                  /></span>
                </div>

                <input
                  name='email'
                  className={this.props.signUpFailed ? 'form-control login-failed-border' : 'form-control'}
                  type='email'
                  placeholder='Email'
                  onChange={this.handleChange}
                />
              </div>

              {this.state.isSignUpEmailEmpty && <div className="alert text-danger w-100 text-left m-0 p-0">
                <i className="fa fa-warning"></i > Email is required</div>}


              <div className={this.props.signUpFailed ? 'input-group login-failed-border mt-3' : 'input-group mt-3'}>
                <div className="input-group-prepend">
                  <span className="input-group-text"><FontAwesomeIcon
                    icon={faLock}
                  /></span>
                </div>

                <input
                  name='password'
                  className="form-control"
                  type='password'
                  placeholder='Password'
                  onChange={this.handleChange}
                />
              </div>
              {this.state.isSignUpPaswordEmpty && <div className="alert text-danger w-100 text-left m-0 p-0">
                <i className="fa fa-warning"></i > Password is required</div>}  

              <button
                className='btn btn-block btn-lg btn-primary mt-2 btnLogin'
                onClick={(e) => { e.preventDefault(); this.validateSignUpFormAndSubmit() }}
              >
                Sign up
                </button>

              {this.props.signUpFailed && <div className="alert text-danger w-100 text-left m-0 p-0"><i className="fa fa-warning"></i > Sign up error! Try again</div>}

              <p className="mt-5 text-center">Already have an account? </p>
              <button
                className='btnSignUpNow mt-2 btn-block'
                onClick={(e) => { e.preventDefault(); this.props.handleSignUpCondition() }}
              >
                Login now!
                  </button>
            </form>
          </div> :
            <div className='w-100'>
              <form className='col-12 col-xl-4 col-lg-6 col-md-8 col-sm-10 loginArea offset-xl-4 offset-lg-3 offset-md-2 offset-sm-1'>

                {
                  this.props.message
                    ? (
                      <h1 className='slide-design-header mb-5'>{this.props.message}</h1>
                    )
                    : (
                      <h1 className='slide-design-header mb-5 text-center'>Sign in</h1>
                    )
                }
                <div className={this.props.login_failed ? 'input-group login-failed-border' : 'input-group'}>
                  <div className="input-group-prepend">
                    <span className="input-group-text"><FontAwesomeIcon
                      icon={faUser}
                    /></span>
                  </div>

                  <input
                    className="form-control"
                    name='email'
                    type='email'
                    id='email'
                    placeholder='Username'
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.isLoginUserNameEmpty && <div className="alert text-danger w-100 text-left m-0 p-0"><i className="fa fa-warning"></i > Username is required</div>}

                <div className={this.props.login_failed ? 'input-group login-failed-border mt-3' : 'input-group mt-3'}>
                  <div className="input-group-prepend">
                    <span className="input-group-text"><FontAwesomeIcon
                      icon={faLock}
                    /></span>
                  </div>
                  <input
                    className="form-control"
                    name='password'
                    type='password'
                    id='password'
                    placeholder='Password'
                    onChange={this.handleChange}
                  />
                </div>
                {this.state.isLoginPasswordEmpty && <div className="alert text-danger w-100 text-left m-0 p-0"><i className="fa fa-warning"></i > Password is required</div>}

                <button
                  className='btn btn-block btn-lg btn-primary mt-3 btnLogin'
                  onClick={(e) => { e.preventDefault(); this.validateLoginFormAndSubmit() }}
                >
                  Login
                </button>

                {this.props.login_failed && <span className="alert text-danger w-100 text-left m-0 p-0"><i className="fa fa-warning"></i > Invalid credentials</span>}
                <a className='mt-2 forgotPassword' href='#'>Forgot your password?</a>
                <p className="mt-4 text-center">Don't have an account? </p>
                <button
                  className='btnSignUpNow mt-2 btn-block'
                  onClick={(e) => { e.preventDefault(); this.props.handleSignUpCondition() }}
                >
                  Sign up now!
                  </button>
              </form>
            </div>}
        </div>
      </div>

    );
  }
}
export default LoginView