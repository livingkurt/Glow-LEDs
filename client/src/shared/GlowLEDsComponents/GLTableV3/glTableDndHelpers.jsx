import { reorderDropdownRows, reorderRows } from "./reducers/glTableActions";
import { rowIdentifier } from "./glTableHelpers";

/**
 * REORDER
 * Reorders an item within a list by moving it from the start index to the end index.
 */
export const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

/**
 * MOVE ITEM BETWEEN ARRAYS
 * Moves an item from a source array to a destination array. No pagination
 */
export const moveItemBetweenArrays = (sourceArray, destinationArray, sourceIndex, destinationIndex) => {
  const newSourceArray = Array.from(sourceArray);
  const newDestinationArray = Array.from(destinationArray);

  if (newSourceArray.length > 0 && sourceIndex < newSourceArray.length) {
    const [movedItem] = newSourceArray.splice(sourceIndex, 1);
    newDestinationArray.splice(destinationIndex, 0, movedItem);
  }

  return { sourceArray: newSourceArray, destinationArray: newDestinationArray };
};

/**
 * REORDER BETWEEN COLUMNS
 * Moves an item from a source column to a destination column, handling pagination.
 */
export const reorderBetweenColumns = (sourceColumn, destColumn, source, destination) => {
  const startIndex = sourceColumn.page * sourceColumn.pageSize + source.index;
  const endIndex = destColumn.page * destColumn.pageSize + destination.index;
  const newSourceRows = [...sourceColumn.rows];
  const newDestRows = [...destColumn.rows];

  // Move the item in the full dataset
  const [movedItem] = newSourceRows.splice(startIndex, 1);

  // Adjust destination index if it is out of bounds
  if (endIndex === -1 || endIndex >= newDestRows.length) {
    newDestRows.push(movedItem); // Append to the end if out of bounds
  } else {
    newDestRows.splice(endIndex, 0, movedItem);
  }

  // Return the modified full datasets for source and destination columns
  return { newSourceRows, newDestRows, movedItem };
};

/**
 * ON DRAG END
 * Handles the end of a drag operation for regular table rows.
 */
export const onDragEnd = ({
  result,
  dispatch,
  tableState,
  namespace,
  remoteReorderApi,
  orderAttribute,
  zeroIndexDropdownRows,
}) => {
  const { source, destination } = result;
  const { rows, page, pageSize } = tableState;

  // must sort here or else the first time the data comes through this, it could be in the wrong order if its not sorted from the query
  const sortedRows = rows.slice().sort((a, b) => a[orderAttribute] - b[orderAttribute]);

  if (!destination) {
    return null;
  }

  // Calculate the indices in the context of the full dataset
  const position = page * pageSize;
  const startIndex = position + source.index;
  const endIndex = position + destination.index;

  // Move within the same column
  const reorderedItems = reorder(sortedRows, startIndex, endIndex);

  const updatedOrderAttribute = updateItemOrder({
    items: reorderedItems,
    orderAttribute,
    zeroIndexDropdownRows,
  });

  dispatch(
    reorderRows(namespace, {
      reorderedItems: updatedOrderAttribute,
      remoteReorderApi,
    })
  );
  return { updatedReorderedItems: updatedOrderAttribute };
};

/**
 * ON DRAG END DROPDOWN
 * Handles the end of a drag operation for dropdown rows.
 */
export const onDragEndDropdown = ({
  result,
  dispatch,
  tableState,
  namespace,
  remoteReorderDropdownApi,
  uniqueKey,
  dropdownOrderAttribute,
  dropdownRowsUniqueKey,
  zeroIndexDropdownRows,
}) => {
  const { source, destination, draggableId } = result;
  if (!destination) {
    return { updatedReorderedItems: null };
  }

  const [parentId] = draggableId.split("-");

  const updatedRows = updateDropdownItemOrder({
    rows: tableState.rows,
    uniqueKey,
    parentId,
    dropdownRowsUniqueKey,
    source,
    destination,
    dropdownOrderAttribute,
    zeroIndexDropdownRows,
  });

  const parentRow = updatedRows.find(row => rowIdentifier(row, uniqueKey) === Number(parentId));
  const reorderedDropdownItems = parentRow[dropdownRowsUniqueKey];

  dispatch(
    reorderDropdownRows(namespace, {
      parentId,
      updatedRows,
      reorderedDropdownItems,
      remoteReorderDropdownApi,
    })
  );

  return { updatedReorderedItems: reorderedDropdownItems };
};

/**
 * UPDATE ITEM ORDER
 * Updates the order attribute of items in a list.
 */
export const updateItemOrder = ({ items, orderAttribute, zeroIndexDropdownRows }) => {
  const updatedItems = items.map((item, index) => {
    return {
      ...item,
      [orderAttribute]: zeroIndexDropdownRows ? index : index + 1,
    };
  });
  return updatedItems;
};

/**
 * UPDATE DROPDOWN ITEM ORDER
 * Updates the order of dropdown items within a specific parent row.
 */
export const updateDropdownItemOrder = ({
  rows,
  uniqueKey,
  parentId,
  dropdownRowsUniqueKey,
  source,
  destination,
  dropdownOrderAttribute,
  zeroIndexDropdownRows,
}) => {
  const updatedRows = rows.map(row => {
    if (rowIdentifier(row, uniqueKey) === Number(parentId)) {
      const dropdownRows = [...row[dropdownRowsUniqueKey]];
      const reorderedDropdownItems = reorder(dropdownRows, source.index, destination.index);

      const updatedDropdownItems = updateItemOrder({
        items: reorderedDropdownItems,
        orderAttribute: dropdownOrderAttribute,
        zeroIndexDropdownRows,
      });

      return {
        ...row,
        [dropdownRowsUniqueKey]: updatedDropdownItems,
      };
    }
    return row;
  });
  return updatedRows;
};
