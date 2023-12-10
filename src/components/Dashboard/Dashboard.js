import { useState } from 'react'
import { useDoctorSearchMutation } from '../../services/patientAuthApi'
import classes from './Dashboard.module.css'
import DoctorCard from './DoctorCard/DoctorCard'

const Dashboard = () => {
    const [doctor, setDoctor] = useState([])
    const [msg, setMsg] = useState('')
    const [doctorSearch, { isLoading }] = useDoctorSearchMutation()

    const handleSearch = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget)
        const actualData = {
            district: data.get('district'),
            speciality: data.get('speciality'),
        }
        const res = await doctorSearch(actualData)
        if (res.data) {
            setDoctor(res.data.profile)
            setMsg(true)
        }
    }

    return (
        <div className={classes.Container}>
            <div className={classes.formContainer}>
                <form onSubmit={handleSearch}>
                    <div className={classes.sectionHeader}>Find your doctor</div>
                    <div className={classes.formWrap}>
                        <div className={classes.formGrid}>
                            <label>
                                <input
                                    type="text"
                                    id="district"
                                    name="district"
                                    placeholder="Enter the District"
                                    required
                                />
                            </label>
                            <label>
                                <input
                                    type="text"
                                    id="speciality"
                                    name="speciality"
                                    placeholder="Enter the speciality"
                                    required
                                />
                            </label>
                        </div>
                    </div>
                    <button className={classes.Button}>Search</button>
                    <div className={classes.alertMessage}>{msg && <span>{msg}</span>}</div>
                </form>
            </div>
            <div className={classes.findDoctor}>
                {doctor.map((doc, index) => {
                    return (
                        <div key={index} className={classes.Entry}>
                            <DoctorCard doctor={doc} />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Dashboard
