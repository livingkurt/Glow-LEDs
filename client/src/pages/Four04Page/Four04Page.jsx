import React from "react";
import { Helmet } from "react-helmet";
import MultiLevelDragNDrop from "../../shared/SharedComponents/MultiLevelDragNDrop/MultiLevelDragNDrop";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Four04Page = props => {
  return (
    <div className="jc-c column ta-c">
      <Helmet>
        <title>404 Not Found | Glow LEDs</title>
        <meta property="og:title" content="404 Not Found" />
        <meta property="og:url" content="https://www.glow-leds.com" />

        <meta name="twitter:title" content="404 Not Found" />
      </Helmet>
      <h1 style={{ margin: "20px auto" }}>404 Page Not Found</h1>
      <label>Sorry About that</label>
      {/* <DndProvider backend={HTML5Backend}> */}
      {/* <MultiLevelDragNDrop /> */}
      {/* </DndProvider> */}
    </div>
  );
};
export default Four04Page;
