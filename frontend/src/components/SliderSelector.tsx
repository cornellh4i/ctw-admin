import { FC } from 'react';
import AltitudeComponent from './altitude-component';
import Collapsible from './Collapsible';
import TimeframeComponent from './Timeframe';

interface SliderSelectorProps {
  title: string;
  min: Date | number;
  max: Date | number;
}

const SliderSelector: FC<SliderSelectorProps> = ({ title, min, max }) => {
  if (title === "Time Frame") {
    return (
        <div>
          <Collapsible title={title}>
            <TimeframeComponent minDate={new Date(min)} maxDate={new Date(max)} />
          </Collapsible>
        </div>
    );
  }
  else if (title === "Altitude") {
    return (
            <div>
              <Collapsible title={title}>
                <AltitudeComponent minAlt={min} maxAlt={max} />
              </Collapsible>
            </div>
    );
  }
  return null;
};

export default SliderSelector;
