import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Img from '../../assets/doc1.jpg'
import { getToken } from '../../services/LocalStorageService'
import classes from './DoctorProfile.module.css'

const DoctorProfile = () => {
    const access_token = getToken()
    const api = 'http://127.0.0.1:8000/api/patient'
    const token = access_token.access_token

    const navigate = useNavigate('/')

    const { id } = useParams()
    const [doctor, setDoctor] = useState({})
    const [schedules, setSchedules] = useState({})
    const [user, setUser] = useState({})

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch(`${api}/doctor-profile/${id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await response.json()
            setUser(data.user)
            setDoctor(data.profile)
        }

        const fetchSchedule = async () => {
            const response = await fetch(`${api}/doctor-schedule/?did=${id}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })
            const data = await response.json()
            setSchedules(data)
        }
        try {
            fetchProfile()
            fetchSchedule()
        } catch (e) {}
    }, [token, doctor, id])

    let data = Array.from(schedules)

    return (
        <div className={classes.Container}>
            <div className={classes.header}>
                <div>
                    <div className={classes.headLeftWrapper}>
                        <div className={classes.profilePic}>
                            <img className={classes.img} src={Img} alt="" />
                        </div>
                        <h2>Dr. {user.name}</h2>
                        <p>A-{doctor.bmdc}</p>
                        <p>{doctor.qualification}</p>
                        <p>{doctor.speciality}</p>
                    </div>
                </div>
            </div>

            <div className={classes.tableContainer}>
                <h2>Schedules</h2>
                <table>
                    {data.length === 0 ? (
                        <h3>No Schdule Added</h3>
                    ) : (
                        <thead>
                            <tr>
                                <th>Day</th>
                                <th>Start Time</th>
                                <th>End Time</th>
                                <th>Status</th>
                                <th>Consultency duration</th>
                                <th>Book</th>
                            </tr>
                        </thead>
                    )}

                    <tbody>
                        {data.lenght === 0 ? (
                            'No Schedule Added'
                        ) : (
                            <>
                                {data.map((schedule, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{schedule.schedule_day}</td>
                                            <td>{schedule.start_time}</td>
                                            <td>{schedule.end_time}</td>
                                            <td
                                                className={
                                                    schedule.schedule_status ? `${classes.yes}` : `${classes.no}`
                                                }>
                                                {schedule.schedule_status ? 'Active' : 'Not Active'}
                                            </td>
                                            <td>{schedule.avg_consulting_time}</td>
                                            <td className={classes.viewButton}>
                                                <button
                                                    onClick={() => {
                                                        navigate(`/book-appointment/${schedule.schedule_day}`, {
                                                            state: schedule,
                                                        })
                                                    }}>
                                                    Book Appointment
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default DoctorProfile
