/* eslint-disable eqeqeq */
import React, {useState, useEffect} from 'react';
import { TablaMoviCuenta } from './tablas/TablaMoviCuenta';

export const MoviCuenta = ({arrayIngreso}) => {
    const [arrayMovimiento, setArrayMovimiento] = useState([]); //ARRAY DE MOVIMIENTO DE CUENTAS
    const [saldoAnterior, setSaldoAnterior] = useState(0); //SALDO ANTERIOR
    const [saldoActual, setSaldoActual] = useState(0); //SALDO ACTUAL
    const [ventanaMovimiento, setVentanaMovimiento] = useState(false); //VENTANA MOVIMIENTO
    const [movimientoDebito, setMovimientoDebito] = useState(0); //TOTAL MOVIMIENTO DEBITO
    const [movimientoCredito, setMovimientoCredito] = useState(0); //TOTAL MOVIMIENTO CREDITO

    /*  ========================FUNCION MOVIMIENTO DE CUENTA Y ALMACENA EN ARRAY MOVIMIENTO===================================*/
    const verMovimiento = (e) => {
        e.preventDefault();

        /*  ========================FILTAR FECHAS===================================*/
        let arrayTemporal = arrayIngreso.filter(
        (item) =>
            item.fecha >= e.target.fechaInicial.value &&
            item.fecha <= e.target.fechaFinal.value &&
            e.target.idmovimiento.value == item.id
        );

        setArrayMovimiento(arrayTemporal);

        /*  ========================FILTRA SALDO ANTERIOR===================================*/
        let valorSaldoAnterior = 0;
        let arraySaldoAnterior = arrayIngreso.filter(
        (item) =>
            item.fecha < e.target.fechaInicial.value &&
            e.target.idmovimiento.value == item.id
        );
        if (arraySaldoAnterior.length > 0) {
        for (let i = 0; i < arraySaldoAnterior.length; i++) {
            valorSaldoAnterior =
            valorSaldoAnterior +
            parseFloat(arraySaldoAnterior[i].debito) -
            parseFloat(arraySaldoAnterior[i].credito);
        }
        }
        setSaldoAnterior(valorSaldoAnterior);

        /*  ========================FILTRA SALDO ACTUAL===================================*/
        let valorSaldoActual = 0;
        for (let i = 0; i < arrayMovimiento.length; i++) {
        valorSaldoActual =
            valorSaldoActual +
            parseFloat(arrayMovimiento[i].debito) -
            parseFloat(arrayMovimiento[i].credito);
        }
        setSaldoActual(valorSaldoActual + saldoAnterior);

        /*  ========================DESPLIEGA VENTANA DE MOVIMIENTO DE CUENTA===================================*/
        if (ventanaMovimiento) {
        setVentanaMovimiento(false);
        } else {
        setVentanaMovimiento(true);
        }
    };

    /*  ========================TOTAL DE MOVIMIENTO DE CUENTA===================================*/
    useEffect(() => {
        const sumarMovimiento = () => {
        let sumaDebito = 0;
        let sumaCredito = 0;
        for (let i = 0; i < arrayMovimiento.length; i++) {
            sumaDebito = sumaDebito + parseFloat(arrayMovimiento[i].debito);
            sumaCredito = sumaCredito + parseFloat(arrayMovimiento[i].credito);
        }
        setMovimientoDebito(sumaDebito);
        setMovimientoCredito(sumaCredito);
        };
        sumarMovimiento();
    }, [arrayMovimiento]);

    return (
        <>
            {/*  ========================FORMULARIO MOVIMIENTO DE CUENTA===================================*/}
            <section className="container3">
                <section className="tituloMoviCuenta">
                <h1>MOVIMIENTO DE CUENTA</h1>
                </section>
            <form className="MovimientoCuenta" onSubmit={verMovimiento}>
                <label>
                ID
                <input type="text" name="idmovimiento"></input>
                </label>
                <label>
                FECHA INICIAL
                <input type="date" name="fechaInicial"></input>
                </label>
                <label>
                FECHA FINAL
                <input type="date" name="fechaFinal"></input>
                </label>
                <button className="btnMoviGene">VER MOVIMIENTO</button>
            </form>
            </section>
            <TablaMoviCuenta 
            ventanaMovimiento={ventanaMovimiento} 
            saldoAnterior={saldoAnterior} 
            arrayMovimiento={arrayMovimiento}
            movimientoDebito={movimientoDebito}
            movimientoCredito={movimientoCredito}
            saldoActual={saldoActual}
            />
        </>
    );
}
export default MoviCuenta;