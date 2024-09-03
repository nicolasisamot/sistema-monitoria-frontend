import "./PaginaPrivadaTeste.css";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../contextos/AuthContext.js";
import { useNavigate } from "react-router-dom";

export default function PaginaPrivadaTeste(props) {
  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AuthContext);
  console.log(isAuthenticated);
  useEffect(() => {
    if (isAuthenticated == false) {
      navigate("/login");
    }
  }, []);

  return <h1>PAGINA LOGADO</h1>;
}
