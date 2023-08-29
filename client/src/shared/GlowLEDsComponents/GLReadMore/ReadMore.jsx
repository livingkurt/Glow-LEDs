import React, { useState } from "react";
import { GLButton } from "..";
import useWindowDimensions from "../../Hooks/windowDimensions";

const ReadMore = ({ children, className, style, length, pre }) => {
  const [show_text, set_show_text] = useState(false);
  const { height, width } = useWindowDimensions();

  //
  return (
    <div>
      {children && children.length > length && width < width ? (
        <div>
          {pre ? (
            <pre className={className} style={style}>
              {show_text ? children : `${children.slice(0, length)}...`}{" "}
            </pre>
          ) : (
            <p className={className} style={style}>
              {show_text ? children : `${children.slice(0, length)}...`}{" "}
            </p>
          )}

          <GLButton
            variant="primary"
            className="mb-2rem"
            onClick={() => set_show_text(show => (show === true ? false : true))}
          >
            {show_text ? "Read Less" : "Read More"}
          </GLButton>
        </div>
      ) : (
        <div>
          {pre ? <pre className="paragraph_font">{children}</pre> : <p className="paragraph_font">{children}</p>}
        </div>
      )}
    </div>
  );
};

export default ReadMore;
