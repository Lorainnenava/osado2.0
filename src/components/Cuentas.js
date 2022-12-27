/* eslint-disable eqeqeq */
import React, {useState, useEffect} from 'react'
import { TextField } from '@mui/material';

export const Cuentas = ({arrayIngreso, arrayCuentas, setArrayCuentas}) => {
    const [arrayBalance, setArrayBalance] = useState([]); //ARRAY BALANCE
    const [ventanaBalance, setVentanaBalance] = useState(false);
    const [balanceCredito, setBalanceCredito] = useState(0); //BALANCE CREDITO
    const [balanceDebito, setBalanceDebito] = useState(0); //BALANCE DEBITO

    /*  ========================FUNCION DE REGISTRO===================================*/
    const registro = (e) => {
        e.preventDefault();
        setArrayCuentas([
        ...arrayCuentas,
        {
            id: e.target.idfijo.value,
            nombre: e.target.nombrefijo.value,
        },
        ]);
        e.target.reset();
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
        {/*  ========================FORMULARIO REGISTRO===================================*/}
        {/*FORMULARIO DEL REGISTRO*/}
        <section className="container1">
          <section className="tituloRegistro">
            <h1>CREACION DE CUENTA</h1>
          </section>
          <form className="registro" onSubmit={registro}>
            {/*      <label className="labelRegistro">
                ID CUENTA
                <input
                    type="text"
                    name="idfijo"
                    placeholder="registra el codigo"
                ></input>
                </label> */}
            <TextField
              size="small"
              name="idfijo"
              label="ID CUENTA"
              variant="outlined"
            />
            <br />
            <label className="labelRegistro">
              NOMBRE CUENTA
              <input
                type="text"
                name="nombrefijo"
                placeholder="Ingresa el nombre"
              ></input>
            </label>
            <button className="btnRegistro" type="submit">
              REGISTRAR
            </button>
          </form>
          <section className="botones">
            <button className="btnBalance" onClick={verBalance}>
              <b>VER BALANCE</b>
            </button>
          </section>
        </section>

        {/*  ========================INICIA TABLA BALANCE===================================*/}
        {ventanaBalance ? (
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
                {arrayBalance.map((balance, i) => (
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
                    <b>{balanceDebito}</b>
                  </td>
                  <td className="totales">
                    <b>{balanceCredito}</b>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        ) : null}
      </>
    );
}

export default Cuentas;