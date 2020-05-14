// React
import React from "react";
// Styles
import './slideshow.css'


const Slideshow = (props) => {

  return (
    <div>
      {
        props.images.map((image, index) =>
          <img key={index} src={image} alt={image} />
        )
      }
    </div>
  );
}

export default Slideshow;

