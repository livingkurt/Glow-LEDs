import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import { listChips } from "../../../actions/chipActions";
import { update_products_url } from "../../utils/helper_functions";
import { listProducts } from "../../../actions/productActions";
import { GLButton } from "../../../components/GlowLEDsComponents";
import QuickButtons from "./QuickButtons";
import Filter from "../../components/GlowLEDsComponents/GLTable/Filter";

const FAQPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [chip_name, set_chip_name] = useState();

  const chipList = useSelector(state => state.chipList);
  const { chips: chips_list } = chipList;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(listChips({}));
    }
    return () => (clean = false);
  }, []);

  const filterHandler = e => {
    const chip_selected = JSON.parse(e.target.value);
    update_products_url(history, "", "", chip_selected.name, "", "0", "/collections/all/products");
    dispatch(
      listProducts({
        chip: chip_selected._id,
        hidden: false
      })
    );
    set_chip_name({});
  };

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Frequently Asked Questions | Glow LEDs</title>
        <meta property="og:title" content="Frequently Asked Questions" />
        <meta name="twitter:title" content="Frequently Asked Questions" />
        <link rel="canonical" href="https://www.glow-leds.com/pages/faq" />
        <meta property="og:url" content="https://www.glow-leds.com/pages/faq" />
        <meta
          name="description"
          content="Learn how the Glow LEDs process works, and how to get your products to you and working as fast as possible."
        />
        <meta
          property="og:description"
          content="Learn how the Glow LEDs process works, and how to get your products to you and working as fast as possible."
        />
        <meta
          name="twitter:description"
          content="Learn how the Glow LEDs process works, and how to get your products to you and working as fast as possible."
        />
      </Helmet>
      <h1 style={{ clear: "both", textAlign: "center" }} id="frequentlt_asked_questions" className="title_font">
        Frequently Asked Questions
      </h1>
      <div className="faq-container">
        <QuickButtons />
        <div className="faq-main">
          <div className="inner_content">
            <div>
              <div className="container" style={{ margin: "10px 0" }}>
                <h2 className="ta-c title_font" id="glowskinz">
                  Glowskinz
                </h2>
                <div className="jc-c pos-rel">
                  <div className="iframe-container">
                    <iframe
                      width="996"
                      height="560"
                      title="glowskinz"
                      style={{ borderRadius: "20px" }}
                      src="https://www.youtube.com/embed/s49fiZPC5G0?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen="1"
                    />
                  </div>
                </div>
                <h3 className="ta-c title_font" id="inserting_chips_into_glowskinz">
                  Inserting chips into Glowskinz
                </h3>
                {/* prettier-ignore */}
                <pre className="paragraph_font">

									To use the Glowskinz with your desired microlight, first you need to remove your chip from
                  its current plastic casing if it is in one.
									Then squeeze the
                  Glowskinz near the end of the side slits causing the opening
                  in the bottom to expand. Next, gently grip your microlight
                  from the sides and gently place it into the opening at the
                  bottom of the Glowskinz.
									Gently push the microlight all the
                  way in and let your squeezing hand release pressure let the
                  bottom of the Glowskinz close up.
                </pre>
                {/* prettier-ignore */}
                <h3
                  className="ta-c title_font"
                  id="removing_chips_from_glowskinz"
                >
                  Removing chips from Glowskinz
                </h3>
                <pre className="paragraph_font">
                  For Nanoskinz and Coinskinz squeeze the Glowskinz in the same location as you did to put it in. Then pinch and pull the
                  microlight with your other hand to remove it. For Coffinskinz spread the bottom of the Glowskinz, then gently pinch and
                  pull the microlight out.
                </pre>
                <h3 className="ta-c title_font" id="chip_compatiblity">
                  Chip Compatibility
                </h3>
                <pre className="paragraph_font">Select your chip from the dropdown below to see what products are compatible!</pre>
                <div style={{ marginLeft: -"5px" }} className="">
                  <Filter title="Shop By Chip" width="100per" state={chip_name} filterHandler={filterHandler} filter_options={chips_list} />
                </div>
                <h3 className="ta-c title_font" id="chip_categories">
                  Chip Cateories
                </h3>
                <div className="row ">
                  <h4 className="title_font mr-1rem mt-26px">Coin:</h4>
                  <pre className="paragraph_font">
                    Aethers, Chroma 24, Chroma Ctrls, Ezlite, Element V25, Kebit, Keluce, Mini Kevo, OG Chromas, OG Spectra, OSM2, Oracles,
                    Supernova, Trinity,
                  </pre>
                </div>
                <div className="ai-c">
                  <h4 className="title_font mr-1rem">Apollo: </h4>
                  <pre className="paragraph_font">Apollos</pre>
                </div>
                <div className="ai-c">
                  <h4 className="title_font mr-1rem"> Nano: </h4>
                  <pre className="paragraph_font">Atoms, Aurora Nanos, Ions, QT 6 Mode, Ubers, Chroma Evos, Spectra Evos</pre>
                </div>
                <div className="ai-c">
                  <h4 className="title_font mr-1rem">Inova: </h4>
                  <pre className="paragraph_font">Azotecs, Emissives</pre>
                </div>
                <div className="ai-c">
                  <h4 className="title_font mr-1rem">Coffin: </h4>
                  <pre className="paragraph_font">EVO X, KEK 5, KAT 5, IMAX</pre>
                </div>
                <div className="ai-c">
                  <h4 className="title_font mr-1rem">Vortex: </h4>
                  <pre className="paragraph_font">Vortex</pre>
                </div>
              </div>
              <div className="container" style={{ margin: "10px 0" }}>
                <h2 style={{ clear: "both", textAlign: "center" }} className="title_font" id="diffuser_caps">
                  Diffuser Caps
                </h2>
                <div className="jc-c pos-rel">
                  <div className="iframe-container">
                    <iframe
                      width="996"
                      height="560"
                      title="Using Diffuser Caps and Adapters"
                      style={{ borderRadius: "20px" }}
                      src="https://www.youtube.com/embed/FJbKd0ClkFM?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen="1"
                    />
                  </div>
                </div>
                <h3 className="ta-c title_font" id="using_diffuser_caps_and_adapters">
                  Using Diffuser Caps and Adapters
                </h3>

                <pre className="paragraph_font">
                  To begin using Diffuser Caps first take your microlights out of your gloves, then place the Diffuser Adapters gently onto
                  your microlight bulbs. Now take your your chips, with the Diffuser Adapters attached, and place them inside of your glove,
                  pushing it as far you can so the glove is tight over the diffuser adapter. Now it should look like you have flat top domes
                  inside your gloves. Grip the Diffuser Adapter from outside the glove. Do not hold by microlight or you risk causing extra
                  stress to the bulb. Take your cap, and place it over top of your glove and Diffuser Adapter and screw in the cap like you
                  would a jar. You should only need a single turn to become snug. Do not over tighten or push the cap on. Let the threads do
                  the work.
                </pre>
                <h3 className="ta-c title_font" id="diffuser_caps_warning">
                  WARNING
                </h3>
                <pre className="paragraph_font">
                  WARNING: NEVER force a bulb into the Diffuser Adapter as this could damage your microlight. If your chip is not fitting
                  into the Diffuser Adapter please contact us. Be extra cautious of your bulbs during insertion and removal and this part of
                  the microlight tends to be very delicate.
                </pre>

                <h3 style={{ clear: "both", textAlign: "center" }} className="title_font" id="orienting_your_diffuser_caps">
                  Orienting Your Diffuser Caps
                </h3>
                <div className="jc-c pos-rel">
                  <div className="iframe-container">
                    <iframe
                      width="996"
                      height="560"
                      title="	Orienting Your Diffuser Caps"
                      style={{ borderRadius: "20px" }}
                      src="https://www.youtube.com/embed/vG4qgtrotkw?mute=1&showinfo=0&rel=0&autoplay=1&loop=1"
                      frameborder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowfullscreen="1"
                    />
                  </div>
                </div>

                <pre className="paragraph_font">
                  To easily display all of your Diffuser Caps in the same orientation follow the steps above for using Diffuser Caps and
                  Adapters with the following 2 specifications: Put the Diffuser Adapters onto your microlight bulbs with the notch facing
                  the bottom of the microlight. Place the cap on upside down and give one half turn to screw in. To put Diffuser Caps in a
                  different orientation, follow the same steps but change the placement of the notch.
                </pre>
                <h3 className="ta-c title_font" id="diffuser_too_tight_too_loose">
                  Diffuser too tight or too loose?
                </h3>
                <pre className="paragraph_font">
                  Due to the handmade nature of our products, some variations may occur between individual diffusers. We test each diffuser
                  on a 5mm RGB 4 prong LED before packaging as 5mm is considered Standard bulb size and 2 prong bulbs are more varied in
                  size. Be aware that bulb sizes may vary by an imperceivable amount within sets of microlights due to the manufacturing
                  process. Different brands may also have slightly different sized bulbs, although the vast majority are 5mm. If one or more
                  of your diffusers or fit too tight or too loose, please try the diffuser on several different microlights in the set to
                  determine if it is a variant with the diffuser, or the bulb itself. If the problem persists please reach out to us and we
                  can discuss replacement options.
                </pre>
                <h3 className="ta-c title_font" id="glowskinz_warning">
                  WARNING
                </h3>
                <pre className="paragraph_font">
                  NEVER force a chip into Glowskinz as this could damage your microlight. If your chip is not fitting into the Glowskinz
                  please contact us. Be extra cautious of your bulbs during insertion and removal and this part of the microlight tends to
                  be very delicate.
                </pre>
                <Link to="/pages/contact">
                  <div className="jc-c">
                    <GLButton variant="primary" className="" style={{ margin: "auto" }}>
                      Contact
                    </GLButton>
                  </div>
                </Link>
              </div>
              <div className="container" style={{ margin: "10px 0" }}>
                <h2 className="title_font" style={{ textAlign: "center", marginBottom: "30px" }} id="ordering_custom_products">
                  Ordering Custom Products
                </h2>
                <pre className="paragraph_font">
                  At Glow LEDs you have the ability to customize any product we already sell, or create something completely unique! We
                  welcome any requests here. Our custom process is 5 steps: Deposit, Consultation, Drafting, Payment and Processing.
                </pre>

                <h3 className="ta-c title_font" id="deposit">
                  Deposit
                </h3>
                <pre className="paragraph_font">
                  A single 100% refundable deposit of $9.99 is required to hold your place in line and to be seen for a consultation. The
                  deposit will be deducted from the total price.
                </pre>
                <h3 className="ta-c title_font" id="consultation">
                  Consultation
                </h3>
                <pre className="paragraph_font">
                  After the deposit is paid we will reach out to you via email within a few days to discuss your ideas. Note: This step is
                  imperative. Please check your email frequently and remember to check your junk folder as well. We cannot move forward
                  without the consultation.
                </pre>
                <h3 className="ta-c title_font" id="drafting">
                  Drafting
                </h3>
                <pre className="paragraph_font">
                  After we get a good visualization of your idea, a design will be drafted by us, price will be determined and we will show
                  you our results. If we determine we are unable to produce what you are desiring, or you are unsatisfied with the results,
                  we will refund your $9.99 deposit.
                </pre>
                <h3 className="ta-c title_font" id="payment">
                  Payment
                </h3>
                <pre className="paragraph_font">
                  If you wish to proceed, the final payment will be required and we will begin production. The total price for a single
                  design starts at $50 and varies based on the intricacy of the design and materials used. If multiple designs are desired,
                  you will have to pay a similar price per design.
                </pre>
                <h3 className="ta-c title_font" id="processing">
                  Processing
                </h3>
                <pre className="paragraph_font">
                  We will then process and ship your design! Processing and shipping times are longer than normal products. We will give you
                  an estimated timeline of processing time at this step and then ship out your order when it's complete!
                </pre>
                <h3 className="ta-c title_font" id="notes">
                  Terms
                </h3>
                <pre className="paragraph_font">
                  We respect others art. Any designs that are trademarked or Copyrighted will not be redistributed without permission.
                  Sometimes your custom requests are already on our to-do list. If your request is for a common shape or pattern, you may
                  see your design idea come up for sale on the website later on. If you have an idea but don't want to pay custom pricing
                  feel free to send it as a suggestion and we may have it on the website in the near future!
                </pre>
                {/* <div
                  style={{ borderBottom: "1px white solid" }}
                  className="w-100per mv-10px"
                /> */}
                <Link to="/pages/contact/custom_orders">
                  <div className="jc-c">
                    <GLButton variant="primary" className="" style={{ margin: "auto" }}>
                      Contact
                    </GLButton>
                  </div>
                </Link>
              </div>
              {/* <div className="container" style={{ margin: "10px 0" }}>
                <h2 className="ta-c title_font" id="featured_content">
                  Featured Content
                </h2>
                <pre className="paragraph_font">
                  Please tag us on Facebook and Instagram when you receive your
                  products! We love to see how you put our products to use. To
                  be featured on our social media or website send us your videos
                  directly using the Contact GLButton here on the website. You
                  will be given a Wetransfer link where you can send us your
                  content to be featured.
                </pre>
                <Link to="/pages/contact/submit_content_to_be_featured">
                  <div className="jc-c">
                    <GLButton
                      variant="primary"
                      className=""
                      style={{ margin: "auto" }}
                    >
                      Contact
                    </GLButton>
                  </div>
                </Link>
              </div> */}

              <div className="container" style={{ margin: "10px 0" }}>
                <h2 className="ta-c title_font" id="processing_shipping">
                  Processing/Shipping
                </h2>
                <h3 className="ta-c title_font" id="procesing">
                  Processing
                </h3>
                <pre className="paragraph_font">
                  Order processing is the time it takes from when you place your order on our site to when it gets packed up and shipped
                  out. We always recommend purchasing your product at least 2 WEEKS before your event to ensure your products will arrive on
                  time. If you have passed this window, there is no guarantee you will have your products in time for your event. All of our
                  products are handmade to order and are processed in the order in which they are received. We will get your order in the
                  mail within approximately 3-10 business days after the order is placed, depending on how many orders are in front of you.
                  If a custom order is placed, processing times will be discussed during the custom process.
                </pre>
                <h3 className="ta-c title_font" id="shipping">
                  Shipping
                </h3>

                <pre className="paragraph_font">
                  Please note shipping times do not include order processing times. Small packages will be sent via USPS First Class and
                  large packages will be sent via USPS Priority Mail unless otherwise specified. Shipping time is 1-3 business days, but may
                  be delayed due to pandemic. Glow LEDs is not responsible for delays due to the post office.
                </pre>

                <h3 className="ta-c title_font" id="tracking">
                  Tracking
                </h3>
                <pre className="paragraph_font">
                  All shipments come with tracking numbers that will be sent to your email when the package is ready for shipment. If the
                  address on your order is incorrect, please contact us immediately at {process.env.REACT_APP_CONTACT_EMAIL}. If your
                  shipping information was incorrectly input and your package is returned to us, you will be responsible for paying the
                  secondary shipping fees.
                </pre>
                <h3 className="ta-c title_font" id="international_shipping">
                  International Shipping
                </h3>
                <pre className="paragraph_font">
                  We ship internationally! To anywhere US packages are allowed! If you live outside of the United States please check the
                  international checkbox when filling out shipping information. Shipping times will vary and depend on the destination
                  country. All shipments come with tracking numbers. Please contact us if you have questions.
                </pre>
                <h3 className="ta-c title_font" id="rush_delievery">
                  Rush Delivery
                </h3>
                <pre className="paragraph_font">
                  We currently do not offer rush delivery options. We always recommend purchasing your product at least 2 WEEKS before your
                  event to ensure your products will arrive on time. If you have passed this window, there is no guarantee you will have
                  your products in time for your event.
                </pre>
                <Link to="/pages/contact">
                  <div className="jc-c">
                    <GLButton variant="primary" className="" style={{ margin: "auto", marginBottom: "10px" }}>
                      Contact
                    </GLButton>
                  </div>
                </Link>
              </div>
              <div className="container" style={{ margin: "10px 0" }}>
                <h2 className="ta-c title_font" id="order_issues">
                  Order Issues
                </h2>
                <h3 className="ta-c title_font" id="delayed_orders">
                  Delayed Orders
                </h3>
                <pre className="paragraph_font" style={{ padding: "18px" }}>
                  We know you're excited to get your package, but unfortunately delays in transit times may occur with the carrier. In the
                  current pandemic delays are quite common. Please keep this in mind when ordering and avoid ordering last minute if
                  possible. Shipping delays are something we have no control over, please reach out to USPS with any questions.
                </pre>
                <h3 className="ta-c title_font" id="missing_orders">
                  Missing Orders
                </h3>
                <pre className="paragraph_font" style={{ padding: "18px" }}>
                  If your package has been marked delivered yet you can't locate it, the USPS requires we allow 7 days from the delivered
                  date to open an investigation. Please see the artice below for more information.
                </pre>
                <div className="jc-c">
                  <a href="https://www.usps.com/help/missing-mail.htm" target="_blank" rel="noreferrer">
                    <GLButton variant="primary" className="" style={{ margin: "auto" }}>
                      Find Missing Mail
                    </GLButton>
                  </a>
                </div>
                <h3 className="ta-c title_font" id="damaged_items">
                  Damaged Items
                </h3>
                <pre className="paragraph_font" style={{ padding: "18px" }}>
                  We take full responsibility for damaged products due to manufacturing defects. Please send us a photo at
                  {process.env.REACT_APP_CONTACT_EMAIL}., and we'll be happy to figure out a solution.
                </pre>
                <h3 className="ta-c title_font" id="cancelations">
                  Cancellations and Modifications
                </h3>
                <pre className="paragraph_font" style={{ padding: "18px" }}>
                  Once your order is placed, we have a very limited window to make any changes or cancellations. If you require an order
                  change or cancellation, please let us know as soon as possible by sending us an email to{" "}
                  {process.env.REACT_APP_CONTACT_EMAIL}. We can't guarantee that we'll be able to catch your order before it gets produced,
                  but we'll try our absolute best!
                </pre>

                <h3 className="ta-c title_font" id="returns">
                  Returns
                </h3>
                <pre className="paragraph_font" style={{ padding: "18px" }}>
                  We offer a 100% satisfaction guarantee. Returns are accepted within 30 days of delivery. To initiate a return please
                  contact {process.env.REACT_APP_CONTACT_EMAIL} and you will be supplied with a prepaid shipping label to send back your
                  product. Please include your full name and order number in the return shipment and you will be refunded the full amount
                  minus original shipping costs. Certian items are non-refundable. Refunds are returned to the original form of payment.
                  <Link to="/pages/contact/returns">
                    <div className="jc-c">
                      <GLButton variant="primary" className="" style={{ margin: "auto" }}>
                        Contact
                      </GLButton>
                    </div>
                  </Link>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
