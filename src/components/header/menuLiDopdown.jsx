import React from 'react'
import DropdownLi from './dropdownLi'

export default function MenuLiDropdown(props) {

    return (
        <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id={"navbarDropdownMenuLink"+props.id} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {props.nom}</a>
            <ul className="dropdown-menu" aria-labelledby={"navbarDropdownMenuLink"+props.id}>
                {props.sousMenu.map((linkData,index) => <DropdownLi key={index} nom={linkData.nom} url={linkData.url} />)}
            </ul>
        </li>
    )
}
