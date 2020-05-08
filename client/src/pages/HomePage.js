import React from 'react';
import { Title, Label, ButtonWord } from "../components/UtilityComponents/index"
import { FlexContainer, BlockContainer } from "../components/ContainerComponents/index"
import { Link } from "react-router-dom";

function HomePage(props) {

  const flex_styles = {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center"
  }

  const heading_styles = {
    fontSize: 30,
    fontFamily: "logo_font"
  }

  return (
    <BlockContainer>
      <FlexContainer styles={{ justifyContent: "center" }}>
        <Title styles={{ fontSize: 50, fontFamily: "logo_font" }} >Welcome to Glow LEDs</Title>
      </FlexContainer>
      <FlexContainer styles={{ justifyContent: "space-around" }}>
        <Link to="/category/Diffusers">
          <FlexContainer styles={flex_styles}>
            <ButtonWord><Title styles={heading_styles} >Diffusers</Title></ButtonWord>
            <img className="home_page_img" src="/images/product_images/20mm_Frosted_Dome_Diffusers/IMG_9211.JPG" alt="diffusers" ></img>
          </FlexContainer>
        </Link>
        <Link to="/category/Accessories">
          <FlexContainer styles={flex_styles}>
            <ButtonWord><Title styles={heading_styles} >Accessories</Title></ButtonWord>
            <img className="home_page_img" src="/images/product_images/20mm_Frosted_Dome_Diffusers/IMG_9211.JPG" alt="diffusers" ></img>
          </FlexContainer>
        </Link>
        <Link to="/category/Infinity">
          <FlexContainer styles={flex_styles}>
            <ButtonWord><Title styles={heading_styles} >Infinity LED</Title></ButtonWord>
            <img className="home_page_img" src="/images/product_images/20mm_Frosted_Dome_Diffusers/IMG_9211.JPG" alt="diffusers" ></img>
          </FlexContainer>
        </Link>
      </FlexContainer>
    </BlockContainer>
  )


}
export default HomePage;