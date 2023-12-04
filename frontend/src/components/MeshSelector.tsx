import { FC, useState } from 'react';
import Collapsible from './Collapsible'
import './MeshSelector.css';

interface MeshSelectorProps {
  title: string;
  typeList: string[];
}

const MeshSelector: FC<MeshSelectorProps> = ({ title, typeList }) => {
  const [selected, setSelected] = useState([] as string[]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.checked) {
      setSelected(selected.filter((number) => number !== e.target.value));
    } else {
      setSelected(selected.concat(e.target.value));
    }
  }

  return (
    <div className='preferences'>
      <Collapsible title={title}>
        <div onChange={handleChange}>
          {typeList.map((type, i) => (
            <label key={i}>
              <input type='checkbox' key={i} value={type} /> {type}
            </label>
          ))}
        </div>
      </Collapsible>
    </div>
  );
};

export default MeshSelector;
