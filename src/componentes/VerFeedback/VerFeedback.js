import React, { useEffect, useState } from "react";
import styles from "./VerFeedback.module.css";
import api from "../../api.js";

export default function VerFeedback({
  handleOpenModal,
  setLigacaoModal,
  ligacao,
  setFeedbackAplicado,
}) {
  async function buscarFeedback() {
    try {
      const response = await api.get(`/feedbacks/${ligacao.idFeedback}`);
      setLigacaoModal(response.data.resultado);
    } catch (error) {
      alert("Ocorreu um erro ao buscar o feedback.");
    }
  }

  return (
    <button
      onClick={() => {
        setFeedbackAplicado(true);
        buscarFeedback();
        handleOpenModal();
      }}
    >
      Ver
    </button>
  );
}
