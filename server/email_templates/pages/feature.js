import config from "../../config";
import { toCapitalize } from "../../utils/util";

export default ({ feature }) => {
  return `<table style="border-spacing:0;width:100%; padding: 10px; max-width: 600px; width: 100%; margin: auto;">
  <tbody>
    <tr>
      <td><img src="https://thumbs2.imgbox.com/b1/08/2Dnle6TI_t.jpeg" alt="Glow LEDs" title="Email Image"
          style="text-align:center;width:100%;border-radius:20px" /></td>
    </tr>
    <tr>
      <table style="border-spacing:0;margin:auto">
        <tbody>
          <tr style="font-family:helvetica;border-radius:4px">
            <td>
              <h3
                style="text-align:center;font-family:helvetica;color:white;font-size:20px;margin-top:20px;margin-bottom:0">
                Feature Submitted Successfully!</h3>
            </td>
          </tr>
        </tbody>
      </table>
      <table style="border-spacing:0;width:100%;max-width:800px;margin:auto;padding:10px;margin-top:19px">
        <tbody>
          <tr>
            <td style="font-size:20px;text-align:center">Feature Info</td>
          </tr>
          <tr>
            <td style="font-size:16px;height:30px"><strong>Artist Name:</strong> ${feature.artist_name}</td>
          </tr>
          <tr>
            <td style="font-size:16px;height:30px"><strong>Email:</strong> ${feature.email}</td>
          </tr>
          <tr>
            <td style="font-size:16px;height:30px"><strong>Category:</strong> ${
              feature && feature.category ? toCapitalize(feature.category) : ""
            }</td>
          </tr>
          ${
            feature.instagram_handle
              ? `<tr>
            <td style="font-size:16px;height:30px"><strong>Instagram:</strong> ${feature.instagram_handle}</td>
          </tr>`
              : ""
          }
          ${
            feature.facebook_name
              ? `<tr>
            <td style="font-size:16px;height:30px"><strong>Facebook:</strong> ${feature.facebook_name}</td>
          </tr>`
              : ""
          }
          ${
            feature.description
              ? `<tr>
            <td style="font-size:16px;height:30px">
              <p style="line-height: 30px;"><strong>Bio:</strong> ${feature.description}</p>
            </td>
          </tr>`
              : ""
          }
          ${
            feature.song_id
              ? `<tr>
            <td style="font-size:16px;height:30px"><strong>Song ID:</strong> ${feature.song_id}</td>
          </tr>`
              : ""
          }
        </tbody>
      </table>
      <table style="border-spacing:0;margin-top:19px;width:100%;padding:10px">
        <tbody>
          <tr style="font-size:20px;text-align:center">
            <td>
              <p
                style="font-size:16px;line-height:30px;max-width:800px;text-align:center;width:100%;margin:20px auto;color:white">
                Please follow the steps below to sending us your art. Your content will be featured on our
                Facebook and Instagram pages as well as a spot on our website! We really appreciate you taking the
                time to submit your pictures and videos to us! We love posting your art so everyone can see!
                Whenever you feel inspired please do not hesitate to send us a video. We will be honored to
                feature it! </p>
            </td>
          </tr>
        </tbody>
      </table>
      <table style="border-spacing:0;margin:19px 0;width:100%">
        <tbody>
          <tr style="font-size:20px;text-align:center">
            <td>
              <h4
                style="text-align:center;font-family:helvetica;color:white;font-size:20px;margin-top:0px;margin-bottom:0">
                How to Send Content via WeTansfer</h4>
            </td>
          </tr>
        </tbody>
      </table>
      <table style="border-spacing:0;margin:19px 0;width:100%">
        <tbody>
          <tr style="font-size:20px;text-align:center">
            <td>
            <ol width="100%" style="color:white;max-width:800px;margin:auto">
            <li>
              <div>
                <div >
                  <div>Click the WeTransfer button to begin</div>
                  <div style="display:flex;justify-content:center"><a href="https://wetransfer.com/"
                      style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px;margin:20px;text-decoration:none">
                      <h4 style="font-family:helvetica;margin:0;font-size:20px;text-align:center">WeTransfer.com</h4>
                    </a></div>
                </div>
              </div>
            </li>
            <li>
              <div>Look for a window that looks like this:</div>
              <table width="100%" style="max-width:400px;width:100%;margin:auto">
                <tr>
                  <td><img src="https://thumbs2.imgbox.com/d0/ef/EWIZve42_t.png" alt="Glow LEDs" title="Email Image"
                      style="margin-left:-20px;text-align:center;width:100%;border-radius:20px" /></td>
                </tr>
              </table>
            </li>
            <li>
              <div>Click &quot;Add your files&quot; to choose the content you wish to send</div>
              <table width="100%" style="max-width:400px;width:100%;margin:auto">
                <tr>
                  <td><img src="https://thumbs2.imgbox.com/90/f3/LA7rHfAH_t.png" alt="Glow LEDs" title="Email Image"
                      style="margin-left:-20px;text-align:center;width:100%;border-radius:20px" /></td>
                </tr>
              </table>
            </li>
            <li>
              <div>Type or paste ${config.CONTACT_EMAIL} into the &quot;Email To&quot; field</div>
              <table width="100%" style="max-width:400px;width:100%;margin:auto">
                <tr>
                  <td><img src="https://thumbs2.imgbox.com/b9/4f/IW8ZTgwp_t.png" alt="Glow LEDs" title="Email Image"
                      style="margin-left:-20px;text-align:center;width:100%;border-radius:20px" /></td>
                </tr>
              </table>
            </li>
            <li>
              <div>Type your email into the &quot;Email From&quot; field</div>
              <table width="100%" style="max-width:400px;width:100%;margin:auto">
                <tr>
                  <td><img src="https://thumbs2.imgbox.com/b8/34/sEXmUSJH_t.png" alt="Glow LEDs" title="Email Image"
                      style="margin-left:-20px;text-align:center;width:100%;border-radius:20px" /></td>
                </tr>
              </table>
            </li>
            <li>
              <div>Click the transfer button</div>
              <table width="100%" style="max-width:400px;width:100%;margin:auto">
                <tr>
                  <td><img src="https://thumbs2.imgbox.com/bd/c4/Lxu9OfEp_t.png" alt="Glow LEDs" title="Email Image"
                      style="margin-left:-20px;text-align:center;width:100%;border-radius:20px" /></td>
                </tr>
              </table>
            </li>
            <li>
              <div>You may need to verify your email</div>
              <table width="100%" style="max-width:400px;width:100%;margin:auto">
                <tr>
                  <td><img src="https://thumbs2.imgbox.com/2b/9e/UwReXG8i_t.png" alt="Glow LEDs" title="Email Image"
                      style="margin-left:-20px;text-align:center;width:100%;border-radius:20px" /></td>
                </tr>
              </table>
            </li>
            <li>
              <div>Once verified your transfer will begin!</div>
              <table width="100%" style="max-width:400px;width:100%;margin:auto">
                <tr>
                  <td><img src="https://thumbs2.imgbox.com/f5/b2/jibRBVhN_t.png" alt="Glow LEDs" title="Email Image"
                      style="margin-left:-20px;text-align:center;width:100%;border-radius:20px" /></td>
                </tr>
              </table>
            </li>
            <li>
              <div>In a few minutes your transfer will finish</div>
              <table width="100%" style="max-width:400px;width:100%;margin:auto">
                <tr>
                  <td><img src="https://thumbs2.imgbox.com/60/44/pU1uEWBN_t.png" alt="Glow LEDs" title="Email Image"
                      style="margin-left:-20px;text-align:center;width:100%;border-radius:20px" /></td>
                </tr>
              </table>
            </li>
          </ol>
            </td>
          </tr>
        </tbody>
      </table>

      <table style="border-spacing:0;margin-top:19px;width:100%">
        <tbody>
          <tr style="font-size:16px;text-align:center">
            <td>
              <h4
                style="text-align:center;font-family:helvetica;color:white;font-size:20px;margin-top:20px;margin-bottom:0;margin:10px">
                You have completed transferring content to Glow LEDs via WeTransfer</h4>
            </td>
          </tr>
        </tbody>
      </table>
      <div style="display:flex;justify-content:center;margin:10px"><a
          href="https://www.glow-leds.com/menu/featured"
          style="background-color:#4c4f60;color:white;border-radius:10px;border:0;padding:15px;text-decoration:none">
          <h4 style="font-family:helvetica;margin:0;font-size:20px;text-align:center">Check Out the Glow LEDs
            Feature Section</h4>
        </a></div>
    `;
};
