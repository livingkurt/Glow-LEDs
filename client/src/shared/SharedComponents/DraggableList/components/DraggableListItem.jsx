// /* eslint-disable max-lines-per-function */
// /* eslint-disable jsx-a11y/no-static-element-interactions */
// /* eslint-disable jsx-a11y/click-events-have-key-events */
// import React, { useState, useRef, useEffect } from 'react';
// import PropTypes from 'prop-types';
// import uniqueId from 'lodash/uniqueId';
// import classNames from 'classnames';
// import humps from 'humps';
// import { Modal } from 'react-materialize';

// const DraggableListItem = ({ item, depth, boundingRef }) => {
//   const childType = (item.levels && 'level') || (item.objectives && 'objective') || (item.tasks && 'task');
//   const dropdown = useRef();

//   const [state, setState] = useState({
//     item,
//     children: item.levels || item.objectives || item.tasks,
//     children2: item.demo_steps,
//     childType,
//     expanded: false,
//     dropdownUniqueId: uniqueId(),
//   });

//   useEffect(() => {
//     M.Dropdown.init(dropdown.current, {
//       // hover: true,
//       container: boundingRef && boundingRef.current,
//       alignment: 'right',
//       constrainWidth: false,
//     });
//     return () => {};
//   }, [boundingRef]);

//   const collapseIcon = () => {
//     const { children, expanded } = state;

//     if (children && children.length > 0) {
//       return (
//         <span
//           style={{
//             float: 'right',
//             cursor: 'pointer',
//           }}
//           onClick={toggleChildrenCollapse}
//         >
//           <i
//             style={{
//               float: 'right',
//               cursor: 'pointer',
//             }}
//             className={classNames('material-icons', 'small')}
//           >
//             {expanded ? 'arrow_drop_down' : 'arrow_drop_up'}
//           </i>
//         </span>
//       );
//     }
//     return null;
//   };

//   const actionMenu = () => {
//     const { dropdownUniqueId } = state;
//     const resourceName = humps.decamelize(state.item.entity_type);
//     return (
//       <span
//         style={{
//           color: '#0b233a',
//           float: 'right',
//           cursor: 'pointer',
//           borderRadius: '14px',
//           ':hover': {
//             backgroundColor: '#d6d5d5',
//           },
//         }}
//       >
//         <a className="dropdown-trigger" href="#" ref={dropdown} data-target={`dropdown${dropdownUniqueId}`}>
//           <i
//             style={{
//               color: '#0b233a',
//               float: 'right',
//               cursor: 'pointer',
//               borderRadius: '14px',
//               ':hover': {
//                 backgroundColor: '#d6d5d5',
//               },
//             }}
//             className={classNames('material-icons', 'small')}
//           >
//             {'more_vert'}
//           </i>
//         </a>
//         <ul id={`dropdown${dropdownUniqueId}`} className="dropdown-content">
//           <li>
//             <a
//               href={`/admin/${resourceName}s/${state.item.id}/edit`}
//               target="_blank"
//               rel="noopener noreferrer"
//               style={{
//                 fontSize: '1rem',
//                 lineHeight: '1.5rem',
//                 color: '#3a4f41',
//                 display: 'block',
//                 padding: '14px 16px',
//               }}
//             >
//               {`Edit ${state.item.entity_type}`}
//             </a>
//           </li>
//           <li className="divider" tabIndex="-1" />
//           <li>
//             <a
//               href="#!"
//               style={{
//                 fontSize: '1rem',
//                 lineHeight: '1.5rem',
//                 color: '#3a4f41',
//                 display: 'block',
//                 padding: '14px 16px',
//               }}
//             >
//               {`Duplicate ${state.item.entity_type}`}
//             </a>
//           </li>
//           <li className="divider" tabIndex="-1" />
//           {state.childType && (
//             <li>
//               <Modal
//                 header={`Create new ${state.childType}`}
//                 trigger={
//                   <a
//                     href="#!"
//                     style={{
//                       fontSize: '1rem',
//                       lineHeight: '1.5rem',
//                       color: '#3a4f41',
//                       display: 'block',
//                       padding: '14px 16px',
//                     }}
//                   >
//                     {`Add new ${state.childType}`}
//                   </a>
//                 }
//               />
//             </li>
//           )}
//         </ul>
//       </span>
//     );
//   };

//   const toggleChildrenCollapse = () => {
//     const { expanded } = state;

//     setState({
//       expanded: !expanded,
//     });
//   };

//   const liClass = classNames('collection-item', 'ojt-black-text', 'ojt-grey', 'lighten-5');

//   return (
//     <li key={state.item.uniqueId} data-id={state.item.uniqueId} className={liClass}>
//       <div
//         styles={{
//           padding: '8px',
//           borderLeft: '8px solid',
//           marginLeft: '-12px',
//           marginTop: '-4px',
//           marginBottom: '-4px',
//           ...borderDepthColor(depth),
//         }}
//       >
//         {`${state.item.entity_type}:${state.item.name || state.item.num || state.item.description}`}
//         {collapseIcon()}
//         {actionMenu()}
//       </div>
//     </li>
//   );
// };

// DraggableListItem.defaultProps = {
//   depth: 1,
// };

// DraggableListItem.propTypes = {
//   depth: PropTypes.number,
//   item: PropTypes.object.isRequired,
//   boundingRef: PropTypes.object.isRequired,
// };

// const borderDepthColor = depth => {
//   let styling;
//   switch (depth) {
//     case 0:
//       styling = {
//         borderColor: '#818f86',
//       };
//       break;

//     case 1:
//       styling = {
//         borderColor: '#374b5d',
//       };
//       break;

//     case 2:
//       styling = {
//         borderColor: '#f34213',
//       };
//       break;

//     case 3:
//       styling = {
//         borderColor: '#03191e',
//       };
//       break;

//     default:
//       styling = {};
//   }
//   return styling;
// };

// export default DraggableListItem;
