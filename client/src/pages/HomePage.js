import React, { useEffect } from 'react';
import { Title, ButtonWord } from "../components/UtilityComponents/index"
import { FlexContainer, BlockContainer } from "../components/ContainerComponents/index"
import { Link } from "react-router-dom";

function HomePage(props) {

  useEffect(() => {
    const video = document.getElementById("caps_vid")
    video.muted = true
    video.autoplay = true
  }, []);



  const heading_styles = {
    fontSize: 30,
    fontFamily: "logo_font"
  }

  return (
    <BlockContainer styles={{ padding: "30px" }}>
      <FlexContainer h_center>
        <Title styles={{ fontSize: 50, fontFamily: "logo_font", marginBottom: 0 }} >Welcome to Glow LEDs</Title>
      </FlexContainer>
      <FlexContainer h_center>
        <Title styles={{ fontSize: 30, fontFamily: "logo_font" }} >Introducting Diffuser Caps</Title>
      </FlexContainer>
      <p style={{ textAlign: "center" }}>
        Custom 3D Printed Caps that go over the Diffuser and Glove to bring your light shows to another dimmension
      </p>
      <p style={{ textAlign: "center" }}>
        Watch the Video Below to See Them in Action
      </p>
      <FlexContainer h_center>
        <video id="caps_vid" style={{ height: "auto", maxWidth: "100%", borderRadius: "20px" }} controls>
          <source src="videos/MVI_9237.MP4" type="video/mp4" />
        </video>
      </FlexContainer>
      <FlexContainer h_center>
        <Link to="/category/Caps"><ButtonWord>Shop Diffuser Caps Today!</ButtonWord></Link>
      </FlexContainer>
      <FlexContainer h_between wrap>
        <Link to="/category/Caps">
          <FlexContainer column h_center styles={{ height: "100%", textAlign: "center" }}>
            <ButtonWord><Title styles={heading_styles} >Diffuser Caps</Title></ButtonWord>
            <img className="home_page_img" src="/images/product_images/Caps/IMG_9322.JPG" alt="diffuser_caps" ></img>
          </FlexContainer>
        </Link>
        <Link to="/category/Diffusers">
          <FlexContainer column h_center styles={{ height: "100%", textAlign: "center" }}>
            <ButtonWord><Title styles={heading_styles} >Diffusers</Title></ButtonWord>
            <img className="home_page_img" src="/images/product_images/15mm_Frosted_Dome_Diffusers/IMG_9301.JPG" alt="diffusers" ></img>
          </FlexContainer>
        </Link>
        <Link to="/category/Accessories">
          <FlexContainer column h_center styles={{ height: "100%", textAlign: "center" }}>
            <ButtonWord><Title styles={heading_styles} >LED Accessories</Title></ButtonWord>
            <img className="home_page_img" src="/images/product_images/Coin_Battery_Storage/IMG_9318.JPG" alt="accessories" ></img>
          </FlexContainer>
        </Link>

      </FlexContainer>
    </BlockContainer>
  )


}
export default HomePage;