/* eslint-disable eqeqeq */
import React,{useState, useEffect} from 'react'
import TablaDocumento from './tablas/TablaDocumento';

export const Documento = ({arrayCuentas, arrayIngreso, setArrayIngreso}) => {

  const [arrayDocumento, setArrayDocumento] = useState([]); //ARRAY FORMULARIO
  const [cuenta, setCuenta] = useState("No hay cuenta"); //VALOR CUENTA
  const [totalDebito, setTotalDebito] = useState(0); //TOTAL DEBITO
  const [totalCredito, setTotalCredito] = useState(0); // TOTAL CREDITO


    /*  ========================FORMULARIO DOCUMENTO===================================*/
    const ingreso = (e) => {
        e.preventDefault();
        let debito = 0;
        let credito = 0;
        if (e.target.debito.value != "") {
        debito = e.target.debito.value;
        }
        if (e.target.credito.value != "") {
        credito = e.target.credito.value;
        }
        setArrayDocumento([
        ...arrayDocumento,
        {
            doc: e.target.doc.value,
            tipoDoc: e.target.tipoDoc.value,
            id: e.target.id.value,
            cedula: e.target.cedula.value,
            cuenta: cuenta,
            detalles: e.target.detalles.value,
            debito: debito,
            credito: credito,
            fecha: e.target.fecha.value,
        },
        ]);
        e.target.reset();
    };

    /*  ========================FUNCION BUSCAR CUENTA===================================*/
    const buscarCuenta = (e) => {
        let arrayTemporal = arrayCuentas.filter(
        (item) => parseFloat(item.id) == parseFloat(e.target.value)
        );
        if (arrayTemporal.length > 0) {
        setCuenta(arrayTemporal[0].nombre);
        } else {
        setCuenta("No hay cuenta");
        }
    };

    /*  ========================FUNCION SUMAR TOTALES EN DOCUMENTO===================================*/
    useEffect(() => {
        const sumarFormulario = () => {
        let sumaDebito = 0;
        let sumaCredito = 0;
        for (let i = 0; i < arrayDocumento.length; i++) {
            sumaDebito = sumaDebito + parseFloat(arrayDocumento[i].debito);
            sumaCredito = sumaCredito + parseFloat(arrayDocumento[i].credito);
        }
        setTotalDebito(parseFloat(sumaDebito));
        setTotalCredito(parseFloat(sumaCredito));
        };
        sumarFormulario();
    }, [arrayDocumento]);

    /*  ========================FUNCION BOTON GUARDAR Y ALAMACENA EN INGRESO===================================*/
    const guardar = () => {
        let array = arrayIngreso;
        for (let i = 0; i < arrayDocumento.length; i++) {
        array.push({
            doc: arrayDocumento[i].doc,
            tipoDoc: arrayDocumento[i].tipoDoc,
            id: arrayDocumento[i].id,
            cedula: arrayDocumento[i].cedula,
            cuenta: arrayDocumento[i].cuenta,
            detalles: arrayDocumento[i].detalles,
            debito: arrayDocumento[i].debito,
            credito: arrayDocumento[i].credito,
            fecha: arrayDocumento[i].fecha,
        });
        }
        setArrayIngreso(array);
        setArrayDocumento([]);
    };

    return (
      <>
        <section className="Container2">
          <section className="tituloIngreso">
            <h1>DOCUMENTO</h1>
          </section>
          <form className="Documento" onSubmit={ingreso}>
            <section className="documento1">
              <label className="labell">
                DOC
                <input
                  type="text"
                  name="doc"
                  placeholder="Ingresa el codigo"
                ></input>
              </label>
              <label>
                TIPO DE DOC
                <input
                  type="text"
                  name="tipoDoc"
                  placeholder="
                ingresa tipo de documento"
                ></input>
              </label>
              <label>
                ID CUENTA
                <input
                  type="text"
                  placeholder="Ingresa el codigo"
                  name="id"
                  onChange={buscarCuenta}
                ></input>
              </label>
            </section>
            <section className="documento2">
              <label>
                CEDULA
                <input
                  type="text"
                  name="cedula"
                  placeholder="ingresa cedula"
                ></input>
              </label>
              <label>
                NOMBRE CUENTA
                <input type="text" value={cuenta} readOnly={true}></input>
              </label>
              <label>
                DETALLES
                <input
                  type="text"
                  name="detalles"
                  placeholder="ingrese detalles"
                ></input>
              </label>
            </section>
            <section className="documento3">
              <label>
                DEBITO
                <input
                  type="text"
                  name="debito"
                  placeholder="Ingresa el debito"
                ></input>
              </label>
              <label>
                CREDITO
                <input
                  type="text"
                  name="credito"
                  placeholder="Ingresa el credito"
                ></input>
              </label>
              <label>
                FECHA
                <input type="date" name="fecha"></input>
              </label>
            </section>
            <section className="btnFormulario">
              <button
                type="submit" className="btnDocumento">
                INGRESAR
              </button>
            </section>
          </form>
        </section>

        <TablaDocumento 
        arrayDocumento={arrayDocumento} 
        totalDebito={totalDebito}
        totalCredito={totalCredito} 
        guardar={guardar} />
      </>
    ); 
}

export default Documento;