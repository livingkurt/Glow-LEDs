// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { validate_password_change } from "../../../utils/validations";
// import { Helmet } from "react-helmet";
// import { GLButton } from "../../../shared/GlowLEDsComponents";
// import * as API from "../../../api";
// import GLActiionModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";

// const ChangePasswordModal = props => {
//   const navigate = useNavigate();
//   const [current_password, setCurrentPassword] = useState("");
//   const [password, setPassword] = useState("");
//   const [rePassword, setRePassword] = useState("");

//   const dispatch = useDispatch();

//   const [current_password_validations, setCurrentPasswordValidations] = useState("");
//   const [password_validations, setPasswordValidations] = useState("");
//   const [re_password_validations, setRePasswordValidations] = useState("");

//   const userPage = useSelector(state => state.users.userPage);
//   const { current_user } = userPage;

//   const submitHandler = async e => {
//     e.preventDefault();
//     const validation_data = {
//       id: current_user._id,
//       current_password,
//       password,
//       rePassword,
//     };
//     const request = await validate_password_change(validation_data);

//     setCurrentPasswordValidations(request.errors.current_password);
//     setPasswordValidations(request.errors.password);
//     setRePasswordValidations(request.errors.rePassword);

//     if (request.isValid) {
//       dispatch(API.resetPassword({ user_id: current_user._id, password, rePassword }));
//       navigate(`/secure/account/profile`);
//     }
//   };

//   useEffect(() => {
//     let clean = true;
//     if (clean) {
//       if (current_user) {
//         setPassword(current_user.password);
//       }
//       dispatch(API.listOrders({ user: current_user._id }));
//     }
//     return () => (clean = false);
//   }, [current_user, dispatch]);

//   const formFields = {
//     current_password: {
//       type: "password",
//       label: "Current Password",
//       value: current_password,
//       onChange: value => setCurrentPassword(value),
//       error: current_password_validations,
//       permission: ["user"],
//     },
//     password: {
//       type: "password",
//       label: "New Password",
//       value: password,
//       onChange: value => setPassword(value),
//       error: password_validations,
//     },
//     rePassword: {
//       type: "password",
//       label: "Confirm New Password",
//       value: rePassword,
//       onChange: value => setRePassword(value),
//       error: re_password_validations,
//     },
//   };

//   return (
//     <div className="profile_container column p-20px">
//       <GLActiionModal
//         isOpen={edit_cart_modal}
//         onConfirm={() => {
//           submitHandler();
//         }}
//         onCancel={() => {
//           dispatch(set_edit_cart_modal(false));
//         }}
//         title={"Edit Cart"}
//         confirmLabel={"Save"}
//         confirmColor="primary"
//         cancelLabel={"Cancel"}
//         cancelColor="secondary"
//         disableEscapeKeyDown
//       >
//         <GLForm
//           formData={formFields}
//           state={cart}
//           onChange={value => dispatch(setChangePassword(value))}
//           loading={loading && loading_users && loading_products}
//         />
//       </GLActiionModal>
//     </div>
//   );
// };

// export default ChangePasswordModal;
