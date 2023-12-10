import React from 'react'
import classes from '../Dashboard.module.css'
import DoctorCard from '../DoctorCard/DoctorCard'

const FindDoctor = ({ doc }) => {
    let data = Array.from(doc)

    return (
        <div className={classes.findDoctor}>
            {data.map((doc, index) => {
                return (
                    <div key={index} className={classes.Entry}>
                        <DoctorCard i={index} speciality={doc.speciality} qualification={doc.qualification} />
                    </div>
                )
            })}
        </div>
    )
}

export default FindDoctor
