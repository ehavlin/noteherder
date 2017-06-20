import React from 'react'

import './SignOut.css'

const SignOut = ({ signOut }) => {
  return (
    <button
      className="SignOut"
      onClick={signOut}
    >
      <i className="fa fa-sign-out" aria-hidden="true"></i>
    </button>
  )
}

export default SignOut