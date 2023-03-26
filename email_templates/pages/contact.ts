const contact = ({
  message,
  first_name,
  last_name,
  email,
  order_number,
  reason_for_contact
}: {
  message: string;
  first_name: string;
  last_name: string;
  email: string;
  order_number: string;
  reason_for_contact: string;
}): string => {
  return `
    <h1>
      Hello Kurt,
    </h1>
    <p>
      ${message}
    </p>
    ${
      reason_for_contact === "Custom Orders"
        ? `<h2
    className="title_font"
    style={{ textAlign: "center", marginBottom: "30px" }}
    id="ordering_custom_products"
  >
    Ordering Custom Products
  </h2>
  <p>
    At Glow LEDs you have the ability to customize any product we
    already sell, or create something completely unique! We
    welcome any requests here. Our custom process is 5 steps:
    Deposit, Consultation, Drafting, Payment and Processing.
  </p>

  <h3 >
    Step 1: Deposit
  </h3>
  <p>
    A single 100% refundable deposit of $9.99 is required to hold
    your place in line and to be seen for a consultation. The
    deposit will be deducted from the total price.
  </p>
  <h3 >
    Step 2: Consultation
  </h3>
  <p>
    After the deposit is paid we will reach out to you via email
    within a few days to discuss your ideas. Note: This step is
    imperative. Please check your email frequently and remember to
    check your junk folder as well. We cannot move forward without
    the consultation.
  </p>
  <h3 >
    Step 3: Drafting
  </h3>
  <p>
    After we get a good visualization of your idea, a design will
    be drafted by us, price will be determined and we will show
    you our results. If we determine we are unable to produce what
    you are desiring, or you are unsatisfied with the results, we
    will refund your $9.99 deposit.
  </p>
  <h3 >
    Step 4: Payment
  </h3>
  <p>
    If you wish to proceed, the final payment will be required and
    we will begin production. The total price for a single design
    starts at $50 and varies based on the intricacy of the design
    and materials used. If multiple designs are desired, you will
    have to pay a similar price per design.
  </p>
  <h3 >
    Step 5: Processing
  </h3>
  <p>
    We will then process and ship your design! Processing and
    shipping times are longer than normal products. We will give
    you an estimated timeline of processing time at this step and
    then ship out your order when it's complete!
  </p>
  <h3 >
    Terms
  </h3>
  <p>
    We respect others art. Any designs that are trademarked or
    Copyrighted will not be redistributed without permission.
    Sometimes your custom requests are already on our to-do list.
    If your request is for a common shape or pattern, you may see
    your design idea come up for sale on the website later on. If
    you have an idea but don't want to pay custom pricing feel
    free to send it as a suggestion and we may have it on the
    website in the near future!
  </p>`
        : ""
    }
    <h3>
      Thank you,
    </h3>
    <p>

      <div>Name: ${first_name} ${last_name}</div>

      <div>Email: ${email}</div>

      ${order_number ? `<div>Order Number: ${order_number}</div>` : `<div></div>`}

      <div>Reason For Contact: ${reason_for_contact}</div>

      </p>
	`;
};

export default contact;
