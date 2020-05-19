module.exports = function (body) {

  return `
  <html lang="en" style="box-sizing:border-box; font-size:62.5%">

  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#000000">
    <meta name="description" content="Web site created using create-react-app">
    <script src="https://kit.fontawesome.com/cc10a71280.js" crossorigin="anonymous"></script>
    <style type="text/css">
    </style>
    <title>Glow LEDs</title>
    <style type="text/css">
      * {
        font-family: "Helvetica";
        font-size: 16px;
      }
  
      button:focus {
        outline: none
      }
  
      .header-links a:hover {
        background-color: #626262
      }
  
      .button:hover {
        border: 0.1rem #404040 solid
      }
  
      tbody>tr:nth-child(odd) {
        background-color: #f0f0f0
      }
  
      .dropdown:hover .dropdown-content {
        display: flex;
        flex-direction: column
      }
  
      .dropdown-nav:hover .dropdown-nav-content {
        display: flex;
        flex-direction: column
      }
  
      .categories a:hover {
        background-color: #c0c0c0
      }
  
      .column img:hover {
        opacity: 1
      }
  
      .row:after {
        content: "";
        display: table;
        clear: both
      }
    </style>
    <style type="text/css">
      @media (prefers-reduced-motion: no-preference) {
        .App-logo {
          animation: App-logo-spin infinite 20s linear
        }
      }
    </style>
    <style type="text/css">
      .button_symbol:focus {
        outline: 0
      }
  
      .button_symbol:active {}
  
      .button_symbol:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        background-color: gray
      }
    </style>
    <style type="text/css">
      .button_word:focus {
        outline: 0
      }
  
      .button_word:active {}
  
      .button_word:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        background-color: gray
      }
    </style>
    <style type="text/css">
      label span:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
      }
  
      [type=checkbox]:checked+span {
        background: rgb(64, 155, 241)
      }
    </style>
    <style type="text/css">
      .editor_input:focus {
        outline: 0
      }
    </style>
    <style type="text/css">
      @media screen and (max-width: 930px) {
        #bg {
          /* margin: 10px 100px; */
          padding-top: 100px
        }
      }
  
      @media screen and (max-width: 788px) {
        #bg {
          padding-top: 100px
        }
      }
  
      @media screen and (max-width: 656px) {
        #bg {
          /* padding-top: 20px; */
          padding-top: 20px;
          height: 100vh;
          /* height: 70vh; */
        }
      }
  
      @media screen and (max-width: 497px) {
        #bg {
          padding-top: 20px;
          height: 100vh;
          /* padding: 20px */
          /* height: 70vh; */
        }
      }
    </style>
    <style type="text/css">
      .zoom::after {
        transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
      }
  
      .zoom:hover {
        transform: scale(1.1, 1.1)
      }
  
      .zoom:hover::after {
        opacity: 1
      }
  
      .zoom:active {
        transform: scale(1, 1)
      }
  
      .zoom:active::after {
        opacity: 1
      }
    </style>
    <style type="text/css">
      .zoom::after {
        transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)
      }
  
      .zoom:hover {
        transform: scale(1.1, 1.1)
      }
  
      .zoom:hover::after {
        opacity: 1
      }
  
      .zoom:active {
        transform: scale(1, 1)
      }
  
      .zoom:active::after {
        opacity: 1
      }
    </style>
    <style type="text/css">
      .input_editor:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
      }
  
      .input_editor:focus {
        outline: 0
      }
    </style>
    <style type="text/css">
      .button_symbol:focus {
        outline: 0
      }
  
      .button_symbol:active {}
  
      .button_symbol:hover {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
        background-color: gray
      }
    </style>
  </head>
  
  <body data-gr-c-s-loaded="true" style='background-color:#272727; color:white; font:1.6rem; height:100vh; margin:0'
    bgcolor="#272727" height="100vh">
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root" style="height:100%" height="100%">
      <div class="grid-container fade_in"
        style=' height:100%; -moz-animation:fadein 2s; -ms-animation:fadein 2s; -o-animation:fadein 2s; animation:2s ease 0s normal forwards 1 fadein'
        height="100%">
  
        <header class="header"
          style=" background-color:#333; box-shadow:0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19); color:#fff; display:flex; grid-area:header;list-style-type:none; padding:15px; display:flex; flex-direction: column; "
          bgcolor="#333333">
          <div class="brand"><a href="https://glow-leds.herokuapp.com/"
              style="color:#fff; text-decoration:none; font-size:3rem; font-weight:bold; display: flex; justify-content: center;"><img
                class="zoom logo" height="150px" src="https://glow-leds.herokuapp.com/images/Glow_Logo.png"
                alt="Glow LEDs" style=" transition:all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1)"></a>
          </div>
          <div style="display: flex; justify-content: center; margin: 0px auto; flex-direction: column;">
            <a href="https://glow-leds.herokuapp.com/" style="color:white; text-decoration:none">
              <div class="title" style='display:flex; font-family:"heading_font"; margin:0'>
                <h1 style="font-size: 67px; margin: 17px 0px 10px; text-align: center; width: 100%;">Glow LEDs</h1>
              </div>
            </a>
          </div>
        </header>
  
        ${body}
       

  </body>
  
  </html>
	`;
}