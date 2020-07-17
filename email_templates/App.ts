module.exports = (body, styles) => {
	return `
  <html lang="en">

<head>
  <meta charset="utf-8">
  <link rel="icon" href="/favicon.ico">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="theme-color" content="#000000">
  <meta name="description" content="Web site created using create-react-app">
  <meta name="viewport" content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
  <meta name="description" content="3D Printed LED toys, by a glover that wants the world to stay lit">
  <link rel="canonical" href="http://www.glow-leds.com">
  <meta property="og:locale" content="en_US">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Glow LEDs | Diffusers | Accessories | Glow-LEDS.com">
  <meta property="og:description" content="3D Printed LED toys, by a glover that wants the world to stay lit">
  <meta property="og:url" content="http://www.glow-leds.com">
  <meta property="og:site_name" content="LED Gloves">
  <meta property="og:image"
    content="http://www.glow-leds.com/images/glow_leds_link_logo_optimized.png">
  <meta property="og:image:secure_url"
    content="http://www.glow-leds.comhttp://www.glow-leds.com/images/glow_leds_link_logo_optimized.png">
  <meta property="og:image:width" content="1080">
  <meta property="og:image:height" content="1080">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:description" content="3D Printed LED toys, by a glover that wants the world to stay lit">
  <meta name="twitter:title" content="Glow LEDs | Diffusers | Accessories | Glow-LEDS.com">
  <meta name="twitter:site" content="@glowleds">
  <meta name="twitter:image"
    content="http://www.glow-leds.com/images/glow_leds_link_logo_optimized.png">
  <meta name="twitter:creator" content="@glowleds">
  <meta property="DC.date.issued" content="2015-04-28T07:34:45+00:00">
  <link rel="shortlink" href="http://www.glow-leds.com">
  <meta name="referrer" content="always">
  <script src="https://kit.fontawesome.com/cc10a71280.js" crossorigin="anonymous"></script>
  <link rel="stylesheet" href="https://kit-free.fontawesome.com/releases/latest/css/free.min.css" media="all">
  <link rel="stylesheet" href="https://kit-free.fontawesome.com/releases/latest/css/free-v4-font-face.min.css"
    media="all">
  <link rel="stylesheet" href="https://kit-free.fontawesome.com/releases/latest/css/free-v4-shims.min.css" media="all">
  <link rel="apple-touch-icon" href="/logo192.png">
  <link rel="manifest" href="/manifest.json">
  <title>Glow LEDs</title>
  <link href="/static/css/main.a02bf091.chunk.css" rel="stylesheet">
  <link href="styles.css" rel="stylesheet">
  <style>
    ${styles}
  </style>
</head>

<body data-gr-c-s-loaded="true" style="height: 100%; overflow-y: scroll;">
  <div id="root" style="height: 100%;">
    <div class="fade_in" style="height: 100%;">
      <header id="overlay"
        style="grid-area: header / header / header / header; background-color: rgb(51, 51, 51); color: rgb(255, 255, 255); display: flex; align-items: center; padding: 15px; list-style-type: none; box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px; flex-direction: column;">
        <div class="brand"><a href="/"><img class="zoom logo" height="125px"
              src="https://glow-leds-dev.herokuapp.com/images/optimized_images/logo_images/glow_logo_optimized.png" alt="Glow LEDs"></a><button
            class="button_symbol mobile_buttons" style="display: none; font-size: 30px; height: 50px; width: 50px;"><i
              cl ass="fas fa-bars" aria-hidden="true"></i></button></div>
        <div style="display: flex; justify-content: center; margin: 0px auto; flex-direction: column;">
          <div class="logo_text" style="display: flex; justify-content: center; margin: 0px auto; align-items: center;">
            <a href="/"><img class="logo_2" src="https://glow-leds-dev.herokuapp.com/images/optimized_images/logo_images/glow_logo_optimized.png" alt="Glow LEDs"
                style="display: none; height: 80px;"></a><a href="/">
              <h1 class="glow_leds_text"
                style="display: flex; font-family: Helvetica; font-size: 67px; margin: 17px 0px 10px; text-align: center; justify-content: center; width: 100%;">
                Glow LEDs</h1>
            </a></div>
        </div>
      </header>
      <div class="content"
      style="width: 75%; margin: 30px auto; grid-area: main / main / main / main; background: linear-gradient(rgb(138, 138, 138) 0%, rgb(39, 39, 39) 100%); box-shadow: rgba(0, 0, 0, 0.2) 0px 4px 8px 0px, rgba(0, 0, 0, 0.19) 0px 6px 20px 0px; border-radius: 20px; padding: 2rem; min-height: 81vh; ">
      <div>
        ${body}
        </div>
  </body>
  
  </html>
	`;
};
