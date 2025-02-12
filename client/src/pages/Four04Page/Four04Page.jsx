import { Helmet } from "react-helmet";

const Four04Page = () => {
  return (
    <div className="jc-c column ta-c">
      <Helmet>
        <title>{"404 Not Found | Glow LEDs"}</title>
        <meta property="og:title" content="404 Not Found" />
        <meta property="og:url" content="https://www.glow-leds.com" />

        <meta name="twitter:title" content="404 Not Found" />
      </Helmet>
      <h1 style={{ margin: "20px auto" }}>{"404 Page Not Found"}</h1>
      <div>{"Sorry About that"}</div>
    </div>
  );
};
export default Four04Page;
