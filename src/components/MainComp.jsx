import React, { Component } from 'react';
import Home from './HomeComp';
import Login from './LoginComp';
import Signup from './SignupComp';
import UpdateProfile from './UpdateProfile'
import { googleLogin, loginUser, signupUser, logoutUser } from '../redux/ActionCreators';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
    return {
        messages : state.messages,
        auth : state.auth
    }
};

const mapDispatchToProps = (dispatch) => ({
    loginUser : (creds) => {dispatch(loginUser(creds))},
    googleLogin : () => {dispatch(googleLogin())},
    logoutUser : () => {dispatch(logoutUser())},
    signupUser : (creds) => {dispatch(signupUser(creds))},
});

class Main extends Component {

    componentWillUnmount() {
        this.props.logoutUser();
    }


    render() {

        const PrivateRoute = ({component: Component, ...rest}) => {
            return(
                <Route {...rest} component={(props) => {
                    const user = localStorage.getItem('creds') ? JSON.parse(localStorage.getItem('creds')) : null;
            
                    if(user){
                        return <Component {...props} />
                    }else{
                        return <Redirect to={`/login`} />
                    }
            
                }} />
                )
            }

            
        return (
            <>
                <Switch>
                    <PrivateRoute exact path="/home" component={() => <Home logout = {this.props.logoutUser} />}  />
                    <PrivateRoute exact path="/update-profile" component ={() => <UpdateProfile logout ={this.props.logoutUser} />}  />
                    <Route path="/login" component={() => <Login auth={this.props.auth} googleLogin = {this.props.googleLogin} loginUser = {this.props.loginUser} /> }   />
                    <Route path="/signup" component={() => <Signup signupUser = {this.props.signupUser} auth = {this.props.auth}     />}  />
                    <Redirect  to="/login"  />
                </Switch>   
            </>
        )
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
