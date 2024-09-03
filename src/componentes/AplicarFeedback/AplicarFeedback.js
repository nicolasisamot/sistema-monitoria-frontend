import React, { useState } from "react";
import api from "../../api.js";
import styles from "./AplicarFeedback.module.css";

export default function AplicarFeedback({
  setFeedbackAplicado,
  handleOpenModal,
  ligacao,
  setLigacaoModal,
}) {
  return (
    <button
      onClick={() => {
        setLigacaoModal({
          idLigacao: ligacao.id,
          nomeOperador: ligacao.nomeOperador,
          dataLigacao: ligacao.data,
        });
        setFeedbackAplicado(false);
        handleOpenModal();
      }}
    >
      Aplicar
    </button>
  );
}
