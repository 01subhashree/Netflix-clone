/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import style from "./SignIn.module.css";
import { auth } from "../../utility/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function SignIn({ email }) {
  const [emailId, setEmailId] = useState(email);
  const passwordRef = useRef(null);

  const register = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, emailId, passwordRef.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const signIn = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, emailId, passwordRef.current.value)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className={style.signupScreen}>
      <form>
        <h1>Sign In</h1>
        <input
          placeholder="Email"
          type="email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
        />
        <input placeholder="Password" type="password" ref={passwordRef} />
        <button type="submit" onClick={signIn}>
          Sign In
        </button>

        <h4>
          <span className={style.signupScreen__gray}> New to Netflix?</span>
          <span className={style.signupScreen__link} onClick={register}>
            Sign Up now.
          </span>
        </h4>
      </form>
    </div>
  );
}
