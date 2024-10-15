import { Cart, Container, Content, Footer, Navbar, Sidebar } from "../../layouts";
import React, { useState } from "react";
import useWindowDimensions from "../Hooks/useWindowDimensions";

const MainLayout = ({ children }) => {
  const [visible, setVisible] = useState(true);
  const { height, width } = useWindowDimensions();
  return (
    <Container setVisible={setVisible} visible={visible}>
      <Navbar visible={visible} />
      <Cart visible={visible} height={height} width={width} />
      <Sidebar />
      <Content>{children}</Content>
      <Footer />
    </Container>
  );
};

export default MainLayout;
