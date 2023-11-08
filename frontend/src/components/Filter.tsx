import "./Filter.css";

const Filter = (props: { locations: string[]; meshTypes: string[] }) => {
  return (
    <div className="filter-container">
      <header className="filter-header">Filters</header>
      <form>
        <p className="filter-location">
          <label htmlFor="location">Location</label>
          <select id="location">
            <option disabled selected>
              -- select an option--
            </option>
            {props.locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </p>
        <p className="filter-mesh-type">
          <p>Mesh Type</p>
          {props.meshTypes.map((meshType) => (
            <div key={meshType}>
              <input type="radio" id={meshType}></input>
              <label htmlFor={meshType}>{meshType}</label>
            </div>
          ))}
        </p>
      </form>
    </div>
  );
};

export default Filter;
