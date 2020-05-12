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

  return (
    <BlockContainer styles={{ padding: "30px" }}>
      <FlexContainer styles={{ justifyContent: "center" }}>
        <Title styles={{ fontSize: 50, fontFamily: "logo_font", marginBottom: 0 }} >Welcome to Glow LEDs</Title>
      </FlexContainer>
      <FlexContainer styles={{ justifyContent: "center" }}>
        <Title styles={{ fontSize: 30, fontFamily: "logo_font" }} >Introducting Diffuser Caps</Title>
      </FlexContainer>
      <p style={{ textAlign: "center" }}>
        To Take Gloving to New Heights!
      </p>
      <p style={{ textAlign: "center" }}>
        Watch the Video Below to See Them in Action
      </p>
      <FlexContainer styles={{ justifyContent: "center" }}>
        <video id="caps_vid" style={{ height: "auto", width: "100%", borderRadius: "20px" }} controls autoplay>
          <source src="videos/MVI_9237.MP4" type="video/mp4" />
        </video>
      </FlexContainer>
      <p style={{ textAlign: "center" }}>
        <Link to="/category/Caps"><ButtonWord>Shop Diffuser Caps Today!</ButtonWord></Link>
      </p>
    </BlockContainer>
  )


}
export default HomePage;