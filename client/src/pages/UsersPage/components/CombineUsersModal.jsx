import React, { useState } from "react";
import { Box, FormControlLabel, Radio, RadioGroup, Typography, Grid, Paper } from "@mui/material";
import GLActiionModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { useDispatch, useSelector } from "react-redux";
import { close_modals } from "../../../slices/userSlice";
import { attributes } from "../usersHelpers";

const CombineUserModal = () => {
  const dispatch = useDispatch();
  const userPage = useSelector(state => state.users.userPage);
  const { combine_user_modal, user1, user2 } = userPage;
  const [selected, setSelected] = useState(
    attributes(user1, user2).reduce((acc, attribute) => {
      if (user1[attribute] !== undefined || user2[attribute] === undefined) {
        acc[attribute] = `user1-${attribute}`;
      } else {
        acc[attribute] = `user2-${attribute}`;
      }
      return acc;
    }, {})
  );

  console.log({ selected });

  const handleChange = (attribute, value) => {
    setSelected(prevState => ({ ...prevState, [attribute]: value }));
  };

  return (
    <GLActiionModal
      isOpen={combine_user_modal}
      onConfirm={e => {
        // handleSubmit(e);
      }}
      onAction={() => {
        setSelected(
          attributes(user1, user2).reduce((acc, attribute) => {
            acc[attribute] = `user1-${attribute}`;
            return acc;
          }, {})
        );
      }}
      onCancel={() => {
        dispatch(close_modals());
      }}
      title={"Combine Users"}
      confirmLabel={"Combine"}
      confirmColor="primary"
      actionLabel={"Reset"}
      actionColor="secondary"
      cancelLabel={"Cancel"}
      cancelColor="secondary"
      disableEscapeKeyDown
    >
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Typography variant="h6">User1</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="h6">User2</Typography>
          </Grid>
        </Grid>
        {attributes(user1, user2).map(attribute => (
          <Grid container key={attribute} spacing={3}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper elevation={1} style={{ padding: "10px", margin: "10px 0" }}>
                    <RadioGroup row value={selected[attribute] || ""} onChange={event => handleChange(attribute, event.target.value)}>
                      <FormControlLabel value={`user1-${attribute}`} control={<Radio />} label={`${attribute} - ${user1[attribute]}`} />
                    </RadioGroup>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={1} style={{ padding: "10px", margin: "10px 0" }}>
                    <RadioGroup row value={selected[attribute] || ""} onChange={event => handleChange(attribute, event.target.value)}>
                      <FormControlLabel value={`user2-${attribute}`} control={<Radio />} label={`${attribute} - ${user2[attribute]}`} />
                    </RadioGroup>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        ))}
      </Box>
    </GLActiionModal>
  );
};

export default CombineUserModal;

// import * as React from "react";
// import { useState } from "react";
// import { Box, Button, FormControl, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField, Typography } from "@mui/material";
// import { styled } from "@mui/system";
// import { close_modals } from "../../../slices/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import GLActiionModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";

// const StyledBox = styled(Box)({
//   backgroundColor: "#f5f5f5",
//   borderRadius: "4px",
//   boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
//   padding: "16px"
// });

// const shippingFields = ["first_name", "last_name", "address_1", "address_2", "city", "state", "postalCode", "international", "country"];

// const CombineUserModal = () => {
//   const dispatch = useDispatch();
//   const userPage = useSelector(state => state.users.userPage);
//   const { combine_user_modal, user1, user2 } = userPage;

//   const [selectedValues, setSelectedValues] = useState({});
//   const [newUser, setNewUser] = useState({});

//   const handleChange = event => {
//     setSelectedValues({
//       ...selectedValues,
//       [event.target.name]: event.target.value
//     });
//   };

//   const handleSubmit = event => {
//     event.preventDefault();
//     const mergedUser = {};
//     Object.keys(user1).forEach(key => {
//       if (key === "shipping") {
//         mergedUser.shipping = {};
//         shippingFields.forEach(field => {
//           if (selectedValues[field] === "1") {
//             mergedUser.shipping[field] = user1.shipping[field];
//           } else if (selectedValues[field] === "2") {
//             mergedUser.shipping[field] = user2.shipping[field];
//           }
//         });
//       } else if (selectedValues[key] === "1") {
//         mergedUser[key] = user1[key];
//       } else if (selectedValues[key] === "2") {
//         mergedUser[key] = user2[key];
//       }
//     });
//     setNewUser(mergedUser);
//   };

//   const handleReset = () => {
//     setSelectedValues({});
//     setNewUser({});
//   };

//   return (
//     <div>
// <GLActiionModal
//   isOpen={combine_user_modal}
//   onConfirm={e => {
//     handleSubmit(e);
//   }}
//   onCancel={() => {
//     dispatch(close_modals());
//   }}
//   title={"Edit User"}
//   confirmLabel={"Save"}
//   confirmColor="primary"
//   cancelLabel={"Cancel"}
//   cancelColor="secondary"
//   disableEscapeKeyDown
// >
//         <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <StyledBox>
//             <Typography variant="h6">User 1</Typography>

//           </StyledBox>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//             <StyledBox>
//               <Typography variant="h6">User 1</Typography>

//             </StyledBox>
//           </Grid>
//           </Grid>
//         <Grid container spacing={2}>
//         {Object.keys(user1).map(key => (
//           <>
//           <Grid item xs={12} sm={6}>
//           <FormControl component="fieldset">
//           <StyledBox>
//             <Typography variant="h6">User 1</Typography>

//               <FormLabel component="legend">Select Fields to Keep</FormLabel>
//               <RadioGroup aria-label="user1" name="user1" value={selectedValues} onChange={handleChange}>
//                   <FormControlLabel
//                     key={`user1-${key}`}
//                     value="1"
//                     control={<Radio />}
//                     label={`${key}: ${user1[key]}`}
//                     name={`user1-${key}`}
//                   />

//               </RadioGroup>
//             </FormControl>
//           </StyledBox>
//         </Grid>
//         <Grid item xs={12} sm={6}>
//             <StyledBox>
//               <Typography variant="h6">User 1</Typography>
//               <FormControlLabel
//                       key={`user1-${key}`}
//                       value="1"
//                       control={<Radio />}
//                       label={`${key}: ${user1[key]}`}
//                       name={`user1-${key}`}
//                     />
//                 </RadioGroup>
//               </FormControl>
//             </StyledBox>
//           </Grid>
//           </>
//         )}
//           // <Grid item xs={12} sm={6}>
//           //   <StyledBox>
//           //     <Typography variant="h6">User 1</Typography>
//           //     <FormControl component="fieldset">
//           //       <FormLabel component="legend">Select Fields to Keep</FormLabel>
//           //       <RadioGroup aria-label="user1" name="user1" value={selectedValues} onChange={handleChange}>
//           //         {Object.keys(user1).map(key => (
//           //           <FormControlLabel
//           //             key={`user1-${key}`}
//           //             value="1"
//           //             control={<Radio />}
//           //             label={`${key}: ${user1[key]}`}
//           //             name={`user1-${key}`}
//           //           />
//           //         ))}
//           //       </RadioGroup>
//           //     </FormControl>
//           //   </StyledBox>
//           // </Grid>
//           // <Grid item xs={12} sm={6}>
//           //   <StyledBox>
//           //     <Typography variant="h6">User 2</Typography>
//           //     <FormControl component="fieldset">
//           //       <FormLabel component="legend">Select Fields to Keep</FormLabel>
//           //       <RadioGroup aria-label="user2" name="user2" value={selectedValues} onChange={handleChange}>
//           //         {Object.keys(user2).map(key => (
//           //           <FormControlLabel
//           //             key={`user2-${key}`}
//           //             value="2"
//           //             control={<Radio />}
//           //             label={`${key}: ${user2[key]}`}
//           //             name={`user2-${key}`}
//           //           />
//           //         ))}
//           //       </RadioGroup>
//           //     </FormControl>
//           //   </StyledBox>
//           // </Grid>
//         </Grid>
//         <Box mt={2}>
//           <Button variant="contained" color="primary" type="submit">
//             Merge Users
//           </Button>
//           <Button variant="outlined" color="secondary" type="reset" sx={{ ml: 2 }}>
//             Reset
//           </Button>
//         </Box>
//         {Object.keys(newUser).length > 0 && (
//           <Box mt={2}>
//             <Typography variant="h6">Merged User</Typography>
//             <Box mt={2}>
//               {Object.keys(newUser).map(key => (
//                 <Box key={`new-user-${key}`} mt={1}>
//                   <Typography variant="subtitle1" fontWeight="bold">
//                     {key}
//                   </Typography>
//                   {key === "shipping" ? (
//                     <Box>
//                       {Object.keys(newUser.shipping).map(field => (
//                         <Typography key={`new-user-${key}-${field}`} variant="subtitle2" sx={{ ml: 2 }}>
//                           {field}: {newUser.shipping[field]}
//                         </Typography>
//                       ))}
//                     </Box>
//                   ) : (
//                     <Typography variant="subtitle2" sx={{ ml: 2 }}>
//                       {newUser[key]}
//                     </Typography>
//                   )}
//                 </Box>
//               ))}
//             </Box>
//           </Box>
//         )}
//       </GLActiionModal>
//     </div>
//   );
// };
// export default CombineUserModal;

{
  /* So this is a rough mock up of how I want it to look

user1             user2

______________  ______________
| O isAdmin  |  | 1 isAdmin |
______________  _____________
______________  ______________
| O first_name  | 1 first_name |
______________  _____________
______________  ______________
| 1 last_name  | 0 last_name |
______________  _____________

Each row will be a 2 radio button group that are independent of the other rows
You can only choose the attribute from user1 or user2 for each attribute
In the end you will have selected the value from each attribute to be used in the combine flow

Using Material UI V5 components could you create a component that can be used to combine 2 user accounts together.

This is the user schema

import mongoose from "mongoose";
export {};

const shippingSchema = {
  first_name: { type: String, default: "" },
  last_name: { type: String, default: "" },
  address_1: { type: String, default: "" },
  address_2: { type: String, default: "" },
  city: { type: String, default: "" },
  state: { type: String, default: "" },
  postalCode: { type: String, default: "" },
  international: { type: Boolean, default: false },
  country: { type: String, default: "" }
};

const userSchema = new mongoose.Schema(
  {
    first_name: { type: String },
    last_name: { type: String },
    email: {
      type: String,
      required: true
    },
    shipping: shippingSchema,
    password: { type: String },
    stripe_connect_id: { type: String },
    isAdmin: { type: Boolean, required: true, default: false },
    isVerified: { type: Boolean, required: true, default: false },
    is_affiliated: { type: Boolean, required: true, default: false },
    is_employee: { type: Boolean, required: true, default: false },
    weekly_wage: { type: Number },
    palettes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Palette" }],
    affiliate: { type: mongoose.Schema.Types.ObjectId, ref: "Affiliate" },
    email_subscription: { type: Boolean, default: true },
    guest: { type: Boolean },
    wholesaler: { type: mongoose.Schema.Types.ObjectId, ref: "Wholesaler" },
    isWholesaler: { type: Boolean },
    minimum_order_amount: { type: Number },
    deleted: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

const userModal = mongoose.model("User", userSchema);

export default userModal;

The data from the first user account will be on the left side and other 2nd user account will be displayed on the right side

There will be radio buttons next to each data field

You can choose either the 1st or 2nd user that you with to keep the data from

Then all of the choices will be combined into a new user in the end

So this is a rough mock up of how I want it to look like and behave like

O represents unchecked radio button
1 represents checked radio button

user1             user2

______________  ______________
| O isAdmin  |  | 1 isAdmin |
______________  _____________
______________  ______________
| O first_name  | 1 first_name |
______________  _____________
______________  ______________
| 1 last_name  | 0 last_name |
______________  _____________

Each row will be a 2 radio button group that are independent of the other rows
You can only choose the attribute from user1 or user2 for each attribute
In the end you will have selected the value from each attribute to be used in the combine flow */
}
