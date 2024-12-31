import ImageUpload from "./ImageUpload/ImageUpload";
import FilterButtons from "./FilterButtons";
import ExtraTools from "./ExtraTools";
import * as styles from "./styles.module.scss";

// augšējā rīkjosla
const Header = () => {
  return (
    <div className={styles.tools}>
      <FilterButtons />
      <ExtraTools />
      <ImageUpload />
    </div>
  );
};

export default Header;
