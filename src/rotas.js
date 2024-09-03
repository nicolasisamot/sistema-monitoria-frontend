import { BrowserRouter, Route, Routes } from "react-router-dom";
import "../src/reset.css";
import PaginaInicial from "./pages/PaginaInicial/PaginaInicial.js";
import PaginaLogin from "./pages/PaginaLogin/PaginaLogin.js";
import PaginaPrivadaTeste from "./pages/PaginaPrivadaTeste/PaginaPrivadaTeste.js";
import AuthContextProvider from "./contextos/AuthContext.js";
import Cabecalho from "./componentes/Cabecalho/Cabecalho.js";

import PaginaLigacoes from "./pages/PaginaLigacoes/PaginaLigacoes.js";

export default function Rotas() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Cabecalho />
        <Routes>
          <Route path="/" element={<PaginaInicial />}></Route>
          <Route path="/login" element={<PaginaLogin />}></Route>
          <Route path="/ligacoes" element={<PaginaLigacoes />}></Route>
          <Route path="*" element={<h1>ERROR 404</h1>}></Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
