import { useState } from "react";
import Button from "../Button";
import styles from "./style.module.css";

const Modal = ({
  defaultLatitude,
  defaultLongitude,
  closeModal,
  saveChanges,
}) => {
  const [latitude, setLatitude] = useState(defaultLatitude);
  const [longitude, setLongitude] = useState(defaultLongitude);

  const onChangeLatitude = (e) => {
    setLatitude(e.target.value);
  };

  const onChangeLongitude = (e) => {
    setLongitude(e.target.value);
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.modalContent}>
        <div className={styles.labelInputContainer}>
          <label htmlFor="latitude">Latitude</label>
          <input name="latitude" value={latitude} onChange={onChangeLatitude} />
        </div>
        <div className={styles.labelInputContainer}>
          <label htmlFor="longitude">Longitude</label>
          <input
            name="longitude"
            value={longitude}
            onChange={onChangeLongitude}
          />
        </div>
        <div className={styles.buttons}>
          <Button
            text="Cancel"
            backgroundColor="red"
            borderRadius="10px"
            onClick={closeModal}
          />
          <Button
            text="Modify"
            backgroundColor="#ddd"
            borderRadius="10px"
            onClick={() => saveChanges(latitude, longitude)}
          />
        </div>
      </div>
    </div>
  );
};

export default Modal;