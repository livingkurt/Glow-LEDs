import { useState } from "react";

const useArray = initialValues => {
  const [values, setValues] = useState(initialValues);

  const add = value => {
    setValues([...values, value]);
  };

  const remove = value => {
    setValues(values.filter(val => val !== value));
  };

  const clear = () => {
    setValues([]);
  };

  return {
    values,
    add,
    remove,
    clear,
  };
};

export default useArray;
