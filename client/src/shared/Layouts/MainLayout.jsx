import { Cart, Container, Content, Footer, Header, Sidebar } from "../../layouts";
import React, { useState } from "react";
import useWindowDimensions from "../Hooks/useWindowDimensions";

const MainLayout = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const { height, width } = useWindowDimensions();
  return (
    <Container setVisible={setVisible} visible={visible}>
      <Header visible={visible} />
      <Cart visible={visible} height={height} width={width} />
      <Sidebar />
      <Content>{children}</Content>
      <Footer />
    </Container>
  );
};

export default MainLayout;
