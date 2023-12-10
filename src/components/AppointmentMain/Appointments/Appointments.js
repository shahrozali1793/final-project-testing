import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getToken } from '../../../services/LocalStorageService'
import classes from './Appointments.module.css'

const Appointments = () => {
    const { access_token } = getToken()
    const api = 'http://127.0.0.1:8000/api/patient'
    const navigate = useNavigate('/')

    const [appointments, setAppointments] = useState({})

    useEffect(() => {
        const fetchAppointments = async () => {
            const response = await fetch(`${api}/appointment-list-user/`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            })
            const data = await response.json()
            setAppointments(data)
        }

        try {
            fetchAppointments()
        } catch (e) {}
    }, [api, access_token])
    let data = Array.from(appointments)

    return (
        <div className={classes.tableContainer}>
            <h2>My appointments</h2>
            <table>
                <thead>
                    <tr>
                        <th>Appointment ID</th>
                        <th>Date</th>
                        <th>Schedule</th>
                        <th>Reason for appointment</th>
                        <th>Apointment</th>
                        <th>Payment</th>
                        <th>Appointment Status</th>
                        <th>Details</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((appointment, index) => {
                        return (
                            <tr key={index}>
                                <td>{appointment.appointment_id}</td>
                                <td>{appointment.appointment_date}</td>
                                <td>{appointment.schedule_id}</td>
                                <td>{appointment.reason}</td>
                                <td className={appointment.appointment_status ? `${classes.yes}` : `${classes.no}`}>
                                    {appointment.appointment_status ? 'Confirmed' : 'Not Confirmed'}
                                </td>
                                <td className={appointment.payment ? `${classes.yes}` : `${classes.no}`}>
                                    {appointment.payment ? 'Confirmed' : 'Not Confirmed'}
                                </td>
                                <td className={appointment.is_completed ? `${classes.yes}` : `${classes.no}`}>
                                    {appointment.is_completed ? 'Completed' : 'Incomplete'}
                                </td>
                                <td className={classes.viewButton}>
                                    <button
                                        onClick={() => {
                                            navigate(`/appointment-details/${appointment.appointment_id}`, {
                                                state: appointment,
                                            })
                                        }}>
                                        View details
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Appointments
