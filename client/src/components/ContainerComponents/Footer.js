import React from 'react'

const Footer = (props) => {

  const footer_styles = {
    gridArea: "footer",
    backgroundColor: "#333333",
    color: "#ffffff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: "50px"
  }

  return (
    <footer style={{ ...footer_styles, ...props.styles }}>
      © 2020 Glow LEDs. All Rights Reserved
    </footer>
  );
}

export default Footer;
