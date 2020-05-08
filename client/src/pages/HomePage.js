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
    <BlockContainer styles={{ padding: "30px" }}>
      <FlexContainer styles={{ justifyContent: "center" }}>
        <Title styles={{ fontSize: 50, fontFamily: "logo_font" }} >Welcome to Glow LEDs</Title>
      </FlexContainer>
      <p style={{ textAlign: "center" }}>
        Hello to all my ravers out there!
      </p>
      <p style={{ textAlign: "center" }}>
        My name is Kurt and I have some cool things that I have made that I want to share with you.
      </p>
      <p style={{ textAlign: "center" }}>
        Using Fusion 360 to design and my Prusa i3 MK3s 3D Printer to print. I have created a line of Microlight Diffusers that will add new  dimmention to your lightshows
      </p>
      <FlexContainer styles={{ justifyContent: "space-between" }}>
        <Link to="/category/Diffusers">
          <FlexContainer styles={flex_styles}>
            <ButtonWord><Title styles={heading_styles} >Diffusers</Title></ButtonWord>
            <img className="home_page_img" src="/images/product_images/20mm_Frosted_Dome_Diffusers/IMG_9211.JPG" alt="diffusers" ></img>
          </FlexContainer>
        </Link>
        <Link to="/category/Accessories">
          <FlexContainer styles={flex_styles}>
            <ButtonWord><Title styles={heading_styles} >LED Accessories</Title></ButtonWord>
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