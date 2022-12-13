import { useState } from "react";

// function MyComponent(props) {
//   const { values, add, remove, clear } = useArray(['apple', 'banana']);

//   return (
//     <div>
//       <ul>
//         {values.map(value => (
//           <li key={value}>{value}</li>
//         ))}
//       </ul>
//       <button onClick={() => add('orange')}>Add Orange</button>
//       <button onClick={() => remove('banana')}>Remove Banana</button>
//       <button onClick={clear}>Clear List</button>
//     </div>
//   );
// }

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
    clear
  };
};

export default useArray;
