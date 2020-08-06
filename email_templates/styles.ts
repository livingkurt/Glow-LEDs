export default () => {
	return `
 
  .fade_in {
    animation: 2s ease 0s normal forwards 1 fadein;
  }
  
  /* Safari, Chrome and Opera > 12.1 */
  
  @keyframes fadein {
    0% {
      opacity: 0;
    }
    20% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  
  .zoom {
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .zoom::after {
    transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
  }
  
  .zoom:hover {
    transform: scale(1.1, 1.1);
  }
  
  .zoom:hover::after {
    opacity: 1;
  }
  
  .zoom:active {
    transform: scale(1, 1);
  }
  
  .zoom:active::after {
    opacity: 1;
  }
  
  .hover_fade_in {
    animation: 0.75s ease 0s normal forwards 1 fadein;
  }
  
  @font-face {
    font-family: "main_font";
    src: url("/fonts/Neou-Bold.otf");
  }
  
  @font-face {
    font-family: "heading_font";
    src: url("/fonts/beyond_the_mountains.otf");
  }
  
  html {
    font-size: 62.5%;
    /* 1.6rem * 62.5 = 10px = 1rem */
    box-sizing: border-box;
  }
  
  *:focus {
    outline: none;
  }
  
  textarea {
    resize: none;
  }
  
  body {
    font: 1.6rem Helvetica;
    font-family: Helvetica;
    margin: 0;
    background-color: #272727;
    color: white;
  }
  
  button {
    font-size: 1.6rem;
  }
  
  .content {
    background-color: #272727;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background: linear-gradient(180deg, #8a8a8a 0%, #272727 100%);
    border-radius: 20px;
    margin: 20px auto;
    padding: 2rem;
    min-height: 81vh;
    max-width: 1125px;
  }
  
  #root {
    height: 100%;
  }
  
  ul {
    padding: 0;
  }
  
  a {
    text-decoration: none;
    color: white;
  }
  
  h1, h2, h3 {
    font-family: Helvetica;
  }
  
  header {
    background-color: #333333;
    color: white;
    display: flex;
    align-items: center;
    padding: 15px;
    list-style-type: none;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    /* position: fixed;
    right: 0;
    left: 0; */
    z-index: 999;
    /* top: 0; */
  }
  
  .full-width {
    width: 100%;
  }
  
  .main_container {
    padding: 20px;
  }
  
  /* Product Details */
  
  .details {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    flex-wrap: wrap;
    padding: 1rem;
  }
  
  .details-image {
    margin-right: 20px;
    margin-bottom: 20px;
    text-align: center;
  }
  
  .details-image img {
    border-radius: 1rem;
    object-fit: cover;
    object-position: 50% 50%;
    width: 500px;
    height: 500px;
  }
  
  .details-info {
    flex: 1 1 30rem;
  }
  
  .details-info li {
    margin-bottom: 1rem;
  }
  
  .details-info ul {
    list-style-type: none;
    padding: 0;
  }
  
  .details-action {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 1.5rem;
    background-color: #585858;
    padding: 1rem;
    flex: 1 1 30rem;
  }
  
  .details-action li {
    margin-bottom: 1rem;
  }
  
  .details-action ul {
    list-style-type: none;
    padding: 0;
  }
  
  .details-action ul li:last-child {
    display: flex;
    flex-direction: column;
  }
  
  .back-to-result {
    padding: 1rem;
  }
  
  .text-center {
    text-align: center;
  }
  
  /* Cart */
  
  .cart {
    display: flex;
    flex-wrap: wrap;
    margin: 1rem;
    align-items: flex-start;
  }
  
  .cart-list {
    flex: 3 1 40rem;
  }
  
  .cart-action {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 1rem;
    background-color: #585858;
    padding: 1rem;
  }
  
  .responsive_table {
    overflow-x: auto;
  }
  
  .cart-list-container {
    padding: 0;
    list-style-type: none;
    margin-right: 10px;
  }
  
  .cart-list-container li {
    display: flex;
    justify-content: space-between;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
    border-bottom: .1rem #c0c0c0 solid;
  }
  
  .cart-list-container li img {
    max-width: 10rem;
    max-height: 10rem;
    border-radius: 1.5rem;
    margin-right: 10px;
  }
  
  .cart-list-container li:first-child {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
  }
  
  .cart-image {
    flex: 1 1;
  }
  
  .cart-name {
    flex: 8 1;
  }
  
  .cart-price {
    flex: 1 1;
    font-size: 2rem;
    text-align: right;
  }
  
  .form_input {
    font-size: 1.6rem;
    border-radius: 1rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  
  .edit_product_textarea {
    resize: none;
    height: 15rem;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* forms */
  
  .form {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .form-container {
    display: flex;
    flex-direction: column;
    max-width: 32rem;
    padding: 2rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: #5a5a5a;
    border-radius: 1rem;
    list-style-type: none;
    margin: 0 auto;
  }
  
  .form-container li {
    display: flex;
    flex-direction: column;
    margin-bottom: 1rem;
    margin-top: 1rem;
  }
  
  input, textarea {
    padding: 1rem;
    border: .1rem #c0c0c0 solid;
    border-radius: .5rem;
  }
  
  /* Product */
  
  .products {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
  }
  
  .products li {
    list-style-type: none;
    padding: 0;
    flex: 0 1 34rem;
    margin: 1rem;
  }
  
  .product {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    text-align: center;
    border-radius: 1rem;
    box-shadow: 0;
    transition: box-shadow 0.5s ease-out;
    padding: 15px;
  }
  
  .product:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  
  .product-name {
    font-size: 2rem;
    font-weight: bold;
  }
  
  .product-brand {
    font-size: 1.2rem;
    color: white;
  }
  
  .product-price {
    font-size: 2rem;
    font-weight: bold;
  }
  
  .product-image {
    max-width: 34rem;
    max-height: 34rem;
    border-radius: 1rem;
    object-fit: cover;
    object-position: 50% 50%;
    width: 300px;
    height: 300px;
  }
  
  .product-rating {
    margin-bottom: 1rem;
  }
  
  /* Reviews */
  
  ul.review {
    list-style-type: none;
    padding: 0;
  }
  
  .review li {
    margin-bottom: 2rem;
  }
  
  .review li>div {
    margin: 0.5rem;
  }
  
  /* Rating */
  
  .rating span {
    color: white;
    font-size: 1.8rem;
    margin: 0.1rem;
  }
  
  .rating span:last-child {
    color: white;
    font-size: 1.4rem;
    margin-left: 5px;
  }
  
  .rating_textarea {
    height: 150px;
  }
  
  .rating_textarea a>.rating>span:last-child {
    color: white;
  }
  
  .content-margined {
    margin: 1rem;
  }
  
  .table {
    width: 100%;
    border-radius: 1rem;
  }
  
  th {
    text-align: left;
  }
  
  td {
    background-color: #626262;
    padding: 10px;
  }
  
  tbody>tr:nth-child(odd) {
    background-color: #f0f0f0;
  }
  
  /* Checkout Steps */
  
  .checkout-steps {
    display: flex;
    justify-content: space-between;
    width: 45rem;
    margin: 1rem auto;
  }
  
  .checkout-steps>div {
    border-top: .3rem #c0c0c0 solid;
    color: white;
    flex: 1 1;
    padding-top: 1rem;
  }
  
  .checkout-steps>div.active {
    border-top: .3rem white solid;
    color: white;
    /* border: 10px solid; */
    /* border-image-source: linear-gradient(45deg, rgb(0, 143, 104), rgb(250, 224, 66)); */
    /* border-image-slice: 1; */
    /* border-width: .3rem 0 0 0; */
  }
  
  /* Place Order */
  
  .placeorder {
    display: flex;
    flex-grow: wrap;
    padding: 1rem;
    justify-content: space-between;
    color: white;
  }
  
  .placeorder-info {
    flex: 3 1 60rem;
  }
  
  .placeorder-action {
    flex: 1 1 20rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 1rem;
    background-color: #fcfcfc;
    padding: 2rem;
    background-color: transparent;
    margin-bottom: 10px;
  }
  
  .placeorder-info>div {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 1rem;
    background-color: #fcfcfc;
    padding: 2rem;
    margin: 1rem;
    background-color: transparent;
  }
  
  .placeorder-info>div:first-child {
    margin-top: 0;
  }
  
  .placeorder-action>ul {
    padding: 0;
    list-style-type: none;
  }
  
  .placeorder-action>ul>li {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  
  .placeorder-action>ul>li:last-child {
    font-size: 2rem;
    font-weight: bold;
    color: white;
  }
  
  .placeorder-actions-payment>div {
    width: 100%;
  }
  
  /* Profile */
  
  .profile {
    display: flex;
    flex-wrap: wrap;
  }
  
  .profile-info {
    flex: 1 1 30rem;
  }
  
  .profile-orders {
    flex: 3 1 60rem;
  }
  
  .dropdown {
    display: inline-block;
    position: relative;
  }
  
  .dropdown-content {
    position: absolute;
    display: none;
    right: 0;
    padding: 1rem;
    list-style-type: none;
    z-index: 1;
    background-color: #333333;
    margin: 0;
    border-radius: 1rem;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  
  .dropdown:hover .dropdown-content {
    display: flex;
    flex-direction: column;
  }
  
  .dropdown-nav {
    display: inline-block;
    position: relative;
  }
  
  .dropdown-nav-content {
    position: absolute;
    display: none;
    left: 0;
    padding: 1rem;
    list-style-type: none;
    z-index: 1;
    background-color: #333333;
    margin: 0;
    border-radius: 1rem;
    /* margin-top: 0.4rem; */
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  
  .dropdown-nav:hover .dropdown-nav-content {
    display: flex;
    flex-direction: column;
  }
  
  /* Select Dropdowns */
  
  .select_dropdown_container {
    position: relative;
  }
  
  .select_dropdown {
    /* Standard syntax; must be last */
    -webkit-appearance: button;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    background: transparent;
    background-position: center right;
    background-repeat: no-repeat;
    border-radius: 1rem;
    border: 0;
    color: white;
    padding-top: 9px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 8px;
    font-size: 1.6rem;
    margin: 0;
    width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 10px;
    font-family: Helvetica;
    transition: all .5s ease-out;
  }
  
  .qty_select_dropdown_container {
    position: relative;
    width: 65px;
  }
  
  .qty_select_dropdown {
    -webkit-appearance: button;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    background: transparent;
    background-position: center right;
    background-repeat: no-repeat;
    border-radius: 1rem;
    border: 0;
    color: white;
    padding-top: 9px;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 8px;
    font-size: 1.6rem;
    margin: 0;
    width: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin: 10px;
    font-family: Helvetica;
    transition: all .5s ease-out;
  }
  
  .icon_styles {
    position: absolute;
    right: 17px;
    top: 1.6rem;
    transform: rotate(-180deg);
  }
  
  .review_select_dropdown_container {
    position: relative;
    margin-left: 15px;
  }
  
  .review_select_dropdown {
    /* Standard syntax; must be last */
    -webkit-appearance: button;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    background: transparent;
    background-position: center right;
    background-repeat: no-repeat;
    border-radius: 9px;
    border: 0;
    color: white;
    padding-top: 1rem;
    padding-bottom: 5px;
    padding-left: 10px;
    padding-right: 8px;
    font-size: 1.6rem;
    margin: 0;
    width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-family: Helvetica;
    transition: all .5s ease-out;
  }
  
  .review_icon_styles {
    position: absolute;
    right: 9px;
    top: 6px;
    transform: rotate(-180deg);
  }
  
  .select_dropdown:hover, .qty_select_dropdown:hover, .review_select_dropdown:hover {
    background: darkgray;
  }
  
  .categories {
    padding: 0;
    list-style-type: none;
  }
  
  .categories a {
    display: flex;
    padding: 1rem;
  }
  
  .categories a:hover {
    background-color: #c0c0c0;
  }
  
  video {
    object-fit: cover;
  }
  
  .alt_pictures_hidden {
    display: none;
    flex-wrap: wrap;
  }
  
  .alt_pictures_shown {
    display: flex;
    flex-wrap: wrap;
  }
  
  .validation_text {
    font-size: 14px;
    justify-content: center;
    color: #ff4a4a;
  }
  
  .glow_leds_text {
    font-size: 67px;
    margin: 0;
    text-align: center;
    justify-content: center;
    width: 100%;
    margin-bottom: 10px;
    margin-top: 17px;
    display: flex;
    font-family: Helvetica;
  }
  
  .button {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    background-color: transparent;
    color: white;
    border: 0px;
    font-family: Helvetica;
    border-radius: 1rem;
    transition: all .5s ease;
    padding: 10px;
  }
  
  .button:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: #bebcbc;
  }
  
  .button.primary {
    background-color: #888888;
  }
  
  .button.primary:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: #a5a5a5;
  }
  
  .button.secondary {
    background-color: #686767;
  }
  
  .button.secondary:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: #7c7c7c;
  }
  
  .button.nav {
    background-color: transparent;
    box-shadow: unset;
  }
  
  .button.icon {
    box-shadow: unset;
    padding: 6px 10px;
  }
  
  .button.icon:hover {
    background-color: gray;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  }
  
  .button.mobile.nav {
    background-color: transparent;
    box-shadow: unset;
  }
  
  .button.nav:hover, .button.mobile.nav:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    background-color: gray;
  }
  
  /* Home Page */
  
  .home_page_divs {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    border-radius: 2rem;
    padding: 25px;
    margin-bottom: 25px;
  }
  
  /* Sidebar */
  
  .sidebar {
    position: fixed;
    transition: all .5s;
    transform: translateX(-32rem);
    width: 30rem;
    background-color: #2d2d2de6;
    height: 100%;
    top: 110px;
    padding: 10px;
    z-index: 99;
  }
  
  .sidebar.open {
    transform: translateX(0px);
  }
  
  .sidebar_close_button {
    border-radius: 50%;
    font-size: 2rem;
    padding-top: 0;
    cursor: pointer;
    position: absolute;
    right: .5rem;
    top: 1.5rem;
    background-color: transparent;
    border: 0;
    color: white;
  }
  
  .sidebar_button {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
    background-color: transparent;
    color: white;
    border: 0px;
    font-family: Helvetica;
    border-radius: 1rem;
    transition: all .5s ease;
    padding: 10px;
  }
  
  .sidebar_button.primary {
    border-bottom: 1px white solid;
    width: 100%;
    border-radius: 0px;
    text-align: start;
  }
  
  .sidebar_button.secondary {
    border-bottom: 1px white solid;
    width: 100%;
    border-radius: 0px;
    text-align: start;
    padding-left: 20px;
  }
  
  .sidebar_dropdown {
    position: relative;
  }
  
  .sidebar_dropdown_container {
    overflow: hidden;
    height: auto;
    max-height: 0px;
    transition: all 0.5s;
    left: 0;
    list-style-type: none;
    background-color: #969696;
    margin: 0;
    width: 100%;
  }
  
  .sidebar_button:hover {
    background: gray;
  }
  
  .sidebar_button:focus+.sidebar_dropdown_container {
    max-height: 600px;
  }
  
  /* Slide Show */
  
  * {
    box-sizing: border-box;
  }
  
  /* The grid: Four equal columns that floats next to each other */
  
  .column {
    float: left;
    width: 10%;
    padding: 10px;
  }
  
  /* Style the images inside the grid */
  
  .column img {
    opacity: 0.8;
    cursor: pointer;
    height: unset;
    border-radius: 1rem;
  }
  
  .column img:hover {
    opacity: 1;
  }
  
  /* Clear floats after the columns */
  
  .row:after {
    content: "";
    display: table;
    clear: both;
  }
  
  /* The expanding image container */
  
  .container {
    position: relative;
    display: none;
  }
  
  /* Search */
  
  .search_input {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 1rem auto;
    max-width: 45rem;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border-radius: 1rem;
    border: .1rem #c0c0c0 solid;
    font-size: 1.6rem;
    margin-right: 5px;
  }
  
  .search_input {
    padding: 1rem;
    border-radius: 1rem;
    border: .1rem #c0c0c0 solid;
    font-size: 1.3rem;
    margin-right: 5px;
    height: 10px;
    width: 250px;
  }
  
  .search_button {
    display: flex;
    list-style-type: none;
    padding: 0;
    margin: 1rem auto;
    max-width: 45rem;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    border-radius: 1rem;
    border: .1rem #c0c0c0 solid;
    font-size: 1.6rem;
    margin-right: 5px;
  }
  
  .search_button {
    padding: 1rem;
    border-radius: 1rem;
    border: .1rem #c0c0c0 solid;
    font-size: 1.6rem;
    margin-right: 5px;
  }
  
  .loading_gif {
    height: 100px;
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -50px 0px 0px -50px;
  }
  
  .loading_png {
    height: 100px;
    z-index: 1;
    position: absolute;
    top: 50%;
    left: 49.7%;
    margin: -50px 0px 0px -50px;
  }
  
  @media only screen and (max-width: 1468px) {
    .home_links {
      justify-content: center !important;
    }
    .content {
      min-height: 69vh !important;
    }
  }
  
  @media only screen and (max-width: 1440px) {
    .alt_pictures_shown {
      display: none !important;
    }
    .alt_pictures_hidden {
      display: flex !important;
    }
    .column {
      width: 20%;
    }
  }
  
  @media only screen and (max-width: 1330px) {
    .ship_deliver {
      /* justify-content: space-between !important; */
      width: 100% !important;
    }
  }
  
  @media only screen and (max-width: 1468px) and (min-width: 1032px) {
    .sidebar {
      display: none;
    }
  }
  
  @media only screen and (max-width: 1177px) {
    .content {
      margin: 20px auto !important;
      /* margin-top: 185px !important; */
    }
  }
  
  @media only screen and (max-width: 1040px) {
    .product_title_top {
      display: flex !important;
      justify-content: center;
    }
    .product_title_side {
      display: none !important;
    }
    .details {
      justify-content: center;
    }
    .nav_bar {
      width: unset !important;
    }
    .brand {
      margin-right: 20px !important;
    }
    /* .content {
      margin: 0 20px !important;
    } */
  }
  
  @media only screen and (max-width: 1032px) {
    .home_links {
      justify-content: center !important;
    }
    .button.nav {
      font-size: 14px;
      display: none;
    }
    .button.mobile.nav {
      display: block !important;
    }
    .logo {
      display: none;
    }
    .logo_2 {
      display: block !important;
    }
    .nav_bar {
      display: none;
    }
    .glow_leds_text {
      font-size: 50px !important;
    }
    .content {
      /* margin-top: 128px !important; */
      min-height: 76vh !important;
    }
    .details-info {
      flex: unset;
    }
    .details-image {
      margin: 0;
      margin-bottom: 20px;
    }
    .cart-action-container {
      flex: 1 1 100rem !important;
    }
    .cart-action {
      flex: 1 1 100rem !important;
    }
    .cart {
      margin: 0rem;
    }
    .placeorder {
      flex-wrap: wrap;
    }
    .placeorder-action {
      margin: 10px;
      margin-top: 0px;
    }
  }
  
  @media only screen and (max-width: 704px) {
    h1 {
      font-size: 1.9em !important;
    }
    h2 {
      font-size: 1.5em !important;
    }
    .back_button {
      font-size: 20px !important;
    }
    .p_descriptions {
      font-size: 1.6rem !important;
    }
    .content {
      margin: 0px !important;
      /* margin-top: 98px !important; */
      border-radius: 0px !important;
      width: 100% !important;
      min-height: 81vh !important;
    }
    .glow_leds_text {
      font-size: 40px !important;
    }
    .welcome_text {
      font-size: 40px !important;
    }
    .logo_2 {
      height: 70px !important;
    }
    .main_container, .profile_container, .table_container {
      padding: 0px !important;
    }
    .sidebar {
      top: 100px !important;
    }
    .profile_orders_container {
      margin: 0;
    }
  }
  
  @media only screen and (max-width: 528px) {
    h1 {
      font-size: 1.6em !important;
      margin-bottom: 10px !important;
    }
    h2 {
      font-size: 1.25em !important;
    }
    h3 {
      font-size: 1em !important;
    }
    .back_button {
      font-size: 1.6rem !important;
    }
    .p_descriptions {
      font-size: 14px !important;
    }
    .mobile_button.nav {
      font-size: 14px !important;
    }
    .home_page_img, .product-image {
      max-width: 250px !important;
      max-height: 250px !important;
      margin: 0px;
    }
    .glow_leds_text {
      font-size: 35px !important;
    }
    .welcome_text {
      font-size: 35px !important;
    }
    .content {
      /* margin-top: 80px !important; */
      min-height: 83vh !important;
    }
    .logo_2 {
      height: 60px !important;
    }
    .sidebar {
      top: 92px !important;
    }
    .main_container {
      padding: 0px !important;
    }
    .search_container {
      max-width: 250px !important;
    }
    .cart_text {
      display: none !important;
    }
    .cart_icon {
      display: block !important;
    }
    .checkout-steps {
      width: 35rem;
    }
    .checkout-steps>div {
      font-size: 14px;
    }
    .label {
      font-size: 14px;
    }
    .placeorder-action>ul>li {
      font-size: 14px;
    }
    .cart-price {
      font-size: 18px;
    }
    .cart-list-container li img {
      max-width: 7rem;
    }
    .brand {
      margin-right: 0px !important;
    }
    .nav_bar {
      margin-left: 23px !important;
    }
  }
  
  @media only screen and (max-width: 412px) {
    .product_title_top {
      font-size: 3rem !important;
    }
    .back-to-result {
      padding: 0 !important;
    }
    .inner_content {
      padding: 0 !important;
    }
    .checkout-steps {
      width: 30rem;
    }
    .checkout-steps>div {
      font-size: 13px;
    }
    .placeorder-action, .cart-list-container, .placeorder-info>div {
      background-color: unset;
      border: 0;
      max-width: 32rem !important;
      margin: 0 auto;
      padding: 0;
      box-shadow: unset;
    }
    .placeorder-info>div, .placeorder-action {
      margin: auto;
      margin-bottom: 20px;
    }
    .glow_leds_text {
      font-size: 30px !important;
    }
    .welcome_text {
      font-size: 30px !important;
    }
  }
  
  @media only screen and (max-width: 355px) {
    .glow_leds_text {
      display: none !important;
    }
    .sidebar {
      top: 90px !important;
    }
    .product_title_top {
      font-size: 3rem !important;
    }
    .subtotal_h3 {
      font-size: 17px;
    }
    .checkout-steps {
      width: 25rem;
    }
    .checkout-steps>div {
      font-size: 12px;
    }
    .home_page_divs {
      padding: 0px;
      background-color: unset;
      border: 0;
      box-shadow: unset;
    }
    .form-container, .placeorder-action, .cart-list-container, .placeorder-info>div {
      background-color: unset;
      border: 0;
      box-shadow: unset;
      max-width: 32rem !important;
      margin: 0 auto;
      padding: 0;
    }
    .placeorder-info>div {
      margin-bottom: 20px;
    }
    .nav_bar {
      margin-left: 0px !important;
    }
    /* .logo_text {
      flex-direction: column !important;
    } */
  }
  
  .checkbox {
    border-radius: 15px;
    height: 1.6rem;
    width: 13px;
    border: 1px silver solid;
    margin-right: 5px;
  }
  
  label input {
    visibility: hidden;
    display: block;
    height: 0;
    width: 0;
    position: absolute;
    overflow: hidden;
  }
  
  label span {
    height: 18px;
    width: 18px;
    /* border: 1px solid grey; */
    display: inline-block;
    border-radius: 15px;
    border: 1px silver solid;
    margin: 5px 5px 5px 0px;
    transition: color 0.5s box-shadow;
    /* transition: border 0.5s box-shadow; */
  }
  
  label span:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    /* border: 0px */
  }
  
  [type=checkbox]:checked+span {
    background: rgb(64, 155, 241);
  }
	`;
};