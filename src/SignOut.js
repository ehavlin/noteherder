import React from 'react'

const SignOut = ({ signOut }) => {
    return (
        <button 
            clasName="SignOut"
            onClick={signOut}
        >
            Sign Out 
        </button>
    )
}

export default SignOut