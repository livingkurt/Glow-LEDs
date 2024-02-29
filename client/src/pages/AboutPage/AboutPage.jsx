import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";

import { Loading } from "../../shared/SharedComponents";
import useWindowDimensions from "../../shared/Hooks/useWindowDimensions";
import ReadMore from "../../shared/GlowLEDsComponents/GLReadMore/ReadMore";
import { SponsorItemD, SponsorItemM } from "../SponsorsGridPage/components";
import { TeamItemD, TeamItemM } from "../TeamsGridPage/components";
import * as API from "../../api";
import { EmployeeItemD, EmployeeItemM } from "./components";

const AboutPage = () => {
  const { width } = useWindowDimensions();

  const dispatch = useDispatch();

  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { affiliates, loading: loading_sponsors, error } = affiliatePage;

  const teamPage = useSelector(state => state.teams.teamPage);
  const { teams, loading: loading_team, error: error_team } = teamPage;

  const userPage = useSelector(state => state.users.userPage);
  const { users, loading_users } = userPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listAffiliates({ active: true, sponsor: true }));
      dispatch(API.listUsers({ is_employee: true, guest: false }));
      dispatch(API.listTeams({ rave_mob: false }));
    }
    return () => (clean = false);
  }, [dispatch]);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>About | Glow LEDs</title>
        <meta property="og:title" content="About" />
        <meta name="twitter:title" content="About" />
        <link rel="canonical" href="https://www.glow-leds.com/pages/about" />
        <meta property="og:url" content="https://www.glow-leds.com/pages/about" />
        <meta name="description" content="Learn how Glow LEDs got started and more in our About Page" />
        <meta property="og:description" content="Learn how Glow LEDs got started and more in our About Page" />
        <meta name="twitter:description" content="Learn how Glow LEDs got started and more in our About Page" />
      </Helmet>
      <div className="inner_content">
        <h1 style={{ fontSize: 40, textAlign: "center" }}>About Glow-LEDs</h1>
        <div>
          <ReadMore width={1000} length={100} pre={true} className="paragraph_font">
            Hi, my name is Kurt, I have been gloving since 2014 and I am the founder of Glow LEDs! Check out one of my
            most recent lightshows!{" "}
          </ReadMore>
          <div className="jc-c pos-rel mb-2rem">
            <div className="iframe-container">
              <iframe
                title="Content Video"
                width="996"
                height="560"
                style={{ borderRadius: "20px" }}
                src={`https://www.youtube.com/embed/pb3ob9iu7Jc`}
                frameborder="0"
                allowfullscreen
              />
            </div>
          </div>
          <h2 className="about_names" style={{ marginTop: 0, marginBottom: "25px" }}>
            The Beginning
          </h2>

          <div
            style={{
              float: width > 500 ? "right" : "unset",
              margin: "0 25px 25px 25px",
            }}
            className="about_pictures"
          >
            <img
              alt="Kurt"
              title="Founder Picture"
              style={{
                borderRadius: "15px",
                width: "100%",
                height: "auto",
                maxWidth: "400px",
                flex: "0 1 50%",
              }}
              src="https://thumbs2.imgbox.com/44/e2/kvjSm8xW_t.jpeg"
            />
          </div>
          <ReadMore width={700} length={200} pre={true} className="paragraph_font" style={{ flex: "0 1 30%" }}>
            From the very first time I saw a lightshow back in 2014 I was hooked! The ability to manipulate light with
            each finger individually is so fascinating and a lot to wrap your head around. So of course, my best friend
            and I began to learn to glove not too long after that first lightshow. We spent all day every day learning,
            finger rolls, liquid, whips, wave tuts, flails, all in order, we practiced each concept until they were
            perfect then moved to the next concept and so on. Over the years gloving has changed a lot, first it was
            finger rolls and whips, then wave tuts, and now its clusters! What new thing will come next? What makes
            gloving so amazing is the fact that you can do it anywhere, and I mean literally anywhere. Sitting on the
            bus, waiting at the bank, walking to the kitchen, literally anywhere!! With that ability you can become
            great in a very short amount of time. It almost seems like the new glovers are getting good faster than ever
            within just a few months now. What a beautiful thing.
          </ReadMore>
          <h2 className="about_names" style={{ marginTop: 0, marginBottom: "25px" }}>
            The Problem
          </h2>
          <div>
            <div
              style={{
                float: width > 500 ? "left" : "unset",
                margin: "0 25px 25px 0",
              }}
              className="about_pictures"
            >
              <img
                alt="Kurt"
                title="Founder Picture"
                style={{
                  borderRadius: "15px",
                  width: "100%",
                  height: "auto",
                  maxWidth: "400px",
                }}
                src="https://images2.imgbox.com/0b/b8/U2QAoKkr_o.jpeg"
              />
            </div>
            <ReadMore width={700} length={200} pre={true} className="paragraph_font">
              I've loved every aspect about gloving. The art form is so beautiful to do and to watch. The community is
              so welcoming and friendly, and you get to have this intimate connections with people you wouldn't normally
              get the chance to with. The only thing I have disliked is the companies that have been representing us as
              a community. It doesn't feel good to be left out, and forgotten about. The gloving community is in need of
              cool stuff to play with too! This art form is alive and well, and it saddened me to not even be able to
              find some of the most basic gear like frosted diffusers. I had a set of OG Frosted Dome Diffusers that I
              used exclusively for many years. I loved the way the light blends and the softness that the light becomes.
              So one year I was at Electric Forest and I noticed that my gloves were missing and I went running all
              across the giant field looking for them but I couldn't find them… My only set of Frosted Dome Diffusers
              were on those gloves too. A very sad day indeed. So when I got home I checked the popular gloving websites
              to buy some new domes and to my dismay they were not being sold anywhere! I just couldn't believe it.
            </ReadMore>
          </div>
          <h2 className="about_names" style={{ marginTop: 0, marginBottom: "25px" }}>
            The Solution
          </h2>
          <div>
            <div
              style={{
                float: width > 500 ? "right" : "unset",
                margin: "0 25px 25px 25px",
              }}
              className="about_pictures"
            >
              <img
                alt="Kurt"
                title="Founder Picture"
                style={{
                  borderRadius: "15px",
                  width: "100%",
                  height: "auto",
                  maxWidth: "400px",
                }}
                src="https://thumbs2.imgbox.com/49/ce/8dVk2o8D_t.jpeg"
              />
            </div>
            <ReadMore width={700} length={200} pre={true} className="paragraph_font ">
              Something needed to be done. Products just keep going out of stock without any new products to replace
              them. But gloving is not dying, it's growing more than ever. So I thought to myself, I need to try and do
              something about this. So then that next summer I bought a 3D printer, and you know what the first thing I
              made was? Frosted Dome Diffusers! It took a little bit to get right but once I got it right, the sky was
              the limit to what I could make, and the rest is history. Glow LEDs was born the moment I needed something
              that didn't exist, not only me but the entire gloving community. We all needed something we just didn't
              know what. It really felt at the time that no one was going to give it to us. I want to the be the one. I
              want to be the one that makes the gloving gear with the glover in mind. I want to make gloving gear that
              people aren't worried will sell out. Nothing sells out at Glow LEDs, everything is always available!
            </ReadMore>
          </div>
          <h2 className="about_names" style={{ marginTop: 0, marginBottom: "25px" }}>
            The Vision
          </h2>
          <div>
            <ReadMore width={700} length={200} pre={true} className="paragraph_font">
              If you're going to create, why not try to innovate. Or at least make it a little better haha. My mind is
              on a constant stream of what can I create that doesn't exist and what can I do to make something better.
              Glow LEDs is built on community needs and ideas. I am apart of this community just as much as you. I want
              our technology to improve as we do. The idea for Diffuser Caps was born out of this need. How can you have
              more complex designs and shapes to be recognizable when gloving? The breakthrough was putting the cap on
              the outside of the glove! That was our first really big idea and we haven't stopped there. We came out
              with Glowskinz after that, which have become a staple in the gloving community, as well as our upgraded
              Glowstringz V2. Giving a whole new look to back lighting for lightshows as well as home and festival
              decoration. Glow LEDs is always ready for suggestions on product ideas and product improvements. What's
              the point of selling a product that the community is not happy with? We love the progress and direct line
              communication with the people that matter. Thank you for all of the support and love. We will keep pushing
              the envelope to new heights for you. As long you keep glowing just as bright as you can!
            </ReadMore>
          </div>
          <h2 className="about_names ta-c fs-25px" style={{ marginTop: 0, marginBottom: "25px" }}>
            Welcome to the Glow LEDs Family! Can't wait to meet you all!
          </h2>
          <div
            style={{
              margin: "0 25px 25px 25px",
            }}
            className="about_pictures"
          >
            <img
              alt="Kurt"
              title="Founder Picture"
              style={{
                borderRadius: "15px",
                width: "100%",
                height: "auto",
              }}
              src="https://thumbs2.imgbox.com/74/18/uf9lTIoK_t.jpeg"
            />
          </div>
          <h2 className="about_names ta-c fs-25px" style={{ marginTop: 0, marginBottom: "25px" }}>
            Meet the Team
          </h2>

          <h2 className="about_names" style={{ marginTop: 0, marginBottom: "25px" }}>
            Sponsored Artists
          </h2>

          <Loading loading={loading_sponsors} error={error}>
            <div>
              <div className="product_big_screen">
                {affiliates && (
                  <ul className="products" style={{ marginTop: 0, textDecoration: "none" }}>
                    {affiliates?.map(
                      (affiliate, index) =>
                        !affiliate.hidden && <SponsorItemD size="300px" key={index} affiliate={affiliate} />
                    )}
                  </ul>
                )}
              </div>

              <div className="product_small_screen none">
                {affiliates && (
                  <ul className="products" style={{ marginTop: 0, textDecoration: "none" }}>
                    {affiliates?.map(
                      (affiliate, index) =>
                        !affiliate.hidden && <SponsorItemM size="300px" key={index} affiliate={affiliate} />
                    )}
                  </ul>
                )}
              </div>
            </div>
            {affiliates?.length === 0 && (
              <h2 style={{ textAlign: "center" }}>Sorry we can't find anything with that name</h2>
            )}
          </Loading>
          <h2 className="about_names" style={{ marginTop: 0, marginBottom: "25px" }}>
            Sponsored Teams
          </h2>

          <Loading loading={loading_team} error={error}>
            <div>
              <div className="product_big_screen">
                {teams && (
                  <ul className="products" style={{ marginTop: 0, textDecoration: "none" }}>
                    {teams?.map((team, index) => !team.hidden && <TeamItemD size="300px" key={index} team={team} />)}
                  </ul>
                )}
              </div>

              <div className="product_small_screen none">
                {teams && (
                  <ul className="products" style={{ marginTop: 0, textDecoration: "none" }}>
                    {teams?.map((team, index) => !team.hidden && <TeamItemM size="300px" key={index} team={team} />)}
                  </ul>
                )}
              </div>
            </div>
            {teams?.length === 0 && (
              <h2 style={{ textAlign: "center" }}>Sorry we can't find anything with that name</h2>
            )}
          </Loading>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
