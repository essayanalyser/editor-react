import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

import { auth } from "../../../config/Firebase";
import axios from "axios"

function Signup() {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    name: "",
    email: "",
    pass: "",
    confPass: ""
  });

  const [errorMsg, setErrorMsg] = useState("");
  const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

  const handleSubmission = (e) => {
    e.preventDefault();

    if (!values.name || !values.email || !values.pass) {
      setErrorMsg("Fill all fields");
      return;
    }
    if (values.pass !== values.confPass) {
      setErrorMsg("Confirm password is not matching with password.");
      return;
    }

    setErrorMsg("");

    setSubmitButtonDisabled(true);

    createUserWithEmailAndPassword(auth, values.email, values.pass)
      .then(async (res) => {
        setSubmitButtonDisabled(false);
        const user = res.user;
        console.log(user)
        await updateProfile(user, {
          displayName: values.name,
        });
        axios.post(
          `http://localhost:8000/api/users/`,
          {
            title: values.email,
            version:"0",
            content: "Hey there!"
          }
        )
        navigate("/");
      })
      .catch((err) => {
        setSubmitButtonDisabled(false);
        setErrorMsg(err.message);
      });
  };

  return (
    <div className="auth-wrapper">
      <p className="heading">Signup</p>

      <input
        label="Name"
        placeholder="Enter your name"
        value={values.name}
        onChange={(event) =>
          setValues((prev) => ({ ...prev, name: event.target.value }))
        }
      />
      <input
        label="Email"
        value={values.email}
        placeholder="Enter email address"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, email: event.target.value }))
        }
      />
      <input
        label="Password"
        type="password"
        value={values.pass}
        placeholder="Enter password"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, pass: event.target.value }))
        }
      />

      <input
        label="Password"
        type="password"
        value={values.confPass}
        placeholder="Confirm password"
        onChange={(event) =>
          setValues((prev) => ({ ...prev, confPass: event.target.value }))
        }
      />

      <div className="auth-footer">
        <b className="error">{errorMsg}</b>
        <button className="application-button" onClick={e=>handleSubmission(e)} disabled={submitButtonDisabled}>
          Signup
        </button>
        <p>
          Already have an account?{" "}
          <span>
            <Link to="/auth/login">Login</Link>
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;