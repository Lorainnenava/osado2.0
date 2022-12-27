import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Menu from './components/Menu'
import Cuentas from './components/Cuentas'
import Documento from './components/Documento'
import MoviCuenta from './components/MoviCuenta'
import MoviGene from './components/MoviGene'
import {useState} from 'react'

function App() {
  const [arrayCuentas, setArrayCuentas] = useState([]); //ARRAY REGISTRO
  const [arrayIngreso, setArrayIngreso] = useState([]); //ARRAY DONDE SE VA A VER TODO

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
              />
            }
          />
          <Route
            path="/MoviCuenta"
            element={<MoviCuenta arrayIngreso={arrayIngreso} />}
          />
          <Route
            path="/MoviGene"
            element={<MoviGene arrayIngreso={arrayIngreso} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
