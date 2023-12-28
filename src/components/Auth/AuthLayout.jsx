import { useEffect } from 'react'
import { Outlet, useNavigate, Link } from 'react-router-dom'

import "./../../stylesheets/auth.css";

import { useSelector } from 'react-redux';

const AuthLayout = () => {
	const navigate = useNavigate()

	const authUser = useSelector(state => state.user.userInfo)

	const normalizedPath = window.location.pathname.replace(/\/+$/, '');
	const authPaths = ['/auth/login', '/auth/signup', '/auth/reset'].map(path =>
		path.replace(/\/+$/, '')
	);

	useEffect(() => {
		if (normalizedPath === '/auth') {
			if (authUser) {
				return navigate('user');
			} else {
				return navigate('signup');
			}
		}

		if (authUser) {
			if (authPaths.includes(normalizedPath)) {
				navigate('/auth');
			}
		} else if (normalizedPath === '/auth/user') {
			navigate('/auth');
		}

	})

	return (
		<div className='auth-container'>
			<Link to='/'>
				<button className='back-button'>Go back</button>
			</Link>

			<Outlet context={[authUser]} />
		</div>
	)
}

export default AuthLayout