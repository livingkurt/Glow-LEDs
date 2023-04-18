import { Autocomplete, Checkbox, FormControlLabel, Skeleton, TextField, Typography } from "@mui/material";
import { useSelector } from "react-redux";

import { toCapitalize } from "../../../utils/helper_functions";
import GLAutocomplete from "../GLAutocomplete/GLAutocomplete";
import ImageUploader from "../../SharedComponents/ImageUploader";
import { DropdownDisplayV2, ImageDisplay } from "../../SharedComponents";

const GLForm = ({ formData, onChange, state, loading, nesting, index }) => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const determine_shown_fields = fieldData => {
    let result = true;
    if (fieldData.type !== "array_of_objects") {
      result = false;
    }
    if (fieldData.type !== "objects") {
      result = false;
    }
    if (fieldData.permissions) {
      if (!current_user?.isAdmin && fieldData?.permissions?.includes("admin")) {
        result = false;
      }
      if (current_user?.isAdmin && fieldData?.permissions?.includes("admin")) {
        result = true;
      }
    } else {
      result = true;
    }
    return result;
  };

  return (
    <>
      {Object.keys(formData).map(fieldName => {
        const fieldData = formData[fieldName];
        let fieldState = state[fieldName];

        if (loading) {
          if (fieldData.type === "checkbox") {
            return <Skeleton key={fieldName} variant="circle" width={200} height={20} style={{ marginTop: 25, marginRight: 16 }} />;
          } else {
            return <Skeleton key={fieldName} variant="rectangular" height={40} style={{ marginTop: 22 }} />;
          }
        } else if (determine_shown_fields(fieldData)) {
          switch (fieldData.type) {
            case "autocomplete_single":
              return (
                <GLAutocomplete
                  key={fieldName}
                  margin="normal"
                  value={fieldState || ""}
                  options={fieldData.options || []}
                  getOptionLabel={option =>
                    option ? (fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp]) : ""
                  }
                  optionDisplay={option => (fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp])}
                  getOptionSelected={(option, value) => option._id === value._id}
                  name={fieldName}
                  label={fieldData.label}
                  onChange={(event, value) => onChange({ [fieldName]: value })}
                />
              );
            case "image_upload":
              return (
                <>
                  <Typography className="title_font mt-10px ta-c">{fieldData.label}</Typography>
                  <ImageUploader onUpload={fieldData.onUpload} album={fieldData.album} />
                  <ImageDisplay images={fieldState} set_images={value => onChange({ [fieldName]: value })} />
                </>
              );
            case "autocomplete_multiple":
              return (
                <DropdownDisplayV2
                  key={fieldName}
                  margin="normal"
                  value={fieldState || ""}
                  options={fieldData.options || []}
                  getOptionLabel={option =>
                    option ? (fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp]) : ""
                  }
                  optionDisplay={option => (fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp])}
                  getOptionSelected={(option, value) => option._id === value._id}
                  name={fieldName}
                  label={fieldData.label}
                  onChange={value => onChange({ [fieldName]: value })}
                />
              );
            case "checkbox":
              return (
                <FormControlLabel
                  key={fieldName}
                  control={
                    <Checkbox
                      name={fieldName}
                      size="large"
                      onChange={e => onChange({ [fieldName]: e.target.checked })}
                      checked={!!fieldState}
                    />
                  }
                  label={fieldData.label}
                />
              );
            case "text":
              return (
                <TextField
                  key={fieldName}
                  name={fieldName}
                  margin="normal"
                  size="small"
                  fullWidth
                  type={fieldData.type}
                  label={fieldData.label}
                  variant="outlined"
                  value={fieldState || ""}
                  onChange={e => onChange({ [fieldName]: e.target.value })}
                />
              );
            case "number":
              return (
                <TextField
                  key={fieldName}
                  name={fieldName}
                  margin="normal"
                  size="small"
                  fullWidth
                  type={fieldData.type}
                  label={fieldData.label}
                  variant="outlined"
                  value={fieldState || ""}
                  onChange={e => onChange({ [fieldName]: e.target.value })}
                />
              );
            case "text_multiline":
              return (
                <TextField
                  key={fieldName}
                  name={fieldName}
                  margin="normal"
                  size="small"
                  fullWidth
                  type={fieldData.type}
                  label={fieldData.label}
                  multiline
                  variant="outlined"
                  value={fieldState || ""}
                  onChange={e => onChange({ [fieldName]: e.target.value })}
                />
              );
            default:
              return <div></div>;
          }
        }
      })}
    </>
  );
};

export default GLForm;

// (
//                 // <DropdownDisplayV2
//                 //   // item_group_id={product._id}
//                 //   item_list={fieldData.options}
//                 //   display_key={"name"}
//                 //   list_items={fieldState}
//                 //   set_items={value => onChange({ [fieldName]: value })}
//                 //   list_name={fieldData.label}
//                 // />
//                 // <GLAutocomplete
//                 //   key={fieldName}
//                 //   margin="normal"
//                 //   value={fieldState || ""}
//                 //   options={fieldData.options || []}
//                 //   getOptionLabel={option =>
//                 //     option ? (fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp]) : ""
//                 //   }
//                 //   optionDisplay={option => (fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp])}
//                 //   getOptionSelected={(option, value) => option._id === value._id}
//                 //   name={fieldName}
//                 //   label={fieldData.label}
//                 //   onChange={(event, value) => onChange({ [fieldName]: value })}
//                 //   // disableCloseOnSelect
//                 //   // limitTags={5}
//                 //   multiple
//                 //   showCheckbox
//                 // />
//                 <Autocomplete
//                   multiple
//                   key={fieldName}
//                   margin="normal"
//                   options={fieldData.options}
//                   name={fieldName}
//                   label={fieldData.label}
//                   getOptionLabel={option =>
//                     option ? (fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp]) : ""
//                   }
//                   // onChange={handleSelect}
//                   renderInput={params => (
//                     <TextField {...params} fullWidth variant="standard" label={fieldData.label} placeholder="Type to search" />
//                   )}
//                 />
//                 // <GLAutocomplete
//                 // key={fieldName}
//                 // margin="normal"
//                 //   value={fieldState || ""}
//                 //   options={fieldData.options || []}
//                 // getOptionLabel={option =>
//                 //   option ? (fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp]) : ""
//                 // }
//                 //   optionDisplay={option => (fieldData.getOptionLabel ? fieldData.getOptionLabel(option) : option[fieldData.labelProp])}
//                 //   getOptionSelected={(option, value) => option._id === value._id}
//                 // name={fieldName}
//                 // label={fieldData.label}
//                 //   onChange={(event, value) => onChange({ [fieldName]: value })}
//                 //   disableCloseOnSelect
//                 //   multiple
//                 //   showCheckbox
//                 // />
//               );

// import { Autocomplete, Checkbox, FormControlLabel, Grid, Paper, Skeleton, Tab, Tabs, TextField, Typography } from "@mui/material";
// import { toCapitalize } from "../../../utils/helper_functions";
// import { useState } from "react";

// const GLForm = ({ formData, onChange, state, loading }) => {
//   const smallInputHeight = 40; // set the height of small input fields in MUI theme here
// const [selectedTab, setSelectedTab] = useState(0);
// const handleChangeTab = (event, newValue) => {
//   setSelectedTab(newValue);
// };
// const renderFields = fields => {
//     return Object.keys(fields).map(fieldName => {
//       const fieldData = fields[fieldName];
//       const nestedState = state[fieldName] || {};
//       if (loading) {
//         if (fieldData.type === "checkbox") {
//           return (
//             <Grid key={fieldName} item xs={12}>
//               <Skeleton variant="circle" width={smallInputHeight} height={smallInputHeight} style={{ marginRight: 16 }} />
//               <Typography component="span" variant="subtitle2" color="textSecondary">
//                 {fieldData.label}
//               </Typography>
//             </Grid>
//           );
//         } else {
//           return (
//             <Grid key={fieldName} item xs={12}>
//               <Skeleton variant="rectangular" height={smallInputHeight} style={{ marginBottom: 16 }} />
//               <Typography component="span" variant="subtitle2" color="textSecondary">
//                 {fieldData.label}
//               </Typography>
//             </Grid>
//           );
//         }
//       }
//       switch (fieldData.type) {
//         case "autocomplete":
//           return (
//             <Grid key={fieldName} item xs={12} md={6}>
//               <Autocomplete
//                 name={fieldName}
//                 margin="normal"
//                 size="small"
//                 value={state[fieldName] || ""}
//                 options={fieldData.options}
//                 getOptionLabel={option => option[fieldData.labelProp]}
//                 onChange={(event, value) => onChange({ [fieldName]: value })}
//                 renderInput={params => <TextField {...params} margin="normal" label={fieldData.label} variant="outlined" />}
//                 renderOption={(props, option) => (
//                   <li {...props}>
//                     <span>{option[fieldData.labelProp]}</span>
//                   </li>
//                 )}
//               />
//             </Grid>
//           );
//         case "checkbox":
//           return (
//             <Grid key={fieldName} item xs={12}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     name={fieldName}
//                     size="large"
//                     onChange={e => onChange({ [fieldName]: e.target.checked })}
//                     checked={!!state[fieldName]}
//                   />
//                 }
//                 label={fieldData.label}
//               />
//             </Grid>
//           );
//         case "select":
//           return (
//             <Grid key={fieldName} item xs={12} md={6}>
//               <Autocomplete
//                 name={fieldName}
//                 margin="normal"
//                 size="small"
//                 value={state[fieldName] || ""}
//                 options={fieldData.options}
//                 getOptionLabel={option => toCapitalize(option)}
//                 onChange={(event, value) => onChange({ [fieldName]: value })}
//                 renderInput={params => <TextField {...params} margin="normal" label={fieldData.label} variant="outlined" />}
//               />
//             </Grid>
//           );
//         default:
//           return (
//             <Grid key={fieldName} item xs={12} md={6}>
//               <TextField
//                 name={fieldName}
//                 margin="normal"
//                 size="small"
//                 fullWidth
//                 type={fieldData.type}
//                 label={fieldData.label}
//                 variant="outlined"
//                 value={state[fieldName] || ""}
//                 onChange={e => onChange({ [fieldName]: e.target.value })}
//               />
//             </Grid>
//           );
//       }
//     });
//   };

// return (
//   <Paper variant="outlined" sx={{ p: 2 }}>
//     {formData.tabs && formData.tabs.length > 0 ? (
//       <div>
//         <Tabs value={selectedTab} onChange={handleChangeTab} variant="scrollable" scrollButtons="auto">
//           {formData.tabs.map((tab, index) => (
//             <Tab key={index} label={tab.title} />
//           ))}
//         </Tabs>
//         {formData.tabs.map((tab, index) => (
//           <div key={index} hidden={selectedTab !== index}>
//             <Typography component="h4" variant="h4" sx={{ mb: 2 }}>
//               {tab.title}
//             </Typography>
//             <Grid container spacing={2}>
//               {renderFields(tab.fields)}
//             </Grid>
//           </div>
//         ))}
//       </div>
//     ) : (
//       <Grid container spacing={2}>
//         {renderFields(formData.fields)}
//       </Grid>
//     )}
//   </Paper>
// );
// };

// export default GLForm;

// import { Autocomplete, Checkbox, FormControlLabel, Grid, Paper, Skeleton, Tab, Tabs, TextField, Typography } from "@mui/material";
// import { useState } from "react";
// import { toCapitalize } from "../../../utils/helper_functions";

// const GLForm = ({ formData, onChange, state, loading }) => {
//   const [selectedTab, setSelectedTab] = useState(0);
//   const handleChangeTab = (event, newValue) => {
//     setSelectedTab(newValue);
//   };
//   const renderFields = (fields, fieldName) => {
//     const fieldData = fields[fieldName];
//     if (loading) {
//       if (fieldData.type === "checkbox") {
//         return <Skeleton key={fieldName} variant="circle" width={200} height={20} style={{ marginTop: 25, marginRight: 16 }} />;
//       } else {
//         return <Skeleton key={fieldName} variant="rectangular" height={40} style={{ marginTop: 22 }} />;
//       }
//     } else if (fieldData.type !== "array_of_objects") {
//       switch (fieldData.type) {
//         case "autocomplete":
//           return (
//             <Autocomplete
//               key={fieldName}
//               name={fieldName}
//               margin="normal"
//               size="small"
//               value={state[fieldName] || ""}
//               options={fieldData.options}
//               getOptionLabel={option => fieldData.getOptionLabel(option) || (option => option[fieldData.labelProp])}
//               onChange={(event, value) => onChange({ [fieldName]: value })}
//               renderInput={params => <TextField {...params} margin="normal" label={fieldData.label} variant="outlined" />}
//             />
//           );
//         case "checkbox":
//           return (
//             <FormControlLabel
//               key={fieldName}
//               control={
//                 <Checkbox
//                   name={fieldName}
//                   size="large"
//                   onChange={e => onChange({ [fieldName]: e.target.checked })}
//                   checked={!!state[fieldName]}
//                 />
//               }
//               label={fieldData.label}
//             />
//           );
//         case "select":
//           return (
//             <Autocomplete
//               key={fieldName}
//               name={fieldName}
//               margin="normal"
//               size="small"
//               value={state[fieldName] || ""}
//               options={fieldData.options}
//               getOptionLabel={option => toCapitalize(option)}
//               onChange={(event, value) => onChange({ [fieldName]: value })}
//               renderInput={params => <TextField {...params} margin="normal" label={fieldData.label} variant="outlined" />}
//             />
//           );
//         default:
//           return (
//             <TextField
//               key={fieldName}
//               name={fieldName}
//               margin="normal"
//               size="small"
//               fullWidth
//               type={fieldData.type}
//               label={fieldData.label}
//               variant="outlined"
//               value={state[fieldName] || ""}
//               onChange={e => onChange({ [fieldName]: e.target.value })}
//             />
//           );
//       }
//     }
//   };
//   return (
//     <>
//       <div>
//         {/* <Tabs value={selectedTab} onChange={handleChangeTab} variant="scrollable" scrollButtons="auto">
//           {formData.map((tab, index) => (
//             <Tab key={index} label={tab.title} />
//           ))}
//         </Tabs> */}
//         <Paper variant="outlined" sx={{ p: 2 }}>
//           {Object.keys(formData).forEach((fieldName, index) => {
//             const fieldData = formData[fieldName];
//             return (
//               <>
//                 {fieldData[fieldName].type === "array_of_objects" ? (
//                   <div key={index} hidden={selectedTab !== index}>
//                     <Typography component="h4" variant="h4" sx={{ mb: 2 }}>
//                       {fieldName.title}
//                     </Typography>
//                     <Grid container spacing={2}>
//                       {renderFields(fieldData[fieldName].fields, fieldName)}
//                     </Grid>
//                   </div>
//                 ) : (
//                   <Grid container spacing={2}>
//                     {renderFields(fieldName.fields)}
//                   </Grid>
//                 )}
//               </>
//             );
//           })}
//         </Paper>
//       </div>
//     </>
//   );
// };

// export default GLForm;
