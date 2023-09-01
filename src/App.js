import { useEffect, useState } from 'react';
import { Editor, Statistics, AuthLayout, Login, Signup, UserPage, ResetPass } from './components'

import "./stylesheets/home.css";
import { Route as Link, Routes, useNavigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/Firebase';

function App() {
	const navigate = useNavigate();
	const [authUser, setAuthUser] = useState(null);

	const handleAnalyseButtonClicked = (typedData) => {
		// TODO: Complete this function when linked with backend
		if (!authUser) {
			navigate('/auth')
		} else {
			// fetchFromBackEnd(typedData);
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
			<Link path="/" element={
				<div id="home">
					<Editor handleAnalyseButtonClicked={handleAnalyseButtonClicked} authUser={authUser} />
					<Statistics />
				</div>
			} />

			<Link exact path='auth' 		element={<AuthLayout authUser={authUser} />}>
				<Link 		path='login' 	element={<Login />} />
				<Link 		path='signup' 	element={<Signup />} />
				<Link 		path='user' 	element={<UserPage authUser={authUser} />} />
				<Link 		path='reset' 	element={<ResetPass />} />
			</Link>

		</Routes>
	);
}

export default App;
