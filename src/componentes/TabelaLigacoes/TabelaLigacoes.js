import styles from "./TabelaLigacoes.module.css";
import VerFeedback from "../VerFeedback/VerFeedback.js";
import AplicarFeedback from "../AplicarFeedback/AplicarFeedback.js";
import { useEffect, useState } from "react";
import api from "../../api.js";

export default function TabelaLigacoes(props) {
  const [showModal, setShowModal] = useState(false);
  const [ligacaoModal, setLigacaoModal] = useState({
    idLigacao: "",
    nomeMonitor: "",
    nomeOperador: "",
    dataLigacao: "",
    idFeedback: "",
  });
  const [feedbackAplicado, setFeedbackAplicado] = useState(true);
  const [nota, setNota] = useState("");
  const [comentario, setComentario] = useState("");

  function handleOpenModal() {
    setShowModal(true);
  }

  function handleCloseModal() {
    setNota("");
    setComentario("");
    setLigacaoModal({
      idLigacao: "",
      nomeMonitor: "",
      nomeOperador: "",
      dataLigacao: "",
      idFeedback: "",
    });
    setShowModal(false);
  }

  function setFeedback(feedback) {
    setFeedbackAplicado(feedback);
  }
  function setLigacao(ligacao) {
    setLigacaoModal(ligacao);
  }
  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const response = await api.post(
        "feedbacks/criar",
        {
          idLigacao: ligacaoModal.idLigacao,
          nota: Number(nota),
          comentario: comentario,
        },
        {
          headers: {
            "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
          },
        }
      );
      props.recarregar();
      handleCloseModal();
      setNota("");
      setComentario("");
    } catch (error) {
      setNota("");
      setComentario("");
      alert("Ocorreu um erro ao aplicar o feedback");
    }
  }

  return (
    <>
      <div className={styles.modal + (showModal ? " " + styles.visible : "")}>
        <span
          className={styles.close}
          onClick={() => {
            handleCloseModal();
          }}
        >
          x
        </span>
        {feedbackAplicado ? (
          <div className={styles.modalContent}>
            <h3>Ligação: {ligacaoModal.idLigacao}</h3>
            <h3>Monitor: {ligacaoModal.nomeMonitor}</h3>
            <h3>Operador: {ligacaoModal.nomeOperador}</h3>
            <h3>Data: {ligacaoModal.dataLigacao}</h3>
            <h3>Nota: {ligacaoModal.nota}</h3>
            <label>Comentário:</label>
            <h3>{ligacaoModal.comentario}</h3>
          </div>
        ) : (
          <div className={styles.modalContent}>
            <h3>Ligação: {ligacaoModal.idLigacao}</h3>
            <h3>Operador: {ligacaoModal.nomeOperador}</h3>
            <h3>Data: {ligacaoModal.dataLigacao}</h3>
            <form className={styles.form} onSubmit={handleSubmit}>
              <label className={styles.label}>
                Nota:
                <input
                  type="number"
                  value={nota}
                  onChange={(e) => setNota(e.target.value)}
                  required
                  min="0"
                  max="100"
                />
              </label>
              <label className={styles.labelComentario}>
                Comentário:
                <textarea
                  value={comentario}
                  onChange={(e) => setComentario(e.target.value)}
                  required
                ></textarea>
              </label>
              <button type="submit">Aplicar</button>
            </form>
          </div>
        )}
      </div>
      <table className={styles.tabela}>
        <thead className={styles.thead}>
          <tr>
            <th>ID</th>
            <th>Operador</th>
            <th>Data Ligação</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {props.ligacoes.map((ligacao) => (
            <tr key={ligacao.id}>
              <td>{ligacao.id}</td>
              <td>{ligacao.nomeOperador}</td>
              <td>{ligacao.data}</td>
              <td>
                {ligacao.idFeedback ? (
                  <VerFeedback
                    ligacao={ligacao}
                    setLigacaoModal={setLigacao}
                    ligacaoModal={ligacaoModal}
                    handleOpenModal={handleOpenModal}
                    setFeedbackAplicado={setFeedback}
                  />
                ) : (
                  <AplicarFeedback
                    ligacao={ligacao}
                    setLigacaoModal={setLigacao}
                    handleOpenModal={handleOpenModal}
                    setFeedbackAplicado={setFeedback}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
