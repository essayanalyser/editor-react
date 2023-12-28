import React, { useState } from "react";
import { Link } from "react-router-dom";

import { auth } from "./../../../config/Firebase";
import { sendPasswordResetEmail } from "firebase/auth";
import removeFirebasePrefix from "../../../utility/removeFirebasePrefix";

function ResetPass() {
  const [values, setValues] = useState({
    email: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  async function handleResetPass(e) {
    e.preventDefault();

    setSubmitButtonDisabled(true)

    if (!values.email) {
      setErrorMsg("Enter an email")
    }
    setErrorMsg("")

    await sendPasswordResetEmail(auth, values.email).then(() => {
      setErrorMsg("Check your inbox for further instructions.")
      setSubmitButtonDisabled(false)
    }).catch(err => {
      setErrorMsg(removeFirebasePrefix(err.message))
      setSubmitButtonDisabled(false)
    })

  };
  return (
    <div className="auth-wrapper">
      <div className="auth-cards">
        <p className="heading">Reset Password</p>

        <form onSubmit={handleResetPass} className="auth-form flex flex-col gap-3">
          <input
            label="Email"
            autoFocus
            value={values.email}
            onChange={(event) =>
              setValues((prev) => ({ ...prev, email: event.target.value }))
            }
            placeholder="Enter email address"
          />

          <div className="-mt-2 justify-end flex">
            <Link className="hover:underline cursor-pointer" to='/auth/login'>Login</Link>
          </div>

          <b className="error">{errorMsg}</b>

          <button className="application-button" disabled={submitButtonDisabled} onClick={e => handleResetPass(e)}>
            Rest Password
          </button>

        </form>
      </div>
      <div className="auth-cards">
        <p>
          Don't have an account?{" "}
          <span className="underline">
            <Link to="/auth/signup">Sign up</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default ResetPass;