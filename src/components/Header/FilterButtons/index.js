import { useDispatch, useSelector } from "react-redux";
import { filters } from "../../../consts";
import { actions } from "../../../store";
import * as styles from "./styles.module.scss";
import cn from "classnames";

// komponente filtra pogu renderēšanai
const FilterButtons = () => {
  const dispatch = useDispatch();
  const { activeFilter } = useSelector((state) => state.filters);

  const handleFilterClick = (filter) => {
    dispatch(actions.changeFilter(filter));
  };

  return (
    <div className={styles.buttonContainer}>
      <h2>Transformation:</h2>
      {Object.values(filters).map((filter) => (
        <button
          className={cn(
            styles.button,
            activeFilter === filter ? styles.buttonActive : ""
          )}
          key={filter}
          onClick={() => handleFilterClick(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons;
