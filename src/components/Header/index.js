import { useState } from "react";
import ImageUpload from "../ImageUpload/ImageUpload";
import FilterButtons from "../FilterButtons";
import * as styles from "./styles.module.scss";

// augšējā rīkjosla
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        className={`${styles.burgerButton} ${isOpen ? styles.open : ""}`}
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>
      <div className={`${styles.container} ${isOpen ? styles.open : ""}`}>
        <div className={styles.tools}>
          <FilterButtons />
          <ImageUpload />
        </div>
      </div>
    </>
  );
};

export default Header;
