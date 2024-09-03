import styles from "./PaginaLigacoes.module.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../contextos/AuthContext.js";
import { useNavigate } from "react-router-dom";
import TabelaLigacoes from "../../componentes/TabelaLigacoes/TabelaLigacoes.js";
import api from "../../api.js";
import FormularioFiltroLigacoes from "../../componentes/FormularioFiltroLigacoes/FormularioFiltroLigacoes.js";

export default function PaginaLigacoes() {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useContext(AuthContext);
  const [ligacoes, setLigacoes] = useState([]);
  const [page, setPage] = useState(1);
  const [urlBusca, setUrlBusca] = useState("");
  const [reload, setReload] = useState(false);
  const recarregar = () => setReload(!reload);

  function proximaPagina() {
    if (ligacoes.length > 0) {
      setPage(page + 1);
    }
  }

  function paginaAnterior() {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  useEffect(() => {
    if (isAuthenticated == false) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated == true) {
      if (user.role === "monitor") {
        api
          .get(`ligacoes/q?page=${page}${urlBusca}`)
          .then((response) => {
            setLigacoes(response.data.resultado);
          })
          .catch((error) => {
            alert("Ocorreu um erro ao buscar as ligações");
          });
        console.log(ligacoes);
      }

      if (user.role === "operador") {
        api
          .get(`ligacoes/q?page=${page}`)
          .then((response) => {
            setLigacoes(response.data.resultado);
          })
          .catch((error) => {
            alert("Ocorreu um erro ao buscar as ligações");
          });
      }
    }
  }, [page, urlBusca, reload]);

  return (
    <div className={styles.container}>
      <FormularioFiltroLigacoes value={{ urlBusca, setUrlBusca, setPage }} />
      <TabelaLigacoes ligacoes={ligacoes} recarregar={recarregar} />
      <div className={styles.buttonsPaginacao}>
        <button onClick={paginaAnterior}>Anterior</button>
        <button onClick={proximaPagina}>Proxima</button>
      </div>
    </div>
  );
}
