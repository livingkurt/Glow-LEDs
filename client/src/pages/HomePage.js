import React from 'react';
import { Title, Label, ButtonWord } from "../components/UtilityComponents/index"
import { FlexContainer, BlockContainer } from "../components/ContainerComponents/index"
import { Link } from "react-router-dom";

function HomePage(props) {

  return (
    <BlockContainer>
      <FlexContainer styles={{ justifyContent: "center" }}>
        <Title styles={{ fontSize: 50 }} >Welcome to Glow LEDs</Title>
      </FlexContainer>
      <FlexContainer styles={{ justifyContent: "center" }}>
        <p>
          Content
          <Link to="/category/Diffusers">
            <ButtonWord>Diffusers</ButtonWord>
          </Link>
          <Link to="/category/Accessories">
            <ButtonWord>Accessories</ButtonWord>
          </Link>
          <Link to="/category/Infinity">
            <ButtonWord>Infinity LED</ButtonWord>
          </Link>
        </p>
      </FlexContainer>
    </BlockContainer>
  )


}
export default HomePage;