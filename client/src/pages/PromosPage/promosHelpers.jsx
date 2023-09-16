const colors = [
  // { name: 'Percentage Off', color: '#6d3e3e' },
  // { name: 'Amount Off', color: '#6d3e5c' },
  // { name: 'Free Shipping', color: '#3e4c6d' },
  { name: "Admin Only", color: "#525252" },
  { name: "Affiliate Only", color: "#7d5555" },
  { name: "No Restrictions", color: "#3e4c6d" },
  { name: "Single Use", color: "#5f557d" },
  { name: "Used", color: "#303030" },
  { name: "Deactivated", color: "#466475" },
  // { name: 'Specific User', color: '#3d7f79' }
  // { name: 'Active', color: '#3f6561' }
];

export const determine_color = promo => {
  let result = "";

  // if (promo.percentage_off > 0) {
  // 	result = colors[4].color;
  // }
  // if (promo.amount_off > 0) {
  // 	result = colors[3].color;
  // }
  // if (promo.free_shipping) {
  // 	result = colors[0].color;
  // }

  if (promo.admin_only) {
    result = colors[0].color;
  }
  if (promo.affiliate_only) {
    result = colors[1].color;
  }

  if (!promo.affiliate_only && !promo.admin_only) {
    result = colors[2].color;
  }

  if (promo.single_use) {
    result = colors[3].color;
  }
  if (promo.used_once) {
    result = colors[4].color;
  }
  if (!promo.active) {
    result = colors[5].color;
  }
  //  else {
  // 	result = colors[2].color;
  // }
  // if (promo.single_use && promo.used) {
  // 	result = colors[4].color;
  // } else {
  // 	result = colors[2].color;
  // }

  // if (promo.used) {
  // 	result = colors[4].color;
  // } else if (promo.admin_only) {
  // 	result = colors[0].color;
  // } else if (promo.affiliate_only) {
  // 	result = colors[1].color;
  // } else if (!promo.affiliate_only && !promo.admin_only) {
  // 	if (promo.single_use) {
  // 		if (promo.single_use && promo.used) {
  // 			result = colors[4].color;
  // 		} else {
  // 			result = colors[3].color;
  // 		}
  // 	}
  // } else {
  // 	result = colors[2].color;
  // }

  // if (promo.user) {
  // 	result = colors[3].color;
  // }
  return result;
};
