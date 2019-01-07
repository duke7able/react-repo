import React from 'react';
import LoginForm from '../components/loginForm';
import '../css/common.css';
import { isUserLoggedIn } from "../helper/model";

const Login = ({ props }) => {

    if ( isUserLoggedIn() ) {
        return (
            <div className="row loginPage">
                <h3>You are already logged in</h3>
            </div>
        );
    } else {
        return ( 
            <div className="row loginPage">
                <div className="col-md-4 col-md-offset-4">
                    <LoginForm />
                </div>
            </div>
            );
    }

}
 
export default Login;