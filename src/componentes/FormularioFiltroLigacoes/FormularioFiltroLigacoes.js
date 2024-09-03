import styles from "./FormularioFiltroLigacoes.module.css";
import { useState, useContext } from "react";
import { AuthContext } from "../../contextos/AuthContext.js";

export default function FormularioFiltroLigacoes(props) {
  const { urlBusca, setUrlBusca, setPage } = props.value;
  const [idLigacao, setIdLigacao] = useState("");
  const [dataIncial, setDataIncial] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [nomeOperador, setNomeOperador] = useState("");
  const [feedbackAplicado, setFeedbackAplicado] = useState("any");
  const { user } = useContext(AuthContext);

  const isOperador = user.role === "operador" ? true : false;

  const handleChange = (event) => {
    setFeedbackAplicado(event.target.value);
  };
  function handleSubmit(e) {
    e.preventDefault();

    let url = `&`;
    if (idLigacao !== "") {
      url += `id=${idLigacao}&`;
    }
    if (dataIncial !== "") {
      url += `dataInicial=${dataIncial}&`;
    }
    if (dataFinal !== "") {
      url += `dataFinal=${dataFinal}&`;
    }
    if (nomeOperador !== "") {
      url += `nomeOperador=${nomeOperador}&`;
    }
    if (feedbackAplicado === "with") {
      url += `feedbackAplicado=with&`;
    } else if (feedbackAplicado === "without") {
      url += `feedbackAplicado=without&`;
    }
    if (isOperador) {
      url += `idOperador=${user.id}&`;
      url += `feedbackAplicado=with&`;
    }

    setPage(1);
    setUrlBusca(url);
  }
  return (
    <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
      <div>
        <label>ID LIGAÇÃO</label>
        <input
          disabled={isOperador}
          value={idLigacao}
          type="number"
          onChange={(e) => setIdLigacao(e.target.value)}
        />
      </div>
      <div>
        <label>DATA INICIO</label>
        <input
          value={dataIncial}
          type="date"
          onChange={(e) => setDataIncial(e.target.value)}
        />
      </div>
      <div>
        <label>DATA FINAL</label>
        <input
          value={dataFinal}
          type="date"
          onChange={(e) => setDataFinal(e.target.value)}
        />
      </div>
      <div>
        <label>OPERADOR</label>
        <input
          disabled={isOperador}
          value={nomeOperador}
          type="text"
          onChange={(e) => setNomeOperador(e.target.value)}
        />
      </div>
      <div>
        <label>FEEDBACK</label>
        <select
          disabled={isOperador}
          value={feedbackAplicado}
          onChange={handleChange}
        >
          <option value="any">Any</option>
          <option value="with">Aplicado</option>
          <option value="without">Não Aplicado</option>
        </select>
      </div>
      <input className="botao-buscar-ligacoes" type="submit" value="BUSCAR" />
    </form>
  );
}
