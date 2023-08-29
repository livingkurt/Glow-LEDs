// React
import * as React from "react";

const Content = ({ style, children }) => {
  return (
    <main style={style} className="content">
      {children}
    </main>
  );
};

export default Content;
