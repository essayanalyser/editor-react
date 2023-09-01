import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth } from "../../../config/Firebase";

function Login() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    pass: "",
  });
  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = () => {
    if (!values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    setErrorMsg("");

    setSubmitButtonDisabled(true);
    signInWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);

        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };
  return (
    <div className="auth-wrapper">
      <p className="heading">Login</p>

      <input
        label="Email"
        value={values.email}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, email: event.target.value }))
        }
        placeholder="Enter email address"
      />
      <input
        label="Password"
        type="password"
        value={values.pass}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, pass: event.target.value }))
        }
        placeholder="Enter Password"
      />

      <div className="auth-footer">
        <Link to='/auth/reset'>Forgot password?</Link>
        <b className="error">{errorMsg}</b>
        <button className="application-button" disabled={submitButtonDisabled} onClick={handleSubmission}>
          Login
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

export default Login;