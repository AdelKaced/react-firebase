import React, { useState, useRef } from 'react';
import { auth } from '../utils/firebase.config';

const SignUp = () => {
  const registerEmail = useRef();
  const registerPassword = useRef();
  console.log(registerEmail.current);
  const [displayName, setDisplayName] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();

    try {
      auth
        .createUserWithEmailAndPassword(
          registerEmail.current.value,
          registerPassword.current.value
        )
        .then(async (userAuth) => {
          await userAuth.user.updateProfile({
            displayName
          });
          window.location.reload();
        });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup">
        <h3>SignUp</h3>
        <form onSubmit={handleRegister}>
          <input type="text" placeholder="Pseudo" onChange={(e)=> setDisplayName(e.target.value)} required />
          <input
            type="email"
            placeholder="email"
            required
            ref={registerEmail}
          />
          <input
            type="password"
            placeholder="password"
            required
            ref={registerPassword}
          />
          <input type="submit" value="Validate" />
        </form>
      </div>
    </div>
  );
};

export default SignUp;
