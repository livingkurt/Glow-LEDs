import * as React from "react";

const ContentWide = ({ style, children }) => {
  return (
    <main style={style} className="content_wide">
      {children}
    </main>
  );
};

export default ContentWide;
