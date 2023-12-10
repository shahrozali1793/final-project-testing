import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import doc1 from '../../../assets/doc1.jpg'
import { getToken } from '../../../services/LocalStorageService'
import classes from './DoctorCard.module.css'

const DoctorCard = ({ doctor }) => {
    const navigate = useNavigate('/')
    const { access_token } = getToken()
    const api = 'http://127.0.0.1:8000/api/patient'

    const [doctorName, setDoctorName] = useState('')

    useEffect(() => {
        const fetchDoctor = async () => {
            const response = await fetch(`${api}/doctor-profile/${doctor.did}`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${access_token}`,
                },
            })
            const data = await response.json()
            setDoctorName(data.user.name)
        }

        try {
            fetchDoctor()
        } catch (e) {}
    }, [api, access_token, doctor.did])

    return (
        <div className={classes.Card}>
            <div className={classes.Photo}>
                <img src={doc1} alt="dp" />
            </div>
            <div className={classes.Name}>
                <span className={classes.head}>{doctorName}</span>
                <span className={classes.tail}>{doctor.qualification}</span>
                <span className={classes.tail}>{doctor.speciality}</span>
            </div>
            <div className={classes.Button}>
                <button
                    onClick={() => {
                        navigate(`/doctor/${doctor.did}`)
                    }}>
                    Book
                </button>
            </div>
        </div>
    )
}

export default DoctorCard
