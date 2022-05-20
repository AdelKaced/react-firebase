import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState, useRef } from 'react';
import { auth } from '../utils/firebase.config';

const Login = () => {
  const loginEmail = useRef('');
  const loginPassword = useRef();
  const [error, setError] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      //connect a user on Data Base
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail.current.value,
        loginPassword.current.value
      );
    } catch (error) {
      console.log(error.message);
      setError(true);
    }
  };

  return (
    <div className="login-container">
      <div className="login">
        <h3>Connect</h3>
        <form className="form-login" onSubmit={handleLogin}>
          <input type="email" placeholder="email" required ref={loginEmail} />
          <input
            type="password"
            placeholder="password"
            required
            ref={loginPassword}
          />
          <input type="submit" value="Send" />
          <span>{error && "email or password doesn't match"}</span>
        </form>
      </div>
    </div>
  );
};

export default Login;
