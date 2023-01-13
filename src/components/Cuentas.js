/* eslint-disable eqeqeq */
import React, {useState, useEffect} from 'react'
import { TextField, Alert, Box, Button } from "@mui/material";
import { TablaBalance} from './tablas/TablaBalance';

export const Cuentas = ({arrayIngreso, arrayCuentas, setArrayCuentas}) => {
    const [arrayBalance, setArrayBalance] = useState([]); //ARRAY BALANCE
    const [ventanaBalance, setVentanaBalance] = useState(false);
    const [balanceCredito, setBalanceCredito] = useState(0); //BALANCE CREDITO
    const [balanceDebito, setBalanceDebito] = useState(0); //BALANCE DEBITO
    const [alerta, setAlerta] = useState(false);
    const [confirmacion, setConfirmacion] = useState(false);

    /*  ========================FUNCION DE REGISTRO===================================*/
    const registro = (e) => {
        e.preventDefault();
        if(e.target.idfijo.value == '' || e.target.nombrefijo.value== ''){
          setTimeout(() => {
            setConfirmacion(true);
          setTimeout(() => {
              setConfirmacion(false);
          }, 1000);
        }, 0);
        }else{
          setArrayCuentas([
          ...arrayCuentas,
          {
              id: e.target.idfijo.value,
              nombre: e.target.nombrefijo.value,
          },
          ]);
          setTimeout(()=>{
  
            setAlerta(true)
            setTimeout(() => {
            setAlerta(false);
              
            },1000 );
          },0)
          e.target.reset();
        }
    };

    /*  ========================FUNCION VER BALANCE Y ALMACENA BALANCE===================================*/
    const verBalance = () => {
        //SUMAR ID IGUALES
        let array = [];
        if (arrayCuentas.length > 0) {
        for (let i = 0; i < arrayCuentas.length; i++) {
            let balanceDebito = 0;
            let balanceCredito = 0;
            for (let j = 0; j < arrayIngreso.length; j++) {
            if (arrayCuentas[i].id == arrayIngreso[j].id) {
                balanceDebito = balanceDebito + parseFloat(arrayIngreso[j].debito);
                balanceCredito =
                balanceCredito + parseFloat(arrayIngreso[j].credito);
            }
            }
            if (balanceCredito + balanceDebito > 0) {
            array.push({
                id: arrayCuentas[i].id,
                cuenta: arrayCuentas[i].nombre,
                debito: balanceDebito,
                credito: balanceCredito,
            });
            }
        }
        setArrayBalance(array);
        }

        /*  ========================DESPLEGAR VENTANA BALANCE===================================*/
        if (ventanaBalance) {
        setVentanaBalance(false);
        } else {
        setVentanaBalance(true);
        }
    };

    /*  ========================FUNCION SUMAR EN BALANCE===================================*/
    useEffect(() => {
        const sumarBalance = () => {
        let sumaDebito = 0;
        let sumaCredito = 0;
        for (let i = 0; i < arrayBalance.length; i++) {
            sumaDebito = sumaDebito + parseFloat(arrayBalance[i].debito);
            sumaCredito = sumaCredito + parseFloat(arrayBalance[i].credito);
        }
        setBalanceDebito(parseFloat(sumaDebito));
        setBalanceCredito(parseFloat(sumaCredito));
        };
        sumarBalance();
    }, [arrayBalance]);

    return (
      <>
        {/*  ========================ALERTA REGISTRO EXITOSO===================================*/}
        {alerta ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              position: "absolute",
              top: "86px",
              right: "20px",
            }}
            spacing={2}
          >
            <Alert
              variant="filled"
              severity="success"
              sx={{
                width: "10%",
                textAlign: "center",
                justifyContent: "center",
              }}
            >
              Registro exitoso
            </Alert>
          </Box>
        ) : null}

        {/*  ========================ALERTA FALTAN LOS CAMPOS===================================*/}
        {confirmacion ? (
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "end",
              position: "absolute",
              top: "86px",
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
              llene todos los campos
            </Alert>
          </Box>
        ) : null}

        {/*  ========================FORMULARIO REGISTRO===================================*/}
        <section className="container1">
          <section className="tituloRegistro">
            <h1>CREACION DE CUENTA</h1>
          </section>
          <form className="registro" onSubmit={registro}>
            <TextField
              className="labelRegistro"
              size="small"
              name="idfijo"
              label="ID CUENTA"
              variant="outlined"
            />
            <TextField
              className="labelRegistro"
              size="small"
              name="nombrefijo"
              label="NOMBRE CUENTA"
              variant="outlined"
            />
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
              REGISTRAR
            </Button>
          </form>
          <section className="botones">
            <Button
              type="submit"
              className="btnDocumento"
              variant="contained"
              color="success"
              onClick={verBalance}
              sx={{
                background: "#379f7a",
                borderRadius: "50px",
                height: "35px",
                top: "20px",
                bottom: "20px",
              }}
            >
              VER BALANCE
            </Button>
          </section>
        </section>
        <TablaBalance
          ventanaBalance={ventanaBalance}
          arrayBalance={arrayBalance}
          balanceDebito={balanceDebito}
          balanceCredito={balanceCredito}
        />
      </>
    );
}

export default Cuentas;