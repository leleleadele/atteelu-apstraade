import { useSelector } from 'react-redux';
import { filters } from '../../consts';
import HueSlider from '../HueSlider';
import MedianInput from '../MedianInput';

const ExtraTools = () => {
  const { activeFilter } = useSelector(state => state.filters);

  return (
    <div className="mb-auto w-full overflow-hidden py-8">
      {activeFilter === filters.changeHue && <HueSlider />}
      {activeFilter === filters.adaptiveFilter && <MedianInput />}
    </div>
  );
};

export default ExtraTools;
