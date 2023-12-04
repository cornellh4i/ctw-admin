import { FC, useState, ReactNode } from 'react';
import { useCollapse } from 'react-collapsed';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';
import './Collapsible.css';

interface CollapsibleProps {
  title: string;
  children: ReactNode;
};

const Collapsible: FC<CollapsibleProps> = ({ title, children }) => {
  const { getCollapseProps, getToggleProps, isExpanded } = useCollapse({ hasDisabledAnimation: true });
  const [name, setName] = useState("header")

  function handleClick() {
    setName(previous => previous === 'header' ? 'header-active' : 'header')
  }

  return (
    <div className='collapsible'>
      <div className={name} {...getToggleProps({onClick: handleClick})}>
        <span className='icon'>
          {isExpanded ? ( 
            <FaChevronDown size={10} />
          ) : (
            <FaChevronRight size={10} />
          )}
          <span className='title'>{title}</span>
        </span>
      </div>
      <div {...getCollapseProps()}>
        <div className='content'>{children}</div>
      </div>
    </div>
  );
};

export default Collapsible;