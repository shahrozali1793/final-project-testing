import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserToken } from '../../features/authSlice'
import { storePhone } from '../../services/LocalStorageService'
import { getToken } from '../../services/LocalStorageService'
import { useLoginPatientMutation } from '../../services/patientAuthApi'
import classes from './LogReg.module.css'

const LogReg = () => {
    const navigate = useNavigate('/')
    const [msg, setMsg] = useState('')
    const [patientAccess, { isLoading }] = useLoginPatientMutation()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData = {
            phone: data.get('phone'),
        }
        const res = await patientAccess(actualData)
        if (res.data) {
            storePhone(res.data.phone)
            navigate('/otp')
        } else {
            setMsg('Something Wrong happened')
        }
    }

    let { access_token } = getToken()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(setUserToken({ access_token: access_token }))
    }, [access_token, dispatch])

    return (
        <div className={classes.Form}>
            <h1>Welcome to DoctorKhana</h1>

            <div className={classes.Cover}></div>
            <div className={classes.formContainer}>
                <form onSubmit={handleSubmit}>
                    <div className={classes.sectionHeader}>Get an appointment</div>
                    <div className={classes.formWrap}>
                        <div className={classes.formGrid}>
                            <label>
                                <input
                                    type="text"
                                    name="phone"
                                    id="phone"
                                    placeholder="Enter Your Phone Number"
                                    required
                                />
                            </label>
                        </div>
                    </div>
                    <button className={classes.Button}>Send me OTP</button>
                    <div className={classes.alertMessage}>{msg && <span>{msg}</span>}</div>
                </form>
            </div>
        </div>
    )
}

export default LogReg
