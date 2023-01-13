/* eslint-disable eqeqeq */
import React, { useState, useEffect } from "react";
import TablaDocumento from "./tablas/TablaDocumento";
import { Alert, Box, Button, TextField } from "@mui/material";
import MoviGene from "./MoviGene";

export const Documento = ({ arrayCuentas, arrayIngreso, setArrayIngreso, arrayDocumento, setArrayDocumento}) => {

  const [cuenta, setCuenta] = useState("No hay cuenta"); //VALOR CUENTA
  const [totalDebito, setTotalDebito] = useState(0); //TOTAL DEBITO
  const [totalCredito, setTotalCredito] = useState(0); // TOTAL CREDITO
  const [alerta, setAlerta] = useState(false);
  const [movimiento, setMovimiento] = useState(false);

  /*  ========================FORMULARIO DOCUMENTO===================================*/
  const ingreso = (e) => {
    e.preventDefault();
    if (
      e.target.doc.value == "" ||
      e.target.tipoDoc.value == "" ||
      e.target.id.value == "" ||
      e.target.cedula.value == "" ||
      e.target.detalles.value == "" ||
      e.target.debito.value == "" ||
      e.target.credito.value == "" ||
      e.target.fecha.value == ""
    ) {
      setTimeout(() => {
        setAlerta(true);
        setTimeout(() => {
          setAlerta(false);
        }, 1000);
      }, 0);
    } else {
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
    }
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

  const ventanaMoviGene =()=>{
    if(movimiento){
      setMovimiento(false)
    }else{
      setMovimiento(true)
    }
  }

  const editarDocumento = (documento)=>{
    let arrayFiltrado = arrayDocumento.filter((item)=> item.tipoDoc == documento.tipoDoc && item.doc == documento.doc)
    console.log(arrayFiltrado)

  }
  return (
    <>
      {/*  ========================ALERTA LLENAR LOS CAMPOS===================================*/}
      {alerta ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            position: "absolute",
            top: "75px",
            right: "20px",
          }}
          spacing={2}
        >
          <Alert
            variant="filled"
            severity="error"
            sx={{
              width: "10%",
              textAlign: "center",
              justifyContent: "center",
            }}
          >
            Llene todos los campos
          </Alert>
        </Box>
      ) : null}

      {/*  ========================FORMULARIO DOCUMENTO===================================*/}
      <section className="Container2">
        <section className="tituloIngreso">
          <h1>DOCUMENTO</h1>
        </section>
        <form className="Documento" onSubmit={ingreso}>
          <section className="documento1">
            <TextField size="small" name="doc" label="DOC" variant="outlined" />
            <TextField
              size="small"
              name="tipoDoc"
              label="TIPO DE DOC"
              variant="outlined"
            />
            <TextField
              size="small"
              name="id"
              label="ID CUENTA"
              variant="outlined"
              onChange={buscarCuenta}
            />
          </section>
          <section className="documento2">
            <TextField
              size="small"
              name="cedula"
              label="CEDULA"
              variant="outlined"
            />
            <TextField size="small" value={cuenta} readOnly={true} />
            <TextField
              size="small"
              name="detalles"
              label="DETALLES"
              variant="outlined"
            />
          </section>
          <section className="documento3">
            <TextField
              size="small"
              name="debito"
              label="DEBITO"
              variant="outlined"
            />
            <TextField
              size="small"
              name="credito"
              label="CREDITO"
              variant="outlined"
            />
            <label>
              <input type="date" name="fecha"></input>
            </label>
          </section>
          <section className="btnFormulario">
            <Button
              type="submit"
              className="btnDocumento"
              variant="contained"
              color="success"
              sx={{
                background: "#379f7a",
                borderRadius: "50px",
                height: "35px",
              }}
            >
              INGRESAR
            </Button>
            <Button
              className="btnDocumento"
              variant="contained"
              color="success"
              sx={{
                background: "#379f7a",
                borderRadius: "50px",
                height: "35px",
                marginLeft:'20px',  
                width:'200px'
              }}
              value={movimiento}
              onClick={ventanaMoviGene}
            >
              MOVIMIENTO GENERAL
            </Button>
          </section>
        </form>
      </section>
      <TablaDocumento
        arrayDocumento={arrayDocumento}
        totalDebito={totalDebito}
        totalCredito={totalCredito}
        guardar={guardar}
        editarDocumento={editarDocumento}
      />
      { movimiento ? (
        <MoviGene arrayIngreso={arrayIngreso} setArrayDocumento={setArrayDocumento} />
      ):null}
    </>
  );
};

export default Documento;
