import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { unsetUserToken } from '../../../features/authSlice'
import { removeToken } from '../../../services/LocalStorageService'
import classes from './Nav.module.css'

const Nav = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate('/')

    const handleLogout = () => {
        dispatch(unsetUserToken({ access_token: null }))
        removeToken()
        navigate('/')
    }
    return (
        <div className={classes.TransparentNav}>
            <div className="container">
                <h4>
                    <span>Doctor</span>Bhai
                </h4>
                <ul>
                    <li>
                        <Link to="/dashboard">Back to Dashboard</Link>
                    </li>

                    <li>
                        <span onClick={() => handleLogout()}>
                            <FontAwesomeIcon icon={faSignOutAlt} style={{ fontSize: '14px', color: 'red' }} />
                        </span>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Nav
