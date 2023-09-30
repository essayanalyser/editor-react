import { useEffect, useState } from 'react';
import { Editor, Statistics, AuthLayout, Login, Signup, UserPage, ResetPass } from './components'

import "./stylesheets/home.css";
import { Route as Link, Routes, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/Firebase';
import axios from 'axios';

function App() {
	const navigate = useNavigate();
	const [authUser, setAuthUser] = useState(null);

	const handleAnalyseButtonClicked = (typedData) => {
		// TODO: Complete this function when linked with backend
		if (!authUser) {
			navigate('/auth')
		} else {
			// post data to backend
			console.log(authUser)
			// preventDefault();
			axios
			 .post("http://localhost:8000/api/users/", {
				title:authUser.email,
				content: typedData,
			 })
			 .then((res)=>{
				console.log(res.data);
			 })
			 .catch((err)=>{})
		}
	}

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, user => {
			if (user) {
				setAuthUser(user)
				localStorage.setItem('isLoggedIn', true)
			} else {
				setAuthUser(null)
				localStorage.setItem('isLoggedIn', false)
			}
		})

		return unsubscribe;
	}, [])


	return (
    <Routes>
      <Link
        path="/"
        element={
          <div id="home">
            <Editor
              handleAnalyseButtonClicked={handleAnalyseButtonClicked}
              authUser={authUser}
            />
            <Statistics authUser={authUser} />
          </div>
        }
      />

      <Link exact path="auth" element={<AuthLayout authUser={authUser} />}>
        <Link path="login" element={<Login />} />
        <Link path="signup" element={<Signup />} />
        <Link path="user" element={<UserPage authUser={authUser} />} />
        <Link path="reset" element={<ResetPass />} />
      </Link>
    </Routes>
  );
}

export default App;
