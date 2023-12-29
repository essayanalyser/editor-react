import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useUserAuth } from "../../../context/UserAuthContext";

import removeFirebasePrefix from './../../../utility/removeFirebasePrefix'

import GoogleButton from "./../GoogleButton";

function Signup() {
	const navigate = useNavigate();

	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		passwordConfirm: "",
	});

	const [errorMsg, setErrorMsg] = useState("");
	const [submitButtonDisabled, setSubmitButtonDisabled] = useState(false);

	const { signUp, googleSignIn } = useUserAuth()

	const handleGoogleSignIn = async (e) => {
		e.preventDefault()

		try {
			await googleSignIn()
			navigate("/")
		} catch (err) {
			setErrorMsg(removeFirebasePrefix(err.message))
			setSubmitButtonDisabled(false)
		}
	}

	const handleSubmission = async (e) => {
		e.preventDefault();

		if (!values.name || !values.email || !values.password) {
			setErrorMsg("Fill all fields");
			return;
		}
		if (values.password !== values.passwordConfirm) {
			setErrorMsg("Confirm password is not matching with password.");
			return;
		}

		setErrorMsg("");
		setSubmitButtonDisabled(true);

		try {
			await signUp(values.name, values.email, values.password)
			navigate("/")
		} catch (err) {
			setErrorMsg(removeFirebasePrefix(err.message))
			setSubmitButtonDisabled(false);
		}
	};

	return (
		<div className="auth-wrapper">
			<div className="auth-cards">
				<div className="flex flex-wrap items-start">
					<p className="heading">Welcome</p>
				</div>

				<form onSubmit={handleSubmission} className="auth-form flex flex-col gap-3">
					<input
						label="Name"
						placeholder="Enter your name"
						value={values.name}
						autoFocus
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
						value={values.password}
						placeholder="Enter password"
						onChange={(event) =>
							setValues((prev) => ({ ...prev, password: event.target.value }))
						}
					/>

					<input
						label="Password"
						type="password"
						value={values.passwordConfirm}
						placeholder="Confirm password"
						onChange={(event) =>
							setValues((prev) => ({ ...prev, passwordConfirm: event.target.value }))
						}
					/>

					<b className="error">{errorMsg}</b>
					<button className="application-button auth-btn mt-1" onClick={e => handleSubmission(e)} disabled={submitButtonDisabled}>
						Signup
					</button>

					<hr className="my-4" />
					<GoogleButton className="m-auto mb-2" onClick={handleGoogleSignIn} />
				</form>
			</div>

			<div className="auth-cards">
				<p>
					Already have an account?{" "}
					<span className="underline">
						<Link to="/auth/login">Login</Link>
					</span>
				</p>
			</div>
		</div>
	);
}

export default Signup;