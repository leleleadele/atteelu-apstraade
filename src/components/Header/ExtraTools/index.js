import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { filters } from "../../../consts";
import HueSlider from '../../HueSlider';
import NumberInput from '../../NumberInput';

const ExtraTools = () => {
  const { activeFilter } = useSelector((state) => state.filters);

  return (
    <div className={styles.tools}>
        {activeFilter === filters.changeHue && <HueSlider />}
        {activeFilter === filters.adaptiveFilter && <NumberInput />}
    </div>
  );
};

export default ExtraTools;
