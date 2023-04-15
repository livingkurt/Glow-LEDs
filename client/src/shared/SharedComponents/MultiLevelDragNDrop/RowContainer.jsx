// Define the dnd-container component for the rows
const RowContainer = ({ rows, onRowDrop }) => {
  const handleRowDrop = item => {
    // Update the order of the rows
    onRowDrop(item);
  };

  return (
    <div>
      {rows.map((row, index) => (
        <Row key={row.id} id={row.id} order={index}>
          {row.content}
        </Row>
      ))}
      <RowTarget onDrop={handleRowDrop} />
    </div>
  );
};
