import React from 'react';

function SelectLabel({ label, value, change, name,options, multiple}) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select onChange={change} value={value} name={name} className="form-select" multiple={!!multiple}>
                {options.map((option,index)=>{
                    return <option key={index} value={option.id}>{option.name}</option>
                })}
            </select>
        </div>
    );
}

export default SelectLabel;