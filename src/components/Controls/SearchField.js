import { useEffect, useState } from 'react';
import "./controls.scss";
import TextField from "./TextField";

const SearchField = ({ value, onSubmit }) => {

  const [query, setQuery] = useState();
  useEffect(() => value && setQuery(value), [value]);

  return (
    <form className={"search-field"} onSubmit={e => {
      e.preventDefault();
      onSubmit && onSubmit.call(null, { query });
    }}>
      <TextField
        label={"Durchsuchen"}
        type={"search"}
        name={"query"}
        value={query}
        onChange={({ target }) => setQuery(target.value)}
      />
    </form>
  );
};

export default SearchField;
