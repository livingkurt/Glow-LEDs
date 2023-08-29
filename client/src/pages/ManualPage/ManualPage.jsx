import * as React from "react";
import { Link, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { humanize, manuals, toCapitalize } from "../../utils/helper_functions";
import { GLButton } from "../../shared/GlowLEDsComponents";

const ManualPage = () => {
  const params = useParams();
  const pathname = params.pathname;

  return (
    <div className="main_container">
      <Helmet>
        <title>Manual | Glow LEDs</title>
        <meta property="og:title" content="Manual" />
        <meta name="twitter:title" content="Manual" />
        <link rel="canonical" href="https://www.glow-leds.com/pages/about" />
        <meta property="og:url" content="https://www.glow-leds.com/pages/about" />
        <meta name="description" content="Learn how Glow LEDs got started and more in our Manual Page" />
        <meta property="og:description" content="Learn how Glow LEDs got started and more in our Manual Page" />
        <meta name="twitter:description" content="Learn how Glow LEDs got started and more in our Manual Page" />
      </Helmet>
      <div className="jc-b">
        <div className="mb-10px">
          <Link to={`/pages/menu/manuals`}>
            <GLButton variant="secondary">Back to Manuals</GLButton>
          </Link>
        </div>
        {(pathname === "glow_strings_v2_manual" || pathname === "glowstringz_v2" || pathname === "glow_strings_v2") && (
          <div className="mb-10px">
            <a
              href={
                manuals[
                  pathname === "glow_strings_v2_manual" ||
                  pathname === "glowstringz_v2" ||
                  pathname === "glow_strings_v2"
                    ? "glowstringz"
                    : pathname
                ].manual
              }
              download="Glowstringz V2 Manual"
            >
              <GLButton variant="primary">Download Manual</GLButton>
            </a>
          </div>
        )}
        <div className="mb-10px">
          <Link
            to={`/collections/all/products/${
              pathname === "glow_strings_v2" || pathname === "glowstringz_v2" || pathname === "glow_strings_v2_manual"
                ? "glowstringz_v2"
                : pathname
            }`}
          >
            <GLButton variant="secondary">View Available {toCapitalize(humanize(pathname))}</GLButton>
          </Link>
        </div>
      </div>
      <h2
        style={{
          textAlign: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
        {
          manuals[
            pathname === "glow_strings_v2_manual" || pathname === "glowstringz_v2" || pathname === "glow_strings_v2"
              ? "glowstringz"
              : pathname
          ].name
        }
      </h2>
      {manuals[
        pathname === "glow_strings_v2_manual" || pathname === "glowstringz_v2" || pathname === "glow_strings_v2"
          ? "glowstringz"
          : pathname
      ].manual && (
        <img
          src={
            manuals[
              pathname === "glow_strings_v2_manual" || pathname === "glowstringz_v2" || pathname === "glow_strings_v2"
                ? "glowstringz"
                : pathname
            ].manual
          }
          alt="manual"
          className="w-100per"
        />
      )}
      {manuals[
        pathname === "glow_strings_v2_manual" || pathname === "glowstringz_v2" || pathname === "glow_strings_v2"
          ? "glowstringz"
          : pathname
      ].manual && (
        <h2
          style={{
            textAlign: "center",
            width: "100%",
            justifyContent: "center",
          }}
        >
          Watch the Videos below to Learn More
        </h2>
      )}
      <div className="jc-c column m-0px">
        {manuals[
          pathname === "glow_strings_v2_manual" || pathname === "glowstringz_v2" || pathname === "glow_strings_v2"
            ? "glowstringz"
            : pathname
        ].videos.map(video => (
          <div>
            <h2
              style={{
                textAlign: "center",
                width: "100%",
                justifyContent: "center",
              }}
            >
              {video.title}
            </h2>
            <div className="iframe-container">
              <iframe
                width="996"
                height="560"
                title={video.title}
                style={{ borderRadius: "20px" }}
                src={`https://www.youtube.com/embed/${video.video}?mute=1&showinfo=0&rel=0&autoplay=0&loop=1`}
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen="1"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManualPage;
