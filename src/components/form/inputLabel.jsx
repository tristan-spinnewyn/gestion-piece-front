import React from 'react'

export default function InputLabel({type, label, placeholder, value, change, name}) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <input onChange={change} value={value} name={name} type={type} className="form-control" id={name} placeholder={placeholder} />
        </div>
    )
}
