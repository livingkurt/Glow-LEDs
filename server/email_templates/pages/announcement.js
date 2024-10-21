// In your server-side rendering logic or API endpoint
const renderEmail = ({ module_color, button_color, text_color, title_color, button_text_color, modules }) => {
  let emailContent = "";

  modules.forEach(module => {
    console.log({ content: module.content, type: module.type });
    switch (module.type) {
      case "Title Image":
        emailContent += `
          <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:10px auto;">
            <tr>
              <td style="font-family:helvetica;padding:10px;">
                <img src=${module.content.title_image.link}?t=${Date.now()} alt="Glow LEDs" title="Email Image"
                  style="width:100%;" />
              </td>
            </tr>
          </table>`;
        break;
      case "Line Break":
        emailContent += `
          <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:10px auto;">
            <tr>
              <td style="font-family:helvetica;padding:10px;">
                <img src=${module.content?.line_break?.link}?t=${Date.now()} alt="Glow LEDs" title="Email Image"
                  style="width:100%;" />
              </td>
            </tr>
          </table>`;
        break;
      case "Heading":
        emailContent += `
          <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:10px auto;">
            <tr>
              <td style="font-family:helvetica;padding:10px;">
                <h1 style="text-align:center;font-family:helvetica;width:100%;margin:10px auto;line-height:50px;color:${title_color};font-size:40px; padding-bottom: 7px;">
                  ${module.content.heading}
                </h1>
              </td>
            </tr>
          </table>`;
        break;
      case "Subheading":
        emailContent += `
          <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:10px auto;">
            <tr>
              <td style="font-family:helvetica;padding:10px;">
                <h2 style="text-align:center;font-family:helvetica;width:100%;margin:10px auto;line-height:50px;color:${title_color};font-size:30px; padding-bottom: 7px;">
                  ${module.content.subheading}
                </h2>
              </td>
            </tr>
          </table>`;
        break;
      case "Body":
        emailContent += `
          <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:10px auto;">
            <tr>
              <td style="font-family:helvetica;padding:10px;">
                <p style="font-size:16px;line-height:1.5;color:${text_color};margin:0;">${module.content.body}</p>
              </td>
            </tr>
          </table>`;
        break;
      case "Images":
        emailContent += `
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:800px; margin: 0 auto; text-align:center;">
              <tr>
                ${module.content.images.reduce((acc, image) => {
                  acc += `
                  <td align="center" valign="top" style="width:100%; max-width:375px; display:inline-block; padding:5px; text-align:center; vertical-align:top;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0;">
                      <tr>
                        <td style="position: relative; width: 100%; overflow: hidden; border-radius:20px;">
                          <img src="${image.link}?t=${Date.now()}" alt="Glow LEDs" title="Email Image"
                            style="width:100%; height:auto; display:block; border:0; object-fit: cover; aspect-ratio: 1 / 1;" />
                        </td>
                      </tr>
                    </table>
                  </td>`;
                  return acc;
                }, "")}
              </tr>
            </table>`;
        break;

      case "Button":
        emailContent += `
          <table style="max-width:800px;width:100%;text-align:center;border-spacing:0;margin:10px auto;">
            <tr>
              <td style="font-family:helvetica;padding:10px;">
                <a href="${module.content.buttonLink}" style="display:inline-block;padding:12px 20px;background-color:${button_color};color:${button_text_color};text-decoration:none;border-radius:5px;font-size:20px;font-weight:bold;">${module.content.buttonText}</a>
              </td>
            </tr>
          </table>`;
        break;
      case "HTML":
        emailContent += `
          <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:10px auto;">
            <tr>
              <td style="font-family:helvetica;padding:10px;">
                ${module.content.html}
              </td>
            </tr>
          </table>`;
        break;
      case "Divider":
        emailContent += `
          <table style="max-width:800px;width:100%;text-align:center;border-spacing:0;margin:20px auto;">
            <tr>
              <td style="padding:0;">
                <div style="border-top:1px solid ${module.content.dividerColor};"></div>
              </td>
            </tr>
          </table>`;
        break;
      case "Spacer":
        emailContent += `
          <table style="max-width:800px;width:100%;border-spacing:0;margin:0 auto;">
            <tr>
              <td style="height:20px;"></td>
            </tr>
          </table>`;
        break;
      default:
        break;
    }
  });

  return emailContent;
};

export default ({ module_color, button_color, text_color, title_color, modules, button_text_color }) => {
  return `<table style="border-spacing:0;width:100%; padding: 10px; max-width: 800px; width: 100%; margin: auto;">
  <tbody>
    <tr style="font-size:16px">
      <td>
        ${renderEmail({ module_color, button_color, text_color, title_color, modules, button_text_color })}
      </td>
    </tr>
  </tbody>
</table>`;
};
