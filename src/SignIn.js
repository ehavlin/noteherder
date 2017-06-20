import React from 'react'

import './SignIn.css'
import { auth, githubProvider, googleProvider } from './base'

const SignIn = ({ authHandler }) => {

    const authenticateGithub = () => {
        auth.signInWithPopup(githubProvider) 
    }

    const authenticateGoogle = () => {
        auth.signInWithPopup(googleProvider) 
    }

    return (
        <div className="signIn">
            <button 
                className="SignInGithub"
                onClick={authenticateGithub}
            >   
                Sign in
                <i className="fa fa-github" aria-hidden="true"></i>
            </button>
            <button 
                className="SignInGoogle"
                onClick={authenticateGoogle}
            >
                Sign in
                <i className="fa fa-google" aria-hidden="true"></i>
            </button> 
        </div>    
    )
}

export default SignIn