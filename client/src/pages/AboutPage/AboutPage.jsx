import React from "react";
import { Container, Typography, Box, useTheme, useMediaQuery } from "@mui/material";

import HeroVideo from "../HomePage/components/HeroVideo";
import AboutPageHeader from "./components/AboutPageHeader";

const AboutPage = () => {
  const theme = useTheme();
  const isLarge = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <>
      <AboutPageHeader />
      <Box py={2}>
        <Typography variant="h1" align="center" gutterBottom>
          About Glow-LEDs
        </Typography>
        <Typography variant="subtitle1" gutterBottom textAlign="center">
          Hi, my name is Kurt, I have been gloving since 2014 and I am the founder of Glow LEDs! Check out one of my
          lightshows!
        </Typography>

        <Box mb={2}>
          <HeroVideo video={"pb3ob9iu7Jc"} video_hidden={false} />
        </Box>
        <Container maxWidth="lg">
          <Box display="flex" flexDirection={{ xs: "column", lg: "row" }} alignItems="center" mb={2}>
            <Box flexGrow={1} mr={{ md: 2 }}>
              <Typography variant="h2" gutterBottom>
                The Beginning
              </Typography>
              <Typography variant="body1" paragraph>
                From the very first time I saw a lightshow back in 2014 I was hooked! The ability to manipulate light
                with each finger individually is so fascinating and a lot to wrap your head around. So of course, my
                best friend and I began to learn to glove not too long after that first lightshow. We spent all day
                every day learning, finger rolls, liquid, whips, wave tuts, flails, all in order, we practiced each
                concept until they were perfect then moved to the next concept and so on. Over the years gloving has
                changed a lot, first it was finger rolls and whips, then wave tuts, and now its clusters! What new thing
                will come next? What makes gloving so amazing is the fact that you can do it anywhere, and I mean
                literally anywhere. Sitting on the bus, waiting at the bank, walking to the kitchen, literally
                anywhere!! With that ability you can become great in a very short amount of time. It almost seems like
                the new glovers are getting good faster than ever within just a few months now. What a beautiful thing.
              </Typography>
            </Box>
            <Box flexShrink={0} ml={{ md: 2 }} mb={{ xs: 2, md: 0 }}>
              <img
                alt="Gloving Trail"
                style={{
                  borderRadius: "15px",
                  width: "100%",
                  height: "auto",
                  aspectRatio: isLarge ? "16/9" : "9/16",
                  objectFit: "cover",
                  maxWidth: "600px",
                }}
                src="https://thumbs2.imgbox.com/44/e2/kvjSm8xW_t.jpeg"
              />
            </Box>
          </Box>

          <Box display="flex" flexDirection={{ xs: "column", lg: "row" }} alignItems="center" mb={2}>
            {!isLarge && (
              <Box flexShrink={0} mr={{ md: 2 }} mb={{ xs: 2, md: 0 }}>
                <img
                  alt="Gloving Trail"
                  style={{
                    borderRadius: "15px",
                    width: "100%",
                    height: "auto",
                    aspectRatio: isLarge ? "16/9" : "9/16",
                    objectFit: "cover",
                    maxWidth: "600px",
                  }}
                  src="https://images2.imgbox.com/0b/b8/U2QAoKkr_o.jpeg"
                />
              </Box>
            )}
            <Box flexGrow={1} ml={{ md: 2 }}>
              <Typography variant="h2" gutterBottom>
                The Problem
              </Typography>
              <Typography variant="body1" paragraph>
                I've loved every aspect about gloving. The art form is so beautiful to do and to watch. The community is
                so welcoming and friendly, and you get to have this intimate connections with people you wouldn't
                normally get the chance to with. The only thing I have disliked is the companies that have been
                representing us as a community. It doesn't feel good to be left out, and forgotten about. The gloving
                community is in need of cool stuff to play with too! This art form is alive and well, and it saddened me
                to not even be able to find some of the most basic gear like frosted diffusers. I had a set of OG
                Frosted Dome Diffusers that I used exclusively for many years. I loved the way the light blends and the
                softness that the light becomes. So one year I was at Electric Forest and I noticed that my gloves were
                missing and I went running all across the giant field looking for them but I couldn't find them… My only
                set of Frosted Dome Diffusers were on those gloves too. A very sad day indeed. So when I got home I
                checked the popular gloving websites to buy some new domes and to my dismay they were not being sold
                anywhere! I just couldn't believe it.
              </Typography>
            </Box>
            {isLarge && (
              <Box flexShrink={0} mr={{ md: 2 }} mb={{ xs: 2, md: 0 }}>
                <img
                  alt="Gloving Trail"
                  style={{
                    borderRadius: "15px",
                    width: "100%",
                    height: "auto",
                    aspectRatio: isLarge ? "16/9" : "9/16",
                    objectFit: "cover",
                    maxWidth: "600px",
                  }}
                  src="https://images2.imgbox.com/0b/b8/U2QAoKkr_o.jpeg"
                />
              </Box>
            )}
          </Box>

          <Box display="flex" flexDirection={{ xs: "column", lg: "row" }} alignItems="center" mb={2}>
            <Box flexGrow={1} mr={{ md: 2 }}>
              <Typography variant="h2" gutterBottom>
                The Solution
              </Typography>
              <Typography variant="body1" paragraph>
                Something needed to be done. Products just keep going out of stock without any new products to replace
                them. But gloving is not dying, it's growing more than ever. So I thought to myself, I need to try and
                do something about this. So then that next summer I bought a 3D printer, and you know what the first
                thing I made was? Frosted Dome Diffusers! It took a little bit to get right but once I got it right, the
                sky was the limit to what I could make, and the rest is history. Glow LEDs was born the moment I needed
                something that didn't exist, not only me but the entire gloving community. We all needed something we
                just didn't know what. It really felt at the time that no one was going to give it to us. I want to the
                be the one. I want to be the one that makes the gloving gear with the glover in mind. I want to make
                gloving gear that people aren't worried will sell out. Nothing sells out at Glow LEDs, everything is
                always available!
              </Typography>
            </Box>
            <Box flexShrink={0} ml={{ md: 2 }} mb={{ xs: 2, md: 0 }}>
              <img
                alt="Kurt"
                style={{
                  borderRadius: "15px",
                  width: "100%",
                  height: "auto",
                  aspectRatio: isLarge ? "16/9" : "9/16",
                  objectFit: "cover",
                  maxWidth: "600px",
                }}
                src="https://thumbs2.imgbox.com/49/ce/8dVk2o8D_t.jpeg"
              />
            </Box>
          </Box>

          <Typography variant="h2" gutterBottom>
            The Vision
          </Typography>
          <Typography variant="body1" paragraph>
            If you're going to create, why not try to innovate. Or at least make it a little better haha. My mind is on
            a constant stream of what can I create that doesn't exist and what can I do to make something better. Glow
            LEDs is built on community needs and ideas. I am apart of this community just as much as you. I want our
            technology to improve as we do. The idea for Diffuser Caps was born out of this need. How can you have more
            complex designs and shapes to be recognizable when gloving? The breakthrough was putting the cap on the
            outside of the glove! That was our first really big idea and we haven't stopped there. We came out with
            Glowskinz after that, which have become a staple in the gloving community, as well as our upgraded
            Glowstringz V2. Giving a whole new look to back lighting for lightshows as well as home and festival
            decoration. Glow LEDs is always ready for suggestions on product ideas and product improvements. What's the
            point of selling a product that the community is not happy with? We love the progress and direct line
            communication with the people that matter. Thank you for all of the support and love. We will keep pushing
            the envelope to new heights for you. As long you keep glowing just as bright as you can!
          </Typography>

          <Box textAlign="center" my={2}>
            <Typography variant="h4">Welcome to the Glow LEDs Family! Can't wait to meet you all!</Typography>
            <Box mt={2}>
              <img
                alt="Kurt"
                style={{
                  borderRadius: "15px",
                  width: "100%",
                  height: "auto",
                  aspectRatio: "16/9",
                  objectFit: "cover",
                }}
                src="https://thumbs2.imgbox.com/74/18/uf9lTIoK_t.jpeg"
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default AboutPage;
