import React from 'react'
import { Link } from 'react-router-dom'

export default function DropdownLi(props) {
    return (
        <li>
            <Link className="dropdown-item" to={props.url}>{props.nom}</Link>
        </li>
    )
}
