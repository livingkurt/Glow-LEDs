
import isEmpty from "is-empty";
import Validator from "validator";

export const format_date_display = unformatted_date => {
  const date = new Date(unformatted_date)
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  const formatted_date = `${month}/${day}/${year}`
  return formatted_date;
}

// export const email_validations = email => {


export const validate_login = data => {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email must include an @ symbol to be valid";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}

export const validate_registration = data => {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.rePassword = !isEmpty(data.rePassword) ? data.rePassword : "";
  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email must include an @ symbol to be valid";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.rePassword)) {
    errors.rePassword = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.rePassword)) {
    errors.rePassword = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}

export const validate_contact = data => {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.order_number = !isEmpty(data.order_number) ? data.order_number : "";
  data.reason_for_contact = !isEmpty(data.reason_for_contact) ? data.reason_for_contact : "";
  data.message = !isEmpty(data.message) ? data.message : "";
  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email must include an @ symbol to be valid";
  }
  // Password checks
  if (Validator.isEmpty(data.order_number)) {
    errors.order_number = "Order Number field is required";
  }
  if (Validator.isEmpty(data.reason_for_contact)) {
    errors.reason_for_contact = "Reason for Contact field is required";
  }
  if (Validator.isEmpty(data.message)) {
    errors.message = "Message field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

export const validate_profile = data => {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  // Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email must include an @ symbol to be valid";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
}

export const validate_password_change = data => {
  let errors = {};
  // Convert empty fields to an empty string so we can use validator functions
  data.current_password = !isEmpty(data.current_password) ? data.current_password : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.rePassword = !isEmpty(data.rePassword) ? data.rePassword : "";

  // Password checks
  if (Validator.isEmpty(data.current_password)) {
    errors.password = "Password field is required";
  }
  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(data.rePassword)) {
    errors.rePassword = "Confirm password field is required";
  }
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(data.password, data.rePassword)) {
    errors.rePassword = "Passwords must match";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
}