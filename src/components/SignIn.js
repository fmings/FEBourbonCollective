import React from 'react';
import { Button } from 'react-bootstrap';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh',
        padding: '30px',
        maxWidth: '400px',
        margin: '0 auto',
      }}
    >
      <img src="\images\BourbonCollectiveLogoDark.png" alt="bourbon collective logo" />
      <Button type="button" size="lg" className="copy-btn" onClick={signIn}>
        Sign In/Register
      </Button>
    </div>
  );
}

export default Signin;
