const affiliate_onboard = ({ first_name }) => {
  return `
    <div>
      <p>Hi ${first_name},</p>
      <p>Congratulations! You have been accepted into the Official Glow LEDs Affiliate Team!</p>
      <p>We have now converted your Glow LEDs account to an affiliate account, now you need to complete the following steps to finalize your admission.</p>
      <p><strong>Note: </strong>Before next steps, If you are currently logged in, please logout and log back in to continue.</p>
      <ol>
        <li>Navigate to your <a target="_blank" href="https://www.glow-leds.com/secure/account/profile">Profile Page</a></li>
        <li>Click the button that says <strong>Create Affiliate Profile</strong></li>
        <ol>
          <li>You will first be asked to <strong>Create an Affiliate Account</strong> (Fill out that form as best you can, you can always edit your profile in the future)</li>
          <li>Then create a <strong>Stripe Account</strong></li>
          <li>And lastly <strong>Join our Discord</strong></li>
        </ol>
        <li>Once completed you should be all set!</li>
        <li>Your Promo Codes and Affiliate stats will be displayed on your profile from now on</li>
      </ol>
      <p>Let us know if you have any questions, reply to this email as well as review the <a target="_blank" href="https://docs.google.com/document/d/1j3Bcv2__QGiTlVf--R-BNVpvGRN_RzWvuvMFCPodqS4/edit">Promoter Terms</a></p>
      <h3>Welcome to the Team!</h3>
      <p>Thanks,</p>
      <p>
        <div>Kurt @ Glow LEDs</div>
        <div><a target="_blank" href="mailto:contact.glowleds@gmail.com">contact.glowleds@gmail.com</a></div>
        <div><a target="_blank" href="http://www.glow-leds.com/">www.glow-leds.com</a></div>
      </p>
    </div>
  `;
};

export default affiliate_onboard;
