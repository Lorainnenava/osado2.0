import React from 'react'

export const TablaBalance = (props) => {
    return (
        <>
        {/*  ========================INICIA TABLA BALANCE===================================*/}
        {props.ventanaBalance ? (
            <section className="tablaBalance">
            <h3>BALANCE</h3>
            <table className="balance">
                <thead>
                <tr>
                    <th>ID CUENTA</th>
                    <th>NOMBRE CUENTA</th>
                    <th>DEBITO</th>
                    <th>CREDITO</th>
                </tr>
                </thead>
                <tbody>
                {props.arrayBalance.map((balance, i) => (
                    <tr key={i}>
                    <td>{balance.id}</td>
                    <td>{balance.cuenta}</td>
                    <td>{balance.debito}</td>
                    <td>{balance.credito}</td>
                    </tr>
                ))}
                <tr>
                    <td className="totales"></td>
                    <td className="totales">
                    <b>{"Totales: ........"}</b>
                    </td>
                    <td className="totales">
                    <b>{props.balanceDebito}</b>
                    </td>
                    <td className="totales">
                    <b>{props.balanceCredito}</b>
                    </td>
                </tr>
                </tbody>
            </table>
            </section>
        ) : null}
        </>
    );
}

export default TablaBalance;