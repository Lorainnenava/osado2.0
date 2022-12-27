import React from 'react'
import { Link } from "react-router-dom";
import './Menu.css'

export const Menu = () => {
    return (
        <div className="menu">
            <Link to="./">CUENTAS</Link>
            <Link to="./Documento">DOCUMENTO</Link>
            <Link to="./MoviCuenta">MOVIMIENTO DE CUENTA</Link>
        </div>
    );
}
export default Menu;
