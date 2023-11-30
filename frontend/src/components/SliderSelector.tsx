import { FC } from 'react';
import AltitudeComponent from './altitude-component';
import Collapsible from './Collapsible';

interface SliderSelectorProps {
  title: string;
  min: number;
  max: number;
}

const SliderSelector: FC<SliderSelectorProps> = ({ title, min, max }) => {
  return (
    <div>
      <Collapsible title={title}>
        <AltitudeComponent minAlt={min} maxAlt={max} />
      </Collapsible>
    </div>
  );
};

export default SliderSelector;
