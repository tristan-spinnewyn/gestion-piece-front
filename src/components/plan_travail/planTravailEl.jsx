import React from 'react';
import {Link} from "react-router-dom";

function PlanTravailEl(props) {
    return (
        <tr>
            <td>{props.data.label_travail}</td>
            <td>
                <Link to={`/plan_travail/${props.data.id}`} className="btn btn-primary">Modifier</Link>
            </td>
        </tr>
    );
}

export default PlanTravailEl;