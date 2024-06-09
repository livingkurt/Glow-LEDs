import React from "react";

const Content = ({ style, children }) => {
  return (
    <main style={style} className="outer-content">
      <div className="content">{children}</div>
    </main>
  );
};

export default Content;
