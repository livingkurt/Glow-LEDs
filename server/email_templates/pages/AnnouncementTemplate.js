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
              <td style="font-family:helvetica;">
                <${module.content.size || "h1"} style="text-align:center;font-family:helvetica;width:100%;line-height:50px;color:${title_color};  margin: ${module.content.size === "h1" ? "10px 0" : "0"};">
                  ${module.content.text}
                </${module.content.size || "h1"}>
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
              <td style="font-family:helvetica;padding:10px; border-radius:20px;">
                <img src=${module.content?.image?.link}?t=${Date.now()} alt="Glow LEDs" title="Email Image"   style="width:100%; height:auto; display:block; border:0; object-fit: cover;  border-radius:20px; " />
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
        case "video":
          emailContent += `
          <table style="max-width:800px;width:100%;text-align:center;border-spacing:0;margin:10px auto;">
            <tr>
              <td style="font-family:helvetica;padding:10px; border-radius:20px; position:relative;">
                <a href="${module.content?.link}" style="display:block; position:relative;">
                  <img src="http://img.youtube.com/vi/${module.content?.video_link}/hqdefault.jpg?t=${Date.now()}" alt="Video Thumbnail" title="Video Thumbnail" style="width:100%; height:auto; display:block; border:0; object-fit: cover; border-radius:20px; aspect-ratio: 16 / 9;" />
                  <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); width:68px; height:48px; background-color:rgba(0,0,0,0.7); border-radius:14px; display:flex; justify-content:center; align-items:center;">
                    <div style="width:0; height:0; border-top:10px solid transparent; border-bottom:10px solid transparent; border-left:20px solid white; margin-left:5px;"></div>
                  </div>
                </a>
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
