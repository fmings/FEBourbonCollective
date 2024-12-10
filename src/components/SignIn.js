import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-items-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '1000px',
        margin: '0 auto',
      }}
    >
      <img className="sign-in-logo" src="\images\BourbonCollectiveLogoDark.png" alt="bourbon collective logo" />
      <Button type="button" size="lg" className="sign-in-btn" onClick={signIn}>
        Sign In/Register
      </Button>
    </div>
  );
}

export default Signin;
