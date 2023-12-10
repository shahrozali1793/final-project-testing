import { useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { getToken } from '../../services/LocalStorageService'
import { useAppointmentBookMutation } from '../../services/patientAuthApi'
import classes from './AppointmentBook.module.css'

const AppointmentBook = () => {
    const { day } = useParams()
    const location = useLocation()
    const [msg, setMsg] = useState('')

    const { access_token } = getToken()
    const [appointmentBook] = useAppointmentBookMutation()
    const handleBook = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData = {
            schedule_id: data.get('schedule_id'),
            appointment_date: data.get('appointment_date'),
            doctor_id: data.get('doctor_id'),
            reason: data.get('reason'),
        }
        const res = await appointmentBook({ actualData, access_token })
        if (res.data) {
            setMsg(res.data.message)
        }
    }
    return (
        <div className={classes.Container}>
            <div className={classes.formContainer}>
                <form onSubmit={handleBook}>
                    <div className={classes.sectionHeader}>Appointment for {day}</div>
                    <div className={classes.formWrap}>
                        <div className={classes.formGrid}>
                            <label>
                                <input
                                    type="date"
                                    id="appointment_date"
                                    name="appointment_date"
                                    placeholder="Enter appointment date"
                                    required
                                />
                            </label>

                            <label>
                                <input
                                    type="text"
                                    id="schedule_id"
                                    name="schedule_id"
                                    readOnly="readOnly"
                                    value={location.state.schedule_id}
                                    required
                                />
                            </label>

                            <label>
                                <input
                                    type="text"
                                    id="doctor_id"
                                    name="doctor_id"
                                    readOnly="readOnly"
                                    value={location.state.did}
                                    required
                                />
                            </label>

                            <label>
                                <input type="text" id="reason" name="reason" placeholder="reason for the appointment" />
                            </label>
                        </div>
                    </div>
                    <button className={classes.Button}>Confirm Appointment</button>
                    <div className={classes.alertMessage}>{msg && <span>{msg}</span>}</div>
                </form>
            </div>
        </div>
    )
}

export default AppointmentBook
