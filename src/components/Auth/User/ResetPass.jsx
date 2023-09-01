import React, { useState } from "react";
import { Link } from "react-router-dom";

import { auth } from "./../../../config/Firebase";
import { sendPasswordResetEmail } from "firebase/auth";

function ResetPass() {
  const [values, setValues] = useState({
    email: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  async function handleResetPass () {
    setSubmitButtonDisabled(true)

    if(!values.email) {
        setErrorMsg("Enter an email")
    }
    setErrorMsg("")

    await sendPasswordResetEmail(auth, values.email).then(()=>{
        setErrorMsg("Check your inbox for further instructions.")
        setSubmitButtonDisabled(false)
    }).catch(err => {
        setErrorMsg(err.message)
        setSubmitButtonDisabled(false)
    })

  };
  return (
    <div className="auth-wrapper">
      <p className="heading">Reset Password</p>

      <input
        label="Email"
        value={values.email}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, email: event.target.value }))
        }
        placeholder="Enter email address"
      />

      <div className="auth-footer">
        
        <Link to='/auth/login'>Login</Link>
        
        <b className="error">{errorMsg}</b>
        
        <button className="application-button" disabled={submitButtonDisabled} onClick={handleResetPass}>
          Rest Password
        </button>
        
        <p>
          Don't have an account?{" "}
          <span>
            <Link to="/auth/signup">Sign up</Link>
          </span>
        </p>
      
      </div>
    </div>
  );
}

export default ResetPass;