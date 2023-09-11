import { useEffect } from 'react'
import { Outlet, useNavigate, Link } from 'react-router-dom'

import "./../../stylesheets/auth.css";

const AuthLayout = () => {
	const navigate = useNavigate()

	useEffect(() => {
		if (window.location.pathname === '/auth') {
			if (JSON.parse(localStorage.getItem('isLoggedIn'))) {
				navigate('user')
			}

			else {
				navigate('signup');
			}

			return;
		}

		if (JSON.parse(localStorage.getItem('isLoggedIn'))) {
			if (
				(window.location.pathname === '/auth/login') ||
				(window.location.pathname === '/auth/signup') ||
				(window.location.pathname === '/auth/reset')
			) {
				navigate('/auth')
			}
		}

		else if (window.location.pathname === '/auth/user') {
			navigate('/auth')
		}
	})

	return (
		<div className='auth-container'>
			<Link to='/'>
				<button className='back-button application-button'>Go back</button>
			</Link>

			<Outlet />
		</div>
	)
}

export default AuthLayout