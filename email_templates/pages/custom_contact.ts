export default ({ order }: any): string => {
  return `
    <h1>
      Hello ${order.shipping.first_name},
    </h1>
    <p>
      Thank you for choosing to customize your order!

    </p>
    <h3>
      How our Custom Product process works
    </h3>
    <p>
      Our custom process is 5 steps:
      Deposit, Consultation, Drafting, Payment and Processing.
    </p>
    <h3>
    Step 1: Deposit √
    </h3>
      <p>
      Congratulations you made your depost! Your place in line is secured!
    </p>
    <h3>
      Step 2: Consultation
    </h3>
    <p>
      Please reply to this email with a description in detail of what you would like us to make for you.
      This could be modifying a current product or a creating a completly new product!
      Feel free to send inspiration photos and drawings to help us better understand your vision.
    </p>
    <h3>
      Step 3: Drafting
    </h3>
    <p>
      After we get a good visualization of your idea, a design will
      be drafted by us, price will be determined and we will show
      you our results. If we determine we are unable to produce what
      you are desiring, or you are unsatisfied with the draft, we
      will refund your $9.99 deposit.
    </p>
    <h3>
     Step 4: Payment
    </h3>
    <p>
      If you wish to proceed, the final payment will be required and
      we will begin production. The total price for a single design
      starts at $50 and varies based on the intricacy of the design
      and materials used. If multiple designs are desired, you will
      have to pay a similar price per design.
    </p>
    <h3>
      Step 5: Processing
    </h3>
    <p>
      We will then process and ship your design! Processing and
      shipping times are longer than normal products. We will give
      you an estimated timeline of processing time at this step and
      then ship out your order when it's complete!
    </p>
    <h3>
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
    </p>
    <h3>
      Thank you,
    </h3>
    <p>
      <div>Name: ${order.shipping.first_name} ${order.shipping.last_name}</div>

      <div>Email: ${order.shipping.email}</div>

      <div>Order #: ${order._id}</div>
    </p>
	`;
};
