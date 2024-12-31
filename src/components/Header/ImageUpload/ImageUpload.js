import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { actions } from "../../../store";
import * as styles from "./styles.module.scss";

// attēla augšupielādes pogas komponente
function ImageUpload() {
  const dispatch = useDispatch();
  const inputRef = useRef(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(actions.changeImage(URL.createObjectURL(file)));
    }
  };

  return (
    <div className={styles.container}>
      <input
        ref={inputRef}
        type="file"
        onChange={handleImageChange}
        onClick={() => console.log("WOOO")}
        accept="image/*"
        id="imageInput"
        hidden
      />
      <label className={styles.button} htmlFor="imageInput">
        Upload Image
      </label>
    </div>
  );
}

export default ImageUpload;
