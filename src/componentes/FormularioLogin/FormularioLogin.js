import styles from "./FormularioLogin.module.css";
import CampoTexto from "../CampoTexto/CampoTexto.js";
import { useState } from "react";
import BotaoFormulario from "../BotaoFormulario/BotaoFormulario.js";

import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../contextos/AuthContext.js";
import { useNavigate } from "react-router-dom";

import api from "../../api.js";

export default function FormularioLogin(props) {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { login } = useContext(AuthContext);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.post(
        "login",
        {
          username: username,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json", // Define o tipo de conteúdo como JSON
          },
        }
      );

      login(response.data.token, response.data.user);

      setPassword("");
      setUsername("");
      navigate("/ligacoes");
    } catch (error) {
      setPassword("");
      setUsername("");
      alert("Usuário ou senha inválidos");
    }
  }

  return (
    <div>
      <form
        onSubmit={(event) => {
          handleSubmit(event);
        }}
        className={styles.form}
      >
        <CampoTexto
          estilo={styles.campos}
          value={username}
          label="Usuário"
          required={true}
          type="text"
          placeholder="Digite seu usuário..."
          onChange={(event) => setUsername(event.target.value)}
        />
        <CampoTexto
          estilo={styles.campos}
          value={password}
          label="Senha"
          required={true}
          type="password"
          placeholder="Digite sua senha..."
          onChange={(event) => setPassword(event.target.value)}
        />
        <button type="submit" className={styles.btnLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
