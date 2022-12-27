/* eslint-disable eqeqeq */
import React from "react";

export const TablaDocumento = (props) => {
    return (
        <>
            {/* TABLA FORMULARIO  */}
            <section className="tablaDocumento">
            <table className="documento">
                <thead>
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
                {props.arrayDocumento.map((documento, i) => (
                    <tr key={i}>
                    <td>{documento.doc}</td>
                    <td>{documento.tipoDoc}</td>
                    <td>{documento.fecha}</td>
                    <td>{documento.id}</td>
                    <td>{documento.cedula}</td>
                    <td>{documento.cuenta}</td>
                    <td>{documento.detalles}</td>
                    <td>{documento.debito}</td>
                    <td>{documento.credito}</td>
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
                    <b>{props.totalDebito}</b>
                    </td>
                    <td className="totales">
                    <b>{props.totalCredito}</b>
                    </td>
                </tr>
                </tbody>
            </table>
            {props.totalDebito == props.totalCredito && props.totalCredito > 0 ? (
                <button onClick={props.guardar}>GUARDAR</button>
            ) : null}
            </section>
        </>
    );
};
export default TablaDocumento;