// Define the dnd-container component for the sections
const SectionContainer = ({ sections, onSectionDrop, onRowDrop }) => {
  const handleSectionDrop = item => {
    // Update the order of the sections
    onSectionDrop(item);
  };

  const handleRowDrop = item => {
    // Update the order of the rows within the section
    onRowDrop(item);
  };

  return (
    <div>
      {sections.map((section, index) => (
        <Section key={section.id} id={section.id} order={index}>
          <RowContainer rows={section.rows} onRowDrop={item => handleRowDrop({ ...item, sectionId: section.id })} />
        </Section>
      ))}
      <SectionTarget onDrop={handleSectionDrop} />
    </div>
  );
};
