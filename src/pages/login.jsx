import React from 'react';
import LoginForm from '../components/loginForm';
import '../css/common.css';
import { isUserLoggedIn } from "../helper/model";
import Container from "../components/container";

const Login = () => {

    if ( isUserLoggedIn() ) {
        return (
            <div className="row page">
                <h3>You are already logged in</h3>
            </div>
        );
    } else {
        return ( 
            <Container>
                <LoginForm />
            </Container>
            );
    }

}
 
export default Login;