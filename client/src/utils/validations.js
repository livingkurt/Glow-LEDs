import isEmpty from "is-empty";
// import Validator from 'validator';
import axios from "axios";

export const validate_promo_code = data => {
  let errors;
  let isValid = true;

  // Destructure data
  const { promo_code, promos, current_user, items_price, cartItems, dispatch } = data;

  // Check if promo_code exists in the database
  const promo = promos.find(p => p.promo_code.toLowerCase() === promo_code.toLowerCase());
  if (!promo) {
    errors.promo_code.push("Invalid promo code.");
    isValid = false;
    return { isValid, errors };
  }

  // Check if promo is active
  if (!promo.active) {
    errors.promo_code.push("This promo code is not active.");
    isValid = false;
  }

  // Check if promo has expired
  const now = new Date();
  if (promo.end_date && now > new Date(promo.end_date)) {
    errors.promo_code.push("This promo code has expired.");
    isValid = false;
  }

  // Check if promo is yet to start
  if (promo.start_date && now < new Date(promo.start_date)) {
    errors.promo_code.push("This promo code is not yet active.");
    isValid = false;
  }

  // Check if promo is admin_only and current_user is not admin
  if (promo.admin_only && !current_user.isAdmin) {
    errors.promo_code.push("This promo code is restricted to admins.");
    isValid = false;
  }
  // Check if promo is admin_only and current_user is not admin
  if (promo.sponsor_only && !current_user.isAdmin) {
    errors.promo_code.push("This promo code is restricted to admins.");
    isValid = false;
  }

  // Check if promo is affiliate_only and current_user is not an affiliate
  if (promo.affiliate_only && !current_user.is_affiliated) {
    errors.promo_code.push("This promo code is restricted to affiliates.");
    isValid = false;
  }

  // Check if the promo is single_use and has been used
  if (promo.single_use && promo.used_once) {
    errors.promo_code.push("This promo code has already been used.");
    isValid = false;
  }

  // Check if minimum_total is met
  if (promo.minimum_total > items_price) {
    errors.promo_code.push(`Minimum total of ${promo.minimum_total} is required.`);
    isValid = false;
  }

  return { isValid, errors };
};
// export const validate_promo_code = (data) => {
//   let errors = {};
//   interface errors {
//     promo_code;
//   }
//   const promo_codes = data.promos.map((promo) => promo.promo_code.toLowerCase());
//   //
//   const promo = data.promos.find((promo) => promo.promo_code === data.promo_code.toLowerCase());

//   // Convert empty fields to an empty string so we can use validator functions
//   data.promo_code = !isEmpty(data.promo_code) ? data.promo_code : "";
//   // Email checks
//   if (isEmpty2(data.promo_code)) {
//     errors.promo_code = "Promo Code Field Empty";
//   }
//   if (data.current_user) {
//     if (promo && promo.admin_only && data.current_user?.isAdmin === false) {
//       errors.promo_code = "Promo Code Not Active";
//     } else if (promo && promo.affiliate_only && data.current_user.is_affiliated === false) {
//       errors.promo_code = "Promo Code Not Active";
//     }
//     // else if (promo && promo.sponsor_only && data.current_user.affiliate.sponsor === false) {
//     //   errors.promo_code = "Promo Code Not Active";
//     // }
//   }
//   if (!data.current_user.hasOwnProperty("first_name")) {
//     if (promo && promo.admin_only) {
//       errors.promo_code = "Promo Code Not Active";
//     } else if (promo && promo.affiliate_only) {
//       errors.promo_code = "Promo Code Not Active";
//     }
//   }
//   let included_deductions = 0;
//   if (promo && promo.minimum_total) {
//     if (promo.include) {
//       included_deductions = promo.included_products.reduce((a, item) => a + item.price, 0);
//       if (promo.minimum_total > data.items_price - included_deductions) {
//         errors.promo_code = "Minimum Order Total Not Met";
//       }
//     } else {
//       if (promo.minimum_total > data.items_price) {
//         errors.promo_code = "Minimum Order Total Not Met";
//       }
//     }
//   }
//   // if (promo && promo.minimum_total && promo.minimum_total > data.items_price) {
//   // 	errors.promo_code = 'Minimum Order Total Not Met';
//   // }
//   // errors.promo_code = 'Promo Code Not Active Start';
//   if (promo && !promo.active) {
//     errors.promo_code = "Promo Code Not Active";
//   }
//   // if (promo && promo.include) {
//   //
//   // 	//
//   // 	//
//   // 	// const category_cart_items = data.cartItems.filter((item) =>
//   // 	// 	promo.included_categories.include(item.category)
//   // 	// );
//   // 	//
//   // 	let included_item_exists = false;
//   // 	data.cartItems.forEach((item) => {
//   //
//   // 		return promo.included_products.forEach((included_product) => {
//   //
//   // 			if (included_product.pathname === item.pathname) {
//   // 				included_item_exists = true;
//   // 			}
//   // 		});
//   // 	});
//   // 	//
//   //
//   // 	if (!included_item_exists) {
//   // 		errors.promo_code = 'Promo Code Not Active Not Included';
//   // 	}
//   // }

//   if (promo && promo.single_use && promo.used_once) {
//     //
//     errors.promo_code = "Promo Code Not Active";
//   }
//   // if (!promo_codes.includes(data.promo_code.toLowerCase())) {
//   //   errors.promo_code = "Promo Code Not Valid";
//   // }
//   const today = new Date();

//   if (promo && promo.time_limit) {
//     if (today >= new Date(promo.end_date) || today <= new Date(promo.start_date)) {
//       //
//       errors.promo_code = "Promo Code Not Active 7";
//     }
//     // else {
//     // }
//     // if (today < new Date(promo.start_date) && today > new Date(promo.end_date)) {
//     //
//     // }
//     //
//     // errors.promo_code = 'Promo Code Not Active';
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors)
//   };
// };

export const validate_email = async data => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  // Email checks
  const { data: user } = await axios.post("/api/users/validate_email/" + data.email);
  if (user) {
    errors.email = "Email Already Registered";
  }
  if (isEmpty2(data.email)) {
    errors.email = "Email field is required";
  } else if (!isEmail(data.email)) {
    errors.email = "Valid email required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};
export const validate_login = data => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // Email checks
  if (isEmpty2(data.email)) {
    errors.email = "Email field is required";
  } else if (!isEmail(data.email)) {
    errors.email = "Valid email required";
  }
  // Password checks
  if (isEmpty2(data.password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validate_registration = data => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.rePassword = !isEmpty(data.rePassword) ? data.rePassword : "";
  // First Name checks
  if (isEmpty2(data.first_name)) {
    errors.first_name = "First Name field is required";
  }
  // Last Name checks
  if (isEmpty2(data.last_name)) {
    errors.last_name = "Last Name field is required";
  }
  // Email checks
  if (isEmpty2(data.email)) {
    errors.email = "Email field is required";
  } else if (!isEmail(data.email)) {
    errors.email = "Email must a valid email";
  }
  // else if (data.email === data.email.toLowerCase()) {
  // 	errors.email = 'Email must a not contain uppercase letters';
  // }
  // Password checks
  if (isEmpty2(data.password)) {
    errors.password = "Password field is required";
  }
  if (isEmpty2(data.rePassword)) {
    errors.rePassword = "Confirm password field is required";
  }
  if (!isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!isEquals(data.password, data.rePassword)) {
    errors.rePassword = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validate_change_password = ({ currentPassword, password, rePassword }) => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  currentPassword = !isEmpty2(currentPassword) ? currentPassword : "";
  password = !isEmpty2(password) ? password : "";
  rePassword = !isEmpty2(rePassword) ? rePassword : "";

  // Current Password checks
  if (isEmpty2(currentPassword)) {
    errors.currentPassword = "Current password field is required";
  }

  // New Password checks
  if (isEmpty2(password)) {
    errors.password = "New password field is required";
  } else if (!isLength(password, { min: 6, max: 30 })) {
    errors.password = "New password must be at least 6 characters";
  } else if (isEquals(password, currentPassword)) {
    errors.password = "New password cannot be the same as your current password";
  }

  // Confirm New Password checks
  if (isEmpty2(rePassword)) {
    errors.rePassword = "Confirm new password field is required";
  } else if (!isEquals(password, rePassword)) {
    errors.rePassword = "New passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validate_shipping = ({
  email,
  first_name,
  last_name,
  address_1,
  city,
  state,
  postalCode,
  country,
  international,
}) => {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  email = !isEmpty(email) ? email : "";
  first_name = !isEmpty(first_name) ? first_name : "";
  last_name = !isEmpty(last_name) ? last_name : "";
  address_1 = !isEmpty(address_1) ? address_1 : "";
  city = !isEmpty(city) ? city : "";
  state = !isEmpty(state) ? state : "";
  postalCode = !isEmpty(postalCode) ? postalCode : "";
  country = !isEmpty(country) ? country : "";

  // Email Name checks
  if (isEmpty2(email)) {
    errors.email = "Email field is required";
  } else if (!isEmail(email)) {
    errors.email = "Valid email required";
  }

  // First Name checks
  if (isEmpty2(first_name)) {
    errors.first_name = "First Name field is required";
  }
  // Last Name checks
  if (isEmpty2(last_name)) {
    errors.last_name = "Last Name field is required";
  }
  // Address checks
  if (isEmpty2(address_1)) {
    errors.address_1 = "Address field is required";
  }
  // City checks
  if (isEmpty2(city)) {
    errors.city = "City field is required";
  }
  // State checks
  if (isEmpty2(state)) {
    errors.state = "State field is required";
  }
  // State checks
  if (
    (international && country.toLowerCase() === "us") ||
    country.toLowerCase() === "united states" ||
    country.toLowerCase() === "united states of america"
  ) {
    errors.country = "International Option Not Available for United States";
  }
  if (international) {
    // Country checks
    if (isEmpty2(country)) {
      errors.country = "Country field is required";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

const isEmpty2 = str => {
  return !str || str.length === 0;
};
const isEquals = (str_1, str_2) => {
  return str_1 === str_2;
};
const isLength = (str, length) => {
  if (str.length >= length.max && str.length <= length.min) {
    return false;
  } else {
    return true;
  }
};

const isEmail = email => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  return re.test(String(email).toLowerCase());
};

export const validate_payment = data => {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.paymentMethod = !isEmpty(data.paymentMethod) ? data.paymentMethod : "";
  // First Name checks
  if (isEmpty2(data.paymentMethod)) {
    errors.paymentMethod = "Payment Method is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validate_contact = data => {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  // data.order_number = !isEmpty(data.order_number) ? data.order_number : '';
  data.reason_for_contact = !isEmpty(data.reason_for_contact) ? data.reason_for_contact : "";
  data.message = !isEmpty(data.message) ? data.message : "";
  // First Name checks
  if (isEmpty2(data.first_name)) {
    errors.first_name = "First Name field is required";
  }
  // Last Name checks
  if (isEmpty2(data.last_name)) {
    errors.last_name = "Last Name field is required";
  }
  // Email checks
  if (isEmpty2(data.email)) {
    errors.email = "Email field is required";
  } else if (!isEmail(data.email)) {
    errors.email = "Email must be a valid email";
  }
  // // Password checks
  // if (isEmpty2(data.order_number)) {
  // 	errors.order_number = 'Order Number field is required';
  // }
  if (isEmpty2(data.reason_for_contact)) {
    errors.reason_for_contact = "Reason for Contact field is required";
  }
  if (isEmpty2(data.message)) {
    errors.message = "Message field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validate_profile = data => {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.first_name = !isEmpty(data.first_name) ? data.first_name : "";
  data.last_name = !isEmpty(data.last_name) ? data.last_name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  // First Name checks
  if (isEmpty2(data.first_name)) {
    errors.first_name = "First Name field is required";
  }
  // Last Name checks
  if (isEmpty2(data.last_name)) {
    errors.last_name = "Last Name field is required";
  }
  // Email checks
  if (isEmpty2(data.email)) {
    errors.email = "Email field is required";
  } else if (!isEmail(data.email)) {
    errors.email = "Valid email required";
  }

  return {
    errors,
    isValid: !isEmpty2(errors),
  };
};

export const validate_password_change = async data => {
  //
  //
  let errors = {};
  let request;
  if (data.current_password) {
    try {
      request = await axios.post("/api/users/check_password/" + data.id, {
        current_password: data.current_password,
      });

      // Password checks
    } catch (error) {
      errors.current_password = "Current Password is Incorrect";
    }
  }

  // Convert empty fields to an empty string so we can use validator functions
  data.current_password = !isEmpty(data.current_password) ? data.current_password : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.rePassword = !isEmpty(data.rePassword) ? data.rePassword : "";

  // // Password checks
  // if (!request.data) {
  // 	errors.current_password = 'Current Password is Incorrect';
  // }
  // Password checks
  if (isEmpty2(data.current_password)) {
    errors.current_password = "Current Password field is required";
  }
  // Password checks
  if (isEmpty2(data.password)) {
    errors.password = "Password field is required";
  }
  if (isEmpty2(data.rePassword)) {
    errors.rePassword = "Confirm password field is required";
  }
  if (!isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!isEquals(data.password, data.rePassword)) {
    errors.rePassword = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validate_passwords = async data => {
  //
  //
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.password = !isEmpty(data.password) ? data.password : "";
  data.rePassword = !isEmpty(data.rePassword) ? data.rePassword : "";

  // // Password checks
  // if (!request.data) {
  // 	errors.current_password = 'Current Password is Incorrect';
  // }
  // Password checks
  if (isEmpty2(data.password)) {
    errors.password = "Password field is required";
  }
  if (isEmpty2(data.rePassword)) {
    errors.rePassword = "Confirm password field is required";
  }
  if (!isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!isEquals(data.password, data.rePassword)) {
    errors.rePassword = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors),
  };
};

export const validate_affiliate = data => {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.artist_name = !isEmpty(data.artist_name) ? data.artist_name : "";
  data.years = !isEmpty(data.years) ? data.years : "";
  // data.international = !isEmpty(data.international) ? data.international : '';
  // First Name checks
  if (isEmpty2(data.artist_name)) {
    errors.artist_name = "First Name field is required";
  }
  // Last Name checks
  if (isEmpty2(data.years)) {
    errors.instagram_handle = "Last Name field is required";
  }
  // else if (data.years)
  // // International checks
  // if (Validator.isEmpty(data.international)) {
  // 	errors.international = 'Country field is required';
  // }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
