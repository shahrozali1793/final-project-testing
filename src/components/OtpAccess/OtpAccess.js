import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setUserToken } from '../../features/authSlice'
import { getPhone, removePhone, storeToken, getToken } from '../../services/LocalStorageService'
import { useOtpCheckMutation } from '../../services/patientAuthApi'
import classes from './OtpAccess.module.css'

const OtpAccess = () => {
    const navigate = useNavigate('/')
    const [msg, setMsg] = useState('')
    const [otpChecking, { isLoading }] = useOtpCheckMutation()
    const dispatch = useDispatch()
    let phone = getPhone()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData = {
            phone: phone.phone,
            otp: data.get('otp'),
        }
        const res = await otpChecking(actualData)
        if (res.error) {
            setMsg(res.error.data.errors)
        }
        if (res.data) {
            removePhone()
            storeToken(res.data.token)
            let { access_token } = getToken()
            dispatch(setUserToken({ access_token: access_token }))
            navigate('/dashboard')
        }
    }

    let { access_token } = getToken()

    useEffect(() => {
        dispatch(setUserToken({ access_token: access_token }))
    }, [access_token, dispatch])

    return (
        <div className={classes.Container}>
            <form onSubmit={handleSubmit}>
                <div className={classes.sectionHeader}>OTP has been sent to your Phone Number</div>
                <div className={classes.sectionHeaderPhone}>{phone.phone}</div>
                <div className={classes.formWrap}>
                    <div className={classes.formGrid}>
                        <label>
                            <input type="number" id="otp" name="otp" placeholder="Enter the OTP" required />
                        </label>
                    </div>
                </div>
                <button className={classes.Button}>Submit</button>
                <div className={classes.alertMessage}>{msg && <span>{msg}</span>}</div>
            </form>
        </div>
    )
}

export default OtpAccess
