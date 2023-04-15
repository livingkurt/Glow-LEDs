// import { useState } from "react";
// import { useDrag, useDrop } from "react-dnd";
//

// // Define the drag and drop types
// const Types = {
//   SECTION: "section",
//   ROW: "row"
// };

// // Define the section component
// const Section = ({ id, order, children }) => {
//   const [{ isDragging }, drag] = useDrag({
//     item: { id, order },
//     type: Types.SECTION,
//     collect: monitor => ({
//       isDragging: monitor.isDragging()
//     })
//   });

//   return (
//     <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
//       {children}
//     </div>
//   );
// };

// // Define the row component
// const Row = ({ id, order, children }) => {
//   const [{ isDragging }, drag] = useDrag({
//     item: { id, order },
//     type: Types.ROW,
//     collect: monitor => ({
//       isDragging: monitor.isDragging()
//     })
//   });

//   return (
//     <div ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
//       {children}
//     </div>
//   );
// };

// // Define the section drop target
// const SectionTarget = ({ onDrop, children }) => {
//   const [{ isOver }, drop] = useDrop({
//     accept: Types.SECTION,
//     drop: item => onDrop(item),
//     collect: monitor => ({
//       isOver: monitor.isOver()
//     })
//   });

//   return (
//     <div ref={drop} style={{ backgroundColor: isOver ? "green" : "white" }}>
//       {children}
//     </div>
//   );
// };

// // Define the row drop target
// // Define the row drop target
// const RowTarget = ({ onDrop, children }) => {
//   const [{ isOver }, drop] = useDrop({
//     accept: Types.ROW,
//     drop: item => onDrop(item),
//     collect: monitor => ({
//       isOver: monitor.isOver()
//     })
//   });

//   return (
//     <div ref={drop} style={{ backgroundColor: isOver ? "yellow" : "white" }}>
//       {children}
//     </div>
//   );
// };

// // Define the dnd-container component for the sections
// const SectionContainer = ({ sections, onSectionDrop, onRowDrop }) => {
//   const handleSectionDrop = item => {
//     // Update the order of the sections
//     onSectionDrop(item);
//   };

//   const handleRowDrop = item => {
//     // Update the order of the rows within the section
//     onRowDrop(item);
//   };

//   return (
//     <div>
//       {sections.map((section, index) => (
//         <Section key={section.id} id={section.id} order={index}>
//           <RowContainer rows={section.rows} onRowDrop={item => handleRowDrop({ ...item, sectionId: section.id })} />
//         </Section>
//       ))}
//       <SectionTarget onDrop={handleSectionDrop} />
//     </div>
//   );
// };

// // Define the dnd-container component for the rows
// const RowContainer = ({ rows, onRowDrop }) => {
//   const handleRowDrop = item => {
//     // Update the order of the rows
//     onRowDrop(item);
//   };

//   return (
//     <div>
//       {rows.map((row, index) => (
//         <Row key={row.id} id={row.id} order={index}>
//           {row.content}
//         </Row>
//       ))}
//       <RowTarget onDrop={handleRowDrop} />
//     </div>
//   );
// };

// // Render the app with the dnd-container component for the sections
// const App = () => {
//   const [sections, setSections] = useState([
//     {
//       id: 1,
//       rows: [
//         { id: 1, content: "Row 1" },
//         { id: 2, content: "Row 2" }
//       ]
//     },
//     {
//       id: 2,
//       rows: [
//         { id: 3, content: "Row 3" },
//         { id: 4, content: "Row 4" }
//       ]
//     }
//   ]);

//   const handleSectionDrop = item => {
//     // Reorder the sections
//     const newSections = [...sections];
//     const { id, order } = item;
//     const section = newSections.find(s => s.id === id);
//     newSections.splice(section.order, 1);
//     newSections.splice(order, 0, section);
//     setSections(newSections);
//   };

//   const handleRowDrop = item => {
//     // Reorder the rows within the section
//     const newSections = [...sections];
//     const { sectionId, id, order } = item;
//     const section = newSections.find(s => s.id === sectionId);
//     const row = section.rows.find(r => r.id === id);
//     section.rows.splice(row.order, 1);
//     section.rows.splice(order, 0, row);
//     setSections(newSections);
//   };

//   return <SectionContainer sections={sections} onSectionDrop={handleSectionDrop} onRowDrop={handleRowDrop} />;
// };

// export default App;
import React, { useEffect, useRef, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";
import "./App.css";

export const COLUMN_NAMES = {
  DO_IT: "Do it",
  IN_PROGRESS: "In Progress",
  AWAITING_REVIEW: "Awaiting review",
  DONE: "Done"
};

const { DO_IT } = COLUMN_NAMES;
export const tasks = [
  { id: 1, name: "Item 1", column: DO_IT },
  { id: 2, name: "Item 2", column: DO_IT },
  { id: 3, name: "Item 3", column: DO_IT },
  { id: 4, name: "Item 4", column: DO_IT }
];

const MovableItem = ({ name, index, currentColumnName, moveCardHandler, setItems }) => {
  const changeItemColumn = (currentItem, columnName) => {
    setItems(prevState => {
      return prevState.map(e => {
        return {
          ...e,
          column: e.name === currentItem.name ? columnName : e.column
        };
      });
    });
  };

  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "Our first type",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCardHandler(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    }
  });

  const [{ isDragging }, drag] = useDrag({
    type: "Our first type",
    item: { index, name, currentColumnName },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult();

      if (dropResult) {
        const { name } = dropResult;
        const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES;
        switch (name) {
          case IN_PROGRESS:
            changeItemColumn(item, IN_PROGRESS);
            break;
          case AWAITING_REVIEW:
            changeItemColumn(item, AWAITING_REVIEW);
            break;
          case DONE:
            changeItemColumn(item, DONE);
            break;
          case DO_IT:
            changeItemColumn(item, DO_IT);
            break;
          default:
            break;
        }
      }
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    })
  });

  const opacity = isDragging ? 0.4 : 1;

  drag(drop(ref));

  return (
    <div ref={ref} className="movable-item" style={{ opacity }}>
      {name}
    </div>
  );
};

const Column = ({ children, className, title }) => {
  console.log({ title });
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: "Our first type",
    drop: () => ({ name: title }),
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    }),
    // Override monitor.canDrop() function
    canDrop: item => {
      const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES;
      const { currentColumnName } = item;
      return (
        currentColumnName === title ||
        (currentColumnName === DO_IT && title === IN_PROGRESS) ||
        (currentColumnName === IN_PROGRESS && (title === DO_IT || title === AWAITING_REVIEW)) ||
        (currentColumnName === AWAITING_REVIEW && (title === IN_PROGRESS || title === DONE)) ||
        (currentColumnName === DONE && title === AWAITING_REVIEW)
      );
    }
  });

  const getBackgroundColor = () => {
    if (isOver) {
      if (canDrop) {
        return "rgb(188,251,255)";
      } else if (!canDrop) {
        return "rgb(255,188,188)";
      }
    } else {
      return "";
    }
  };

  return (
    <div ref={drop} className={className} style={{ backgroundColor: getBackgroundColor() }}>
      <p>{title}</p>
      {children}
    </div>
  );
};

const App = () => {
  const [items, setItems] = useState(tasks);
  const isMobile = window.innerWidth < 600;

  const moveCardHandler = (dragIndex, hoverIndex) => {
    const dragItem = items[dragIndex];

    if (dragItem) {
      setItems(prevState => {
        const coppiedStateArray = [...prevState];

        // remove item by "hoverIndex" and put "dragItem" instead
        const prevItem = coppiedStateArray.splice(hoverIndex, 1, dragItem);

        // remove item by "dragIndex" and put "prevItem" instead
        coppiedStateArray.splice(dragIndex, 1, prevItem[0]);

        return coppiedStateArray;
      });
    }
  };

  const returnItemsForColumn = columnName => {
    return items
      .filter(item => item.column === columnName)
      .map((item, index) => (
        <MovableItem
          key={item.id}
          name={item.name}
          currentColumnName={item.column}
          setItems={setItems}
          index={index}
          moveCardHandler={moveCardHandler}
        />
      ));
  };

  const { DO_IT, IN_PROGRESS, AWAITING_REVIEW, DONE } = COLUMN_NAMES;

  return (
    <div className="dnd-container">
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        <Column title={DO_IT} className="dnd-column do-it-column">
          {returnItemsForColumn(DO_IT)}
        </Column>
        <Column title={IN_PROGRESS} className="dnd-column in-progress-column">
          {returnItemsForColumn(IN_PROGRESS)}
        </Column>
        <Column title={AWAITING_REVIEW} className="dnd-column awaiting-review-column">
          {returnItemsForColumn(AWAITING_REVIEW)}
        </Column>
        <Column title={DONE} className="dnd-column done-column">
          {returnItemsForColumn(DONE)}
        </Column>
      </DndProvider>
    </div>
  );
};

export default App;
