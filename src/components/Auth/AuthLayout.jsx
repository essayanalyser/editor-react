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