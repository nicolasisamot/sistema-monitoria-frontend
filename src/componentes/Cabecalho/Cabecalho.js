import styles from "./Cabecalho.module.css";
import { useContext } from "react";
import { AuthContext } from "../../contextos/AuthContext.js";
import { useNavigate } from "react-router-dom";

export default function Cabecalho(props) {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useContext(AuthContext);
  function handleLogout() {
    logout();
    navigate("/");
  }

  return isAuthenticated ? (
    <header className={styles.cabecalho}>
      <button className={styles.logout} onClick={handleLogout}>
        Sair
      </button>
    </header>
  ) : (
    <header className={styles.cabecalho}>
      <button className={styles.login} onClick={() => navigate("/login")}>
        Login
      </button>
    </header>
  );
}
