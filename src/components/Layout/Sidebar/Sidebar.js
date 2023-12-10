import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import pic from '../../../assets/pro.png'
import { unsetUserToken } from '../../../features/authSlice'
import { removeToken, getToken } from '../../../services/LocalStorageService'
import { useProfileAccessQuery } from '../../../services/patientAuthApi'
import classes from './Sidebar.module.css'

const Sidebar = () => {
    const navigate = useNavigate('/')
    const location = useLocation()
    const [userData, setUserdata] = useState({})
    const [profileData, setProfileData] = useState({})
    const { access_token } = getToken()
    const { data, isSuccess } = useProfileAccessQuery(access_token)
    const dispatch = useDispatch()

    useEffect(() => {
        if (data && isSuccess) {
            setUserdata(data.user)
            setProfileData(data.profile)
        }
    }, [data, isSuccess])

    const handleLogout = () => {
        dispatch(unsetUserToken({ access_token: null }))
        removeToken()
        navigate('/')
    }

    return (
        <div className={classes.Bar}>
            <div className={classes.profilecard}>
                <h2>DoctorKhana</h2>
                <div className={classes.Content}>
                    <div className={classes.profileImg}>
                        <img src={pic} alt="pp" />
                    </div>

                    <div className={classes.Intro}>
                        <div className={classes.Name}>{userData.phone}</div>
                        <div className={classes.Designation}>{userData.role_id}</div>
                    </div>
                </div>
            </div>

            <ul className={classes.Menus}>
                <li className={location.pathname === '/dashboard' ? classes.active : ''}>
                    <Link to="/dashboard">Find Doctors</Link>
                </li>
                <li className={location.pathname === '/appointment' ? classes.active : ''}>
                    <Link to="/appointment">Appointments</Link>
                </li>
                <li className={location.pathname === '/' ? classes.active : ''}>
                    <Link to="/auth">Settings</Link>
                </li>
            </ul>

            <div className={classes.Logout}>
                <button onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} />
                    <span>Logout</span>
                </button>
            </div>
        </div>
    )
}
export default Sidebar
