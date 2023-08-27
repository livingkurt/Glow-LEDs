// import * as React from 'react';
// import PropTypes from 'prop-types';
// import classNames from 'classnames';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import DraggableListItem from './components/DraggableListItem';

// const DraggableList = ({ items, onChange, depth, itemMap, boundingRef, itemGenerator, noStyles, customStyles }) => {
//   const onDragEnd = result => {
//     if (!result.destination) {
//       return;
//     }
//     if (result.destination.index === result.source.index) {
//       return;
//     }
//     const new_order = reorder(items, result.source.index, result.destination.index);
//     onChange(new_order, {}, { newIndex: result.destination.index, oldIndex: result.source.index });
//   };
//   const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);

//     return result;
//   };

//   return (
//     <div
//       data-test="sortable-list"
//       style={{
//         overflow: 'auto',
//         border: 'none',
//         ...customStyles,
//       }}
//       className={noStyles ? '' : classNames('collection')}
//     >
//       <DragDropContext onDragEnd={onDragEnd}>
//         <Droppable droppableId="list">
//           {providedList => (
//             <div ref={providedList.innerRef} {...providedList.droppableProps}>
//               {items.map((item, idx) => (
//                 <Draggable draggableId={item.toString()} index={idx} key={item}>
//                   {providedItem => (
//                     <div
//                       ref={providedItem.innerRef}
//                       {...providedItem.draggableProps}
//                       {...(!itemGenerator && providedItem.dragHandleProps)}
//                     >
//                       {itemGenerator && itemGenerator(item, idx, providedItem.dragHandleProps)}

//                       {!itemGenerator && (
//                         <DraggableListItem
//                           depth={depth || 0}
//                           item={item}
//                           key={item.uniqueId}
//                           itemMap={itemMap}
//                           boundingRef={boundingRef}
//                         />
//                       )}
//                     </div>
//                   )}
//                 </Draggable>
//               ))}
//               {providedList.placeholder}
//             </div>
//           )}
//         </Droppable>
//       </DragDropContext>
//     </div>
//   );
// };

// DraggableList.defaultProps = {
//   items: [],
//   itemMap: {},
//   depth: 1,
//   noStyles: false,
//   onChange: x => x,
//   group: '',
//   boundingRef: {},
//   customStyles: {},
// };

// DraggableList.propTypes = {
//   items: PropTypes.array,
//   onChange: PropTypes.func,
//   itemMap: PropTypes.object,
//   depth: PropTypes.number,
//   boundingRef: PropTypes.object,
//   itemGenerator: PropTypes.func.isRequired,
//   group: PropTypes.string,
//   noStyles: PropTypes.bool,
//   customStyles: PropTypes.object,
// };

// export default DraggableList;
