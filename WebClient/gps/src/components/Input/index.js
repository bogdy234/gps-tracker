import styles from "./style.module.css";

const Input = ({ text, type = "text", value, getInputValue }) => {
  return (
    <div>
      <div className={styles.text}>{text}</div>
      <input type={type} onChange={getInputValue} value={value}></input>
    </div>
  );
};

export default Input;
