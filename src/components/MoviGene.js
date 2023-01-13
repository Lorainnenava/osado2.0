/* eslint-disable eqeqeq */
import { Box, Alert, Button } from '@mui/material';
import React,{useState} from 'react'
import { TablaMoviGene } from './tablas/TablaMoviGene';

export const MoviGene = ({arrayIngreso, setArrayDocumento}) => {

    const [movimientoGeneral, setMovimientoGeneral] = useState(false); //VENTANA MOVIMIENTO GENERAL
    const [arrayMovimientoGeneral, setArrayMovimientoGeneral] = useState([]); //ARRAY MOVIMIENTO GENERAL
    const[alerta, setAlerta] = useState(false); //

    /*  ========================FUNCION MOVIMIENTO GENERAL===================================*/
    const verMovimientoGeneral = (e) => {
        e.preventDefault();
        if(e.target.fechaInicialMovimiento.value == '' || e.target.fechaFinalMovimiento.value == '' ){
            setTimeout(() => {
                setAlerta(true);
            setTimeout(() => {
                setAlerta(false);
            }, 1000);
            }, 0);
        }else{
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
        }
    };

    const editar = (general) => {
        let arrayTemporal = arrayMovimientoGeneral.filter(
            (item) => item.tipoDoc == general.tipoDoc && item.doc == general.doc);
        setArrayDocumento(arrayTemporal)
    };


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
                Ingrese algun valor
                </Alert>
            </Box>
            ) : null}

            {/*  ========================FORMULARIO MOVIMIENTO GENERAL===================================*/}
            <section className="container4">
            <section className="titulomovi">
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
                <Button
                type="submit"
                className="btnDocumento"
                variant="contained"
                color="success"
                value={movimientoGeneral}
                sx={{
                    background: "#379f7a",
                    borderRadius: "50px",
                    height: "40px",
                }}
                >
                INGRESAR
                </Button>
            </form>
            </section>
            <TablaMoviGene
            arrayMovimientoGeneral={arrayMovimientoGeneral}
            movimientoGeneral={movimientoGeneral} editar={editar}
            />
        </>
    );
}
export default MoviGene;