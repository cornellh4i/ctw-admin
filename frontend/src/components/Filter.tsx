import { ReactElement } from "react";
import "./Filter.css";

const Filter = (props: { components: ReactElement[] }) => {
  return (
    <div className="filter-container">
      <header className="filter-header">Filters</header>
      <form>{props.components.map((component) => component)}</form>
    </div>
  );
};

export default Filter;
