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
    justifyContent: "center",
    margin: "20px auto"
  }

  const flex_styles = {
    height: "100%",
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    borderRadius: "20px",
    padding: "10px",
    marginBottom: "10px"
  }

  return (
    <BlockContainer class="home_container" styles={{ padding: "20px" }}>
      <FlexContainer h_center>
        <Title class="h1_title" styles={{ fontSize: 50, marginBottom: "3vh" }} >Welcome to Glow LEDs</Title>
      </FlexContainer>
      <FlexContainer h_center>
        <Title class="h2_title" styles={{ fontSize: 30 }} >Introducting Diffuser Caps</Title>
      </FlexContainer>
      <p className="p_descriptions" style={{ textAlign: "center" }}>
        Custom 3D Printed Caps that go over the Diffuser and Glove to bring your light shows to another dimmension
      </p>
      <p className="p_descriptions" style={{ textAlign: "center" }}>
        Watch the Video Below to See Them in Action
      </p>
      <FlexContainer h_center>
        <video id="caps_vid" style={{ height: "auto", maxWidth: "100%", borderRadius: "20px" }} controls>
          <source src="videos/MVI_9237.MP4" type="video/mp4" />
        </video>
      </FlexContainer>
      <FlexContainer h_center>
        <Link to="/category/Caps"><ButtonWord styles={{ fontSize: "2rem", margin: 20 }}><Title class="h2_title" styles={{ fontSize: 30 }} >Shop Diffuser Caps Today!</Title></ButtonWord></Link>
      </FlexContainer>
      <FlexContainer h_between wrap class="home_links">
        <Link to="/category/Caps" style={{ marginBottom: "16px" }}>
          <FlexContainer class="link_containers" column h_center t_center styles={flex_styles}>
            <Title class="h3_title" styles={heading_styles} >Diffuser Caps</Title>
            <img className="home_page_img" src="/images/product_images/Caps/IMG_9322.JPG" alt="diffuser_caps" ></img>
          </FlexContainer>
        </Link>
        <Link to="/category/Diffusers" style={{ marginBottom: "16px" }}>
          <FlexContainer class="link_containers" column h_center t_center styles={flex_styles}>
            <Title class="h3_title" styles={heading_styles} >Diffusers</Title>
            <img className="home_page_img" src="/images/product_images/15mm_Frosted_Dome_Diffusers/IMG_9301.JPG" alt="diffusers" ></img>
          </FlexContainer>
        </Link>
        <Link to="/category/Accessories" style={{ marginBottom: "16px" }}>
          <FlexContainer class="link_containers" column h_center t_center styles={flex_styles}>
            <Title class="h3_title" styles={heading_styles} >LED Accessories</Title>
            <img className="home_page_img" src="/images/product_images/Coin_Battery_Storage/IMG_9318.JPG" alt="accessories" ></img>
          </FlexContainer>
        </Link>

      </FlexContainer>
    </BlockContainer>
  )


}
export default HomePage;