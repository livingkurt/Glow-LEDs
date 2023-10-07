import { Cart, Container, Content, Footer, Header, Sidebar } from "../../layouts";
import React, { useState } from "react";
import { isBrowser } from "react-device-detect";
import Headroom from "react-headroom";
import useWindowDimensions from "../Hooks/windowDimensions";

const MainLayout = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const { height, width } = useWindowDimensions();
  return (
    <Container setVisible={setVisible} visible={visible}>
      {isBrowser && width > 1158 && height > 900 ? (
        <Headroom>
          <Header visible={visible} />
        </Headroom>
      ) : (
        <Header visible={visible} />
      )}
      <Cart visible={visible} height={height} width={width} />
      <Sidebar />
      <Content>{children}</Content>
      <Footer />
    </Container>
  );
};

export default MainLayout;
