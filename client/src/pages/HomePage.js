import React from 'react';
import { Title, Label, ButtonWord } from "../components/UtilityComponents/index"
import { FlexContainer } from "../components/ContainerComponents/index"

function HomePage(props) {

  return (
    <FlexContainer styles={{ justifyContent: "center" }}>
      <Title styles={{ fontSize: 50 }} >Welcome to Glow LEDs</Title>

    </FlexContainer>
  )


}
export default HomePage;