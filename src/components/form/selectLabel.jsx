import React from 'react';

function SelectLabel({ label, value, change, name,options, multiple, defaultOption, sentenceOption}) {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>

            <select onChange={change} value={value} name={name} className="form-select" multiple={!!multiple}>
                {defaultOption ? <option value=''>{sentenceOption}</option> : ''}
                {options.map((option,index)=>{
                    return <option key={index} value={option.id}>{option.name}</option>
                })}
            </select>
        </div>
    );
}

export default SelectLabel;