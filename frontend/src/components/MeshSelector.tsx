import { FC, useState, ReactNode } from 'react';
import { useCollapse } from 'react-collapsed';
import { FaChevronRight, FaChevronDown } from "react-icons/fa";
import './MeshSelector.css';

interface MeshSelectorProps {
  typeList: string[]
}

type SectionProps = {
  title: string,
  children: ReactNode
}

function Section(props : SectionProps) {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse();
return (
  <div className="collapsible">
    <div className="header" {...getToggleProps()}>
      <span className="icon">{isExpanded ? <FaChevronDown size={10}/> : <FaChevronRight size={10}/>}
        <span className="title">{props.title}</span>
      </span>
    </div>
    <div {...getCollapseProps()}>
        <div className="content">
            {props.children}
        </div>
    </div>
  </div>
  );
}

const MeshSelector: FC<MeshSelectorProps> = ({ typeList }) => {
  const [selected, setSelected] = useState([] as string[]);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.checked) {
      setSelected(selected.filter((number) => number !== e.target.value))
    } else {
      setSelected(selected.concat(e.target.value))
    }
  }
  
  return (
    <div className="preferences">
      <Section title="Mesh Type">
        <div onChange={handleChange}>
          {typeList.map((type, i) => 
          <label key={i}>
            <input type="checkbox" key={i} value={type}/> {type}
          </label>
          )}
        </div>
      </Section>
    </div>
  );
};

export default MeshSelector;