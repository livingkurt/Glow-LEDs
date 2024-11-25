import { useSelector } from "react-redux";
import at from "lodash/at";

const useTableState = (namespace, namespaceScope) => {
  const tableState = useSelector(state => {
    if (namespaceScope) {
      // This allows deeply nested navigation like "a.b.c". See: https://lodash.com/docs/4.17.15#at
      return at(state, namespaceScope)[0][namespace];
    } else {
      return state[namespace];
    }
  });
  console.log({ tableState });

  return tableState;
};

export default useTableState;
