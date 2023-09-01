import { signOut } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from './../../../config/Firebase'

const User = ({ authUser }) => {
    const navigate = useNavigate()

    const [message, setMessage] = useState()

    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('isLoggedIn'))) {
            navigate('/')
        }
    })

    const handleLogout = () => {
        signOut(auth).then(() => {
            setMessage({msg: "Logged Out Successfully!", isErr: false})
            navigate('/')
        }).catch(err => setMessage({ msg: err, isErr: true }))
    }

    return (
        <div className='auth-wrapper'>
            <p>Name: {authUser?.displayName}</p>
            <p>Email: {authUser?.email}</p>

            <b className={`error${!message?.isErr && ' clr-green'}`}>{message}</b>
            <button className="application-button" onClick={handleLogout}>Logout</button>
        </div>
    )
}

export default User