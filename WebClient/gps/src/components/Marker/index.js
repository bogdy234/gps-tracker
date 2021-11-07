import styles from "./style.module.css";

const Marker = ({ lat, lng, text = "" }) => {
  return (
    <div>
      {text}
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/d/d7/Red_Point.gif"
        className={styles.image}
      />
    </div>
  );
};

export default Marker;
