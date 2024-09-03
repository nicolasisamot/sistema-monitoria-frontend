import "./CampoTexto.css";

export default function CampoTexto(props) {
  return (
    <div className={props.estilo}>
      <label>{props.label}</label>
      <input
        value={props.value}
        type={props.type}
        onChange={props.onChange}
        required={props.obrigatorio}
        placeholder={props.placeholder}
      />
    </div>
  );
}
