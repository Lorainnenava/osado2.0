import React from 'react'

export const TablaMoviCuenta = (props) => {
    return (
        <div>
        {/*  ========================INICIA TABLA MOVIMIENTO===================================*/}
        {props.ventanaMovimiento ? (
            <section className="tablaMovimientoCuenta">
            <table className="movimientoCuenta">
                <thead>
                <tr>
                    <td className="saldo"></td>
                    <td className="saldo"></td>
                    <td className="saldo"></td>
                    <td className="saldo"></td>
                    <td className="saldo"></td>
                    <td className="saldo"></td>
                    <td className="saldo"></td>
                    <td className="saldo">
                    <b>SALDO ANTERIOR: ...</b>
                    </td>
                    <td className="saldo">{props.saldoAnterior}</td>
                </tr>
                <tr>
                    <th>DOC</th>
                    <th>TIPO DOC</th>
                    <th>FECHA</th>
                    <th>ID CUENTA</th>
                    <th>CEDULA</th>
                    <th>NOMBRE CUENTA</th>
                    <th>DETALLES</th>
                    <th>DEBITO</th>
                    <th>CREDITO</th>
                </tr>
                </thead>
                <tbody>
                {props.arrayMovimiento.map((movimiento, i) => (
                    <tr key={i}>
                    <td>{movimiento.doc}</td>
                    <td>{movimiento.tipoDoc}</td>
                    <td>{movimiento.fecha}</td>
                    <td>{movimiento.id}</td>
                    <td>{movimiento.cedula}</td>
                    <td>{movimiento.cuenta}</td>
                    <td>{movimiento.detalles}</td>
                    <td>{movimiento.debito}</td>
                    <td>{movimiento.credito}</td>
                    </tr>
                ))}
                <tr>
                    <td className="totales"></td>
                    <td className="totales"></td>
                    <td className="totales"></td>
                    <td className="totales"></td>
                    <td className="totales"></td>
                    <td className="totales"></td>
                    <td className="totales">
                    <b>{"Totales: ........"}</b>
                    </td>
                    <td className="totales">
                    <b>{props.movimientoDebito}</b>
                    </td>
                    <td className="totales">
                    <b>{props.movimientoCredito}</b>
                    </td>
                </tr>
                <tr>
                    <td className="saldo"></td>
                    <td className="saldo"></td>
                    <td className="saldo"></td>
                    <td className="saldo"></td>
                    <td className="saldo"></td>
                    <td className="saldo"></td>
                    <td className="saldo"></td>
                    <td className="saldo">
                    <b>SALDO ACTUAL: ...</b>
                    </td>
                    <td className="saldo">{props.saldoActual}</td>
                </tr>
                </tbody>
            </table>
            </section>
        ) : null}
        </div>
    );
}
export default TablaMoviCuenta;