import React from 'react';

function Rights(props) {
    return (
            <td>
                {props.rights.map((right,index)=>{
                    return <div key={index}>{right.label_right}</div>
                })}
            </td>
        );
    }

export default Rights;