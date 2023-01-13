import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './components/Menu'
import Cuentas from './components/Cuentas'
import Documento from './components/Documento'
import MoviCuenta from './components/MoviCuenta'
import {useState} from 'react'

function App() {
  const [arrayCuentas, setArrayCuentas] = useState([]); //ARRAY REGISTRO
  const [arrayIngreso, setArrayIngreso] = useState([]); //ARRAY DONDE SE VA A VER TODO
  const [arrayDocumento, setArrayDocumento] = useState([]); //ARRAY FORMULARIO

  return (
    <div className="App">
      <BrowserRouter>
        <Menu />
        <Routes>
          <Route
            path="/"
            element={
              <Cuentas
                arrayIngreso={arrayIngreso}
                arrayCuentas={arrayCuentas}
                setArrayCuentas={setArrayCuentas}
              />
            }
          />
          <Route
            path="/Documento"
            element={
              <Documento
                arrayCuentas={arrayCuentas}
                arrayIngreso={arrayIngreso}
                setArrayIngreso={setArrayIngreso}
                arrayDocumento={arrayDocumento}
                setArrayDocumento={setArrayDocumento}
              />
            }
          />
          <Route
            path="/MoviCuenta"
            element={<MoviCuenta arrayIngreso={arrayIngreso} />}
          />
{/*           <Route
            path="/MoviGene"
            element={<MoviGene arrayIngreso={arrayIngreso} setArrayDocumento={setArrayDocumento}/>}
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
