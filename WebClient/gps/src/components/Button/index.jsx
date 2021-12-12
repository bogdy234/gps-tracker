import styles from "./style.module.css";

const Button = ({ onClick, text = "" }) => {
  return (
    <button onClick={onClick} className={styles.button}>
      {text}
    </button>
  );
};

export default Button;
