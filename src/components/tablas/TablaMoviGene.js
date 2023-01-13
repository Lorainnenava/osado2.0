import React,{useEffect, useState} from 'react'

export const TablaMoviGene = (props) => {

    const [creditoGeneral, setCreditoGeneral]= useState(0)
    const [debitoGeneral, setDebitoGeneral] = useState(0);
    /*  ========================TOTAL DE MOVIMIENTO DE CUENTA===================================*/
    useEffect(() => {
        const sumarMovimiento = () => {
        let sumaDebito = 0;
        let sumaCredito = 0;
        for (let i = 0; i < props.arrayMovimientoGeneral.length; i++) {
            sumaDebito =
            sumaDebito + parseFloat(props.arrayMovimientoGeneral[i].debito);
            sumaCredito =
            sumaCredito + parseFloat(props.arrayMovimientoGeneral[i].credito);
        }
        setCreditoGeneral(parseFloat(sumaCredito));
        setDebitoGeneral(parseFloat(sumaDebito));
        };
        sumarMovimiento();
    }, [props.arrayMovimientoGeneral]);


    return (
      <div>
        {/*  ========================INICIA TABLA MOVIMIENTO GENERAL===================================*/}
        {props.movimientoGeneral ? (
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
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {props.arrayMovimientoGeneral.map((general, i) => (
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
                    <td>
                      <button
                        onClick={() => {
                          props.editar(general);
                        }}
                      >
                        editar
                      </button>
                    </td>
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
                    <b>{debitoGeneral}</b>
                  </td>
                  <td className="totales">
                    <b>{creditoGeneral}</b>
                  </td>
                  <td className="totales"></td>
                </tr>
              </tbody>
            </table>
          </section>
        ) : null}
      </div>
    );
}
