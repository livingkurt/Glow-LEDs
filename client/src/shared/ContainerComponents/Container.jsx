const Container = ({ children, style }) => {
  return (
    <div style={style} className="fade_in">
      {children}
    </div>
  );
};

export default Container;
