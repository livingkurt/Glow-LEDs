import React, { useEffect } from 'react';
import { Title, Label, ButtonWord } from "../components/UtilityComponents/index"
import { FlexContainer, BlockContainer } from "../components/ContainerComponents/index"
import { Link } from "react-router-dom";

function HomePage(props) {

  useEffect(() => {
    const video = document.getElementById("caps_vid")
    video.muted = true
    video.autoplay = true
  }, []);

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
        <Title styles={{ fontSize: 50, fontFamily: "logo_font", marginBottom: 0 }} >Welcome to Glow LEDs</Title>
      </FlexContainer>
      <FlexContainer styles={{ justifyContent: "center" }}>
        <Title styles={{ fontSize: 30, fontFamily: "logo_font" }} >Introducting Diffuser Caps</Title>
      </FlexContainer>
      <p style={{ textAlign: "center" }}>
        Custom 3D Printed Caps that go over the Diffuser and Glove to bring your light shows to another dimmension
      </p>
      <p style={{ textAlign: "center" }}>
        Watch the Video Below to See Them in Action
      </p>
      <FlexContainer styles={{ justifyContent: "center" }}>
        <video id="caps_vid" style={{ height: "auto", maxWidth: "100%", borderRadius: "20px" }} controls autoplay>
          <source src="videos/MVI_9237.MP4" type="video/mp4" />
        </video>
      </FlexContainer>
      <p style={{ textAlign: "center" }}>
        <Link to="/category/Caps"><ButtonWord>Shop Diffuser Caps Today!</ButtonWord></Link>
      </p>
      <FlexContainer styles={{ justifyContent: "space-between" }}>
        <Link to="/category/Caps">
          <FlexContainer styles={flex_styles}>
            <ButtonWord><Title styles={heading_styles} >Diffuser Caps</Title></ButtonWord>
            <img className="home_page_img" src="/images/product_images/Caps/IMG_9322.JPG" alt="diffuser_caps" ></img>
          </FlexContainer>
        </Link>
        <Link to="/category/Diffusers">
          <FlexContainer styles={flex_styles}>
            <ButtonWord><Title styles={heading_styles} >Diffusers</Title></ButtonWord>
            <img className="home_page_img" src="/images/product_images/15mm_Frosted_Dome_Diffusers/IMG_9301.JPG" alt="diffusers" ></img>
          </FlexContainer>
        </Link>
        <Link to="/category/Accessories">
          <FlexContainer styles={flex_styles}>
            <ButtonWord><Title styles={heading_styles} >LED Accessories</Title></ButtonWord>
            <img className="home_page_img" src="/images/product_images/Coin_Battery_Storage/IMG_9318.JPG" alt="accessories" ></img>
          </FlexContainer>
        </Link>

      </FlexContainer>
    </BlockContainer>
  )


}
export default HomePage;