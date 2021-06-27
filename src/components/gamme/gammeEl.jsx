import React from 'react';
import {Link} from "react-router-dom";

function GammeEl(props) {
    return (
        <tr>
            <td>{props.data.lib_piece}</td>
            <td>{props.data.email}</td>
            <td>
                <Link to={`/gamme/${props.data.idgamme}`} className="btn btn-primary">Modifier</Link>
            </td>
        </tr>
    );
}

export default GammeEl;