import { React, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../services/LocalStorageService'
import classes from './AppointmentDetails.module.css'

const AppointmentDetails = () => {
    const location = useLocation()
    const { access_token } = getToken()
    const api = 'http://127.0.0.1:8000/api/patient'
    const id = location.state.doctor_id
    const scheduleId = location.state.schedule_id
    const navigate = useNavigate('/')

    const [doctor, setDoctor] = useState('')
    const [day, setDay] = useState('')
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')

    useEffect(() => {
        const fetchDoctor = async () => {
            const response = await fetch(`${api}/doctor-profile/${id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            })
            const data = await response.json()
            setDoctor(data.user.name)
        }

        const fetchSchedule = async () => {
            const response = await fetch(`${api}/doctor-schedule-details/?schedule_id=${scheduleId}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            })
            const data = await response.json()
            setStart(data[0].start_time)
            setEnd(data[0].end_time)
            setDay(data[0].schedule_day)
        }

        try {
            fetchDoctor()
            fetchSchedule()
        } catch (e) {}
    }, [api, access_token, id, scheduleId])

    return (
        <div className={classes.Container}>
            <div className={classes.detailsContainer}>
                <h3 className={classes.Title}>Appointment Details</h3>
                <p>
                    <span className={classes.key}>Appointment ID </span>
                    <span className={classes.value}>{location.state.appointment_id}</span>
                </p>
                <p>
                    <span className={classes.key}>Date: </span>
                    <span className={classes.value}>{location.state.appointment_date}</span>
                </p>
                <p>
                    <span className={classes.key}>Day </span>
                    <span className={classes.value}>{day}</span>
                </p>

                <p>
                    <span className={classes.key}>Time </span>
                    <span className={classes.value}>
                        {start} - {end}
                    </span>
                </p>

                <p>
                    <span className={classes.key}>Appointed Doctor </span>
                    <span>{doctor}</span>
                </p>

                <p>
                    <span className={classes.key}>Reason for the appointment</span>
                    <span className={classes.value}>{location.state.reason}</span>
                </p>
                <p>
                    <span className={classes.key}>Appointment confirmation status</span>
                    <span className={location.state.appointment_status ? `${classes.yes}` : `${classes.no}`}>
                        {location.state.appointment_status ? 'Confirmed' : 'Not Confirmed'}
                    </span>
                </p>

                <p>
                    <span className={classes.key}>Appointment payment status</span>
                    <span className={location.state.payment_status ? `${classes.yes}` : `${classes.no}`}>
                        {location.state.payment_status ? 'Done' : 'Pending'}
                    </span>
                </p>

                <p>
                    <span className={classes.key}>Appointment completion status</span>
                    <span className={location.state.is_completed ? `${classes.yes}` : `${classes.no}`}>
                        {location.state.is_completed ? 'Completed' : 'Incomplete'}
                    </span>
                </p>

                <p>
                    <span className={classes.key}>Doctor Comment</span>
                    <span className={classes.value}>
                        {location.state.doctor_comment === null ? 'No comment' : `${location.state.doctor_comment}`}
                    </span>
                </p>

                <div className={classes.Menu}>
                    <button
                        onClick={() => {
                            navigate('/appointment')
                        }}>
                        Back to Appointment
                    </button>
                    <button
                        onClick={() => {
                            navigate('/')
                        }}>
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AppointmentDetails
