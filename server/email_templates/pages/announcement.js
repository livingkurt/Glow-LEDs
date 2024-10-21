const renderEmail = ({ module_color, button_color, text_color, title_color, button_text_color, modules }) => {
  let emailContent = "";

  modules &&
    modules.forEach(module => {
      switch (module.type) {
        case "title_image":
          emailContent += `
          <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:10px auto;">
            <tr>
              <td style="font-family:helvetica;padding:10px;">
                <img src=${module.content?.image?.link}?t=${Date.now()} alt="Glow LEDs" title="Email Image"
                  style="width:100%;" />
              </td>
            </tr>
          </table>`;
          break;
        case "line_break":
          emailContent += `
            <table style="width:100%;text-align:center;border-spacing:0;margin:10px auto;overflow:hidden;">
              <tr>
                <td style="padding:0;">
                  <div style="max-width:100%;overflow:hidden;position:relative;height:20px;">
                    <img src=${module.content?.line_break?.link}?t=${Date.now()} alt="Glow LEDs" title="Email Image"
                      style="position:absolute;left:50%;transform:translateX(-50%);height:100%;max-width:100%;object-fit:cover;" />
                  </div>
                </td>
              </tr>
            </table>`;
          break;
        case "heading":
          emailContent += `
          <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:10px auto;">
            <tr>
              <td style="font-family:helvetica;padding:10px;">
                <${module.content.size || "h1"} style="text-align:center;font-family:helvetica;width:100%;margin:10px auto;line-height:50px;color:${title_color};font-size:${module.content.size === "h1" ? "40px" : module.content.size === "h2" ? "35px" : "30px"}; padding-bottom: 7px;">
                  ${module.content.text}
                </${module.content.size || "h1"}>
              </td>
            </tr>
          </table>`;
          break;
        case "subheading":
          emailContent += `
          <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:10px auto;">
            <tr>
              <td style="font-family:helvetica;padding:10px;">
                <h2 style="text-align:center;font-family:helvetica;width:100%;margin:10px auto;line-height:50px;color:${title_color};font-size:30px; padding-bottom: 7px;">
                  ${module.content.text}
                </h2>
              </td>
            </tr>
          </table>`;
          break;
        case "body":
          emailContent += `
          <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:10px auto;">
            <tr>
              <td style="font-family:helvetica;padding:10px;">
                <p style="font-size:16px;line-height:1.5;color:${text_color};margin:0;">${module.content.text}</p>
              </td>
            </tr>
          </table>`;
          break;
        case "images":
          console.log({ images: module.content?.images });
          emailContent += `
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width:800px; margin: 0 auto; text-align:center;">
              <tr>
                ${module.content?.images?.reduce((acc, image) => {
                  acc += `
                  <td align="center" valign="top" style="width:100%; max-width:375px; display:inline-block; padding:5px; text-align:center; vertical-align:top;">
                    <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-spacing:0;">
                      <tr>
                        <td style="position: relative; width: 100%; overflow: hidden; border-radius:20px;">
                          <img src="${image?.link}?t=${Date.now()}" alt="Glow LEDs" title="Email Image"
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
        case "image":
          emailContent += `
          <table style="max-width:800px;width:100%;text-align:center;border-spacing:0;margin:10px auto;">
            <tr>
              <td style="font-family:helvetica;padding:10px;">
                <img src=${module.content?.image?.link}?t=${Date.now()} alt="Glow LEDs" title="Email Image" style="width:100%;" />
              </td>
            </tr>
          </table>`;
          break;
        case "button":
          emailContent += `
          <table style="max-width:800px;width:100%;text-align:center;border-spacing:0;margin:10px auto;">
            <tr>
              <td style="font-family:helvetica;padding:10px;">
                <a href="${module.content?.link}" style="display:inline-block;padding:12px 20px;background-color:${button_color};color:${button_text_color};text-decoration:none;border-radius:5px;font-size:20px;font-weight:bold;">${module.content?.text}</a>
              </td>
            </tr>
          </table>`;
          break;
        case "html":
          emailContent += `
          <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:10px auto;">
            <tr>
              <td style="font-family:helvetica;padding:10px;">
                ${module.content?.html}
              </td>
            </tr>
          </table>`;
          break;
        case "divider":
          emailContent += `
          <table style="max-width:800px;width:100%;text-align:center;border-spacing:0;margin:20px auto;">
            <tr>
              <td style="padding:0;">
                <div style="border-top:1px solid ${module_color};"></div>
              </td>
            </tr>
          </table>`;
          break;
        case "spacer":
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
