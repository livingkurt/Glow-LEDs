import React from 'react';
import { Title, Label, ButtonWord } from "../components/UtilityComponents/index"
import { FlexContainer, BlockContainer } from "../components/ContainerComponents/index"

function HomePage(props) {

  return (
    <BlockContainer>
      <FlexContainer styles={{ justifyContent: "center" }}>
        <Title styles={{ fontSize: 50 }} >Welcome to Glow LEDs</Title>
      </FlexContainer>
      <FlexContainer styles={{ justifyContent: "center" }}>
        <p>
          Content
        </p>
      </FlexContainer>
    </BlockContainer>
  )


}
export default HomePage;