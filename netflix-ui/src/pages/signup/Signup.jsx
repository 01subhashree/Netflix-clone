import { useState } from "react";
import style from "./Signup.module.css";
import SignIn from "../signIn/SignIn";

export default function Signup() {
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState("");

  const clickHandler = (e) => {
    e.preventDefault();
    setSignIn(true);
    // setEmail("");
  };

  return (
    <div className={style.loginScreen}>
      <div className={style.loginScreen_background}>
        <img
          className={style.loginScreen_logo}
          src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"
          alt=""
        />
        <button
          className={style.loginScreen_button}
          onClick={() => setSignIn(true)}
        >
          Sign In
        </button>

        <div className={style.loginScreen_gradient} />
      </div>
      <div className={style.loginScreen_body}>
        {signIn ? (
          <SignIn email={email} />
        ) : (
          <>
            <h1>Unlimited movies, TV shows and more </h1>
            <h2>Watch anywhere. Cancel anytime</h2>
            <h3>
              Ready to watch? Enter your email to create or restart your
              membership
            </h3>
            <div className={style.loginScreen_input}>
              <form>
                <input
                  className={style.loginScreen_inputField}
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button
                  onClick={clickHandler}
                  className={style.loginScreen_getStarted}
                >
                  Get Started
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
