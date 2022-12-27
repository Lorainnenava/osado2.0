import React,{useState} from 'react'

export const MoviGene = ({arrayIngreso}) => {

    const [movimientoGeneral, setMovimientoGeneral] = useState(false); //VENTANA MOVIMIENTO GENERAL
    const [arrayMovimientoGeneral, setArrayMovimientoGeneral] = useState([]); //ARRAY MOVIMIENTO GENERAL

    /*  ========================FUNCION MOVIMIENTO GENERAL===================================*/
    const verMovimientoGeneral = (e) => {
        e.preventDefault();
        let arrayTemporal = arrayIngreso.filter(
        (item) =>
            item.fecha >= e.target.fechaInicialMovimiento.value &&
            item.fecha <= e.target.fechaFinalMovimiento.value
        );
        setArrayMovimientoGeneral(arrayTemporal);
        if (movimientoGeneral) {
        setMovimientoGeneral(false);
        } else {
        setMovimientoGeneral(true);
        }
    };

    return (
        <>
            {/*  ========================FORMULARIO MOVIMIENTO GENERAL===================================*/}
            <section className='container4'>
                <section className='titulomovi'>
                <h1>MOVIMIENTO</h1>
                </section>
            <form className="movimientoGeneral" onSubmit={verMovimientoGeneral}>
                <label>
                FECHA DE INICIO
                <input type="date" name="fechaInicialMovimiento"></input>
                </label>
                <label>
                FECHA FINAL
                <input type="date" name="fechaFinalMovimiento"></input>
                </label>
                <button className="btnMovi" value={movimientoGeneral}>
                VER MOVIMIENTO
                </button>
            </form>
            </section>
            {/*  ========================INICIA TABLA MOVIMIENTO GENERAL===================================*/}
            {movimientoGeneral ? (
            <section className="tablaMovimientoGeneral">
                <table className="movimientoGene">
                <thead>
                    <tr>
                    <th>DOC</th>
                    <th>TIPO DOC</th>
                    <th>FECHA</th>
                    <th>ID CUENTA</th>
                    <th>CEDULA</th>
                    <th>CUENTA</th>
                    <th>DETALLES</th>
                    <th>DEBITO</th>
                    <th>CREDITO</th>
                    </tr>
                </thead>
                {arrayMovimientoGeneral.map((general, i) => (
                    <tr key={i}>
                    <td>{general.doc} </td>
                    <td>{general.tipoDoc} </td>
                    <td>{general.fecha} </td>
                    <td>{general.id} </td>
                    <td>{general.cedula}</td>
                    <td>{general.cuenta} </td>
                    <td>{general.detalles} </td>
                    <td>{general.debito} </td>
                    <td>{general.credito} </td>
                    </tr>
                ))}
                </table>
            </section>
            ) : null}
        </>
    );
}
export default MoviGene;