import config from "../../config.js";

export default (gift_cards, affiliate, level, monthlyTasks, isSponsorReward = false, stats = {}) => {
  const { codeUses = 0, revenue = 0, earnings = 0, percentageOff = 0 } = stats;
  const totalPoints = monthlyTasks.reduce((sum, task) => sum + task.points, 0);

  const getLevelStyle = taskLevel => {
    switch (taskLevel) {
      case "Gold":
        return {
          color: "white",
          icon: "🏆",
          gradient: "linear-gradient(45deg, #B7995D, #FFD700, #B7995D)",
          border: "2px solid #FFD700",
        };
      case "Silver":
        return {
          color: "white",
          icon: "🥈",
          gradient: "linear-gradient(45deg, #808080, #C0C0C0, #808080)",
          border: "2px solid #C0C0C0",
        };
      case "Bronze":
        return {
          color: "white",
          icon: "🥉",
          gradient: "linear-gradient(45deg, #804A1F, #CD7F32, #804A1F)",
          border: "2px solid #CD7F32",
        };
      default:
        return {
          color: "white",
          icon: "⭐",
          gradient: "none",
          border: "none",
        };
    }
  };

  const levelStyle = getLevelStyle(level);

  return `
  <table style="width:100%;border-spacing:0; padding: 10px;">
    <tr>
      <td style="font-family:helvetica;border:0">
        <center>
          <table style="max-width:800px;width:100%;text-align:left;border-spacing:0;margin:0 auto;color:white">
            <tr>
              <td style="font-family:helvetica;color:white">
                <h1 style="text-align:center;font-family:helvetica;width:100%;margin:10px auto;line-height:50px;color:#333333;font-size:30px; padding-bottom: 7px;">
                  Your Glow LEDs Affiliate Earnings
                </h1>
              </td>
            </tr>
          </table>

          <!-- Monthly Stats Section -->
          <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: #585858; border-radius: 20px; padding:15px; margin-bottom: 20px;">
            <tbody>
              <tr>
                <td style="font-family:helvetica">
                  <h3 style="color:white;font-size:25px;margin:0 0 15px 0;">Monthly Statistics for ${affiliate.artist_name}</h3>
                  <div style="background: #4c4f60; border-radius: 15px; padding: 20px">
                    <p style="margin: 5px 0;"><strong>Code Uses:</strong> ${codeUses}</p>
                    <p style="margin: 5px 0;"><strong>Revenue Generated:</strong> $${revenue.toFixed(2)}</p>
                    <p style="margin: 5px 0;"><strong>Your Earnings:</strong> $${earnings.toFixed(2)}</p>
                    <p style="margin: 5px 0;"><strong>Private Code Discount:</strong> ${percentageOff}%</p>
                  </div>
                   <div style="background: ${affiliate?.user?.stripe_connect_id ? "#2d5a27" : "#a00808"}; border-radius: 15px; padding: 20px; margin-top: 10px;">
                    <div style="color:white;line-height:1.6;font-size:16px;margin:0;">
                    ${
                      affiliate?.user?.stripe_connect_id
                        ? `
                        <p style="margin: 0;">
                          <span style="font-size: 24px;">💳</span> <strong>Payment Status:</strong> Your earnings have been sent to your Stripe account and will be available within 5 business days.
                        </p>
                        `
                        : `
                        <p style="margin: 0;">
                          <span style="font-size: 24px;">⚠️</span> <strong>Action Required:</strong> Please set up your Stripe account to receive your earnings. Contact us at <a href="mailto:${config.CONTACT_EMAIL}" style="color:white;">${config.CONTACT_EMAIL}</a> to get started.
                        </p>
                        `
                    }
                  </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>

          ${
            isSponsorReward
              ? `
          <!-- Sponsor Rewards Section -->
          <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: #585858; border-radius: 20px; padding:15px; margin-bottom: 20px;">
            <tbody>
              <tr>
                <td style="font-family:helvetica">
                  <h3 style="color:white;font-size:25px;margin:0 0 15px 0;">Sponsor Rewards</h3>

                  ${
                    gift_cards[0]?.initialBalance
                      ? `
                    <div style="background: ${levelStyle.gradient}; border: ${levelStyle.border}; border-radius: 15px; padding: 20px; margin-bottom: 20px; text-align: center;">
                      <div style="font-size: 48px; margin-bottom: 10px;">${levelStyle.icon}</div>
                      <h2 style="color: ${levelStyle.color}; font-size: 32px; margin: 0 0 10px 0; text-transform: uppercase;">
                        ${level} Level Achieved!
                      </h2>
                      <p style="color:white;font-size:18px;margin:0;">
                        Congratulations! You've earned a <strong style="color: ${levelStyle.color}">$${gift_cards[0].initialBalance.toFixed(2)} Gift Card</strong>
                      </p>
                    </div>
                    `
                      : ""
                  }

                  <div style="background: #4c4f60; border-radius: 15px; padding: 20px">
                    <h4 style="color:white;font-size:20px;margin:0 0 10px 0;">Task Completion Summary</h4>
                    <p style="color:white;line-height:1.6;font-size:16px;margin:0 0 10px 0;">
                      <span style="font-size: 24px;">📋</span> Completed Tasks: <strong>${monthlyTasks.length}</strong><br>
                      <span style="font-size: 24px;">⭐</span> Total Points: <strong>${totalPoints}</strong>
                    </p>
                    <ul style="color:white;line-height:1.6;font-size:16px;margin:10px 0;padding-left:20px;">
                      ${monthlyTasks.map(task => `<li>${task.taskName} (${task.isFullLightshow ? "Full Lightshow" : `${task.points} points`})</li>`).join("")}
                    </ul>
                  </div>

                  ${(() => {
                    if (totalPoints < 3) {
                      return `
                        <div style="background: #a00808; border-radius: 15px; padding: 20px; margin-top: 10px;">
                          <p style="color:white;line-height:1.6;font-size:16px;margin:0;">
                            <span style="font-size: 24px;">⚠️</span> <strong>Warning:</strong> You completed less than 3 task points this month which counts as a strike. Remember to complete at least 3 task points each month to avoid strikes.
                          </p>
                        </div>
                      `;
                    }

                    if (gift_cards[0]?.initialBalance) {
                      return "";
                    }

                    return `
                        <div style="background: #4c4f60; border-radius: 15px; padding: 20px;">
                          <p style="color:white;line-height:1.6;font-size:16px;margin:0;">
                            <span style="font-size: 24px;">ℹ️</span> While you completed the minimum tasks, additional requirements are needed for a gift card reward.
                            <br><br>
                            <strong>Next Level Requirements:</strong><br>
                            🥉 Bronze: 3 points + any tasks<br>
                            🥈 Silver: 5 points + full lightshow<br>
                            🏆 Gold: 8 points + full lightshow + $500 revenue
                          </p>
                        </div>
                    `;
                  })()}
                </td>
              </tr>
            </tbody>
          </table>
          `
              : ""
          }

          ${
            gift_cards.length > 0
              ? gift_cards
                  .map(
                    gift_card => `
            <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: #585858; border-radius: 20px; padding:15px; margin-bottom: 20px;">
              <tbody>
                <tr>
                  <td style="font-family:helvetica">
                    <h2 style="color:white;text-align:center;font-size:25px;margin:10px 0;">
                      Your Gift Card${gift_card?.quantity > 1 ? "s" : ""}
                    </h2>

                    ${Array(gift_card?.quantity)
                      .fill()
                      .map(
                        (_, index) => `
                      <div style="background: ${levelStyle.gradient}; padding: 20px; border-radius: 15px; margin: 15px 0; text-align: center; border: ${levelStyle.border};">
                        ${
                          gift_card?.display_image_object?.link
                            ? `<img src="${gift_card?.display_image_object?.link}" alt="Gift Card" style="max-width: 200px; margin-bottom: 15px; border-radius: 8px;">`
                            : ""
                        }
                        <div style="font-size: 24px; color: ${levelStyle.color}; margin-bottom: 10px; font-weight: bold;">
                          $${gift_card.initialBalance.toFixed(2)} Gift Card ${gift_card.quantity > 1 ? index + 1 : ""}
                        </div>
                        <div style="font-size: 20px; letter-spacing: 2px; color: white; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 10px; font-weight: bold;">
                          ${gift_card.codes[index]}
                        </div>
                      </div>
                    `
                      )
                      .join("")}
                  </td>
                </tr>
              </tbody>
            </table>
          `
                  )
                  .join("")
              : ""
          }

          ${
            gift_cards.length > 0
              ? `
          <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:0 auto; background-color: #585858; border-radius: 20px; padding:15px;">
            <tbody>
              <tr>
                <td style="font-family:helvetica">
                  <h3 style="color:white;font-size:25px;margin:0 0 15px 0;">How to Redeem Your Gift Card</h3>
                  <ol style="color:white;line-height:1.6;font-size:16px;margin:0;padding-left:20px;">
                    <li>Visit <a href="https://www.glow-leds.com" style="color:white;text-decoration:underline;">Glow LEDs</a></li>
                    <li>Add items to cart</li>
                    <li>Enter a gift card code in the promo code field during checkout</li>
                    <li>The gift card value will be automatically applied to their order</li>
                  </ol>
                </td>
              </tr>
            </tbody>
          </table>

          <table style="max-width:560px;width:100%;text-align:left;border-spacing:0;margin:20px auto 0; background-color: #585858; border-radius: 20px; padding:15px;">
            <tbody>
              <tr>
                <td style="font-family:helvetica">
                  <p style="color:white;line-height:1.6;font-size:14px;margin:0;text-align:center;">
                    Once redeemed, Gift cards are non-transferable and cannot be redeemed for cash.<br>
                    Recipients can check their gift card balance anytime by entering the code at checkout.<br>
                    For assistance, please contact our support team.
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
          `
              : ""
          }

        </center>
      </td>
    </tr>
  </table>`;
};
