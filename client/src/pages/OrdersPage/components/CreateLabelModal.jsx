import { useEffect, useState } from "react";
import {
  resetRates,
  setFromShipping,
  setParcel,
  setSelectedRateId,
  setToShipping,
} from "../../../slices/shippingSlice";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import * as API from "../../../api";
import { closeCreateLabelModal } from "../../../slices/shippingSlice";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { Button, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { humanize, state_names, toCapitalize } from "../../../utils/helper_functions";
import config from "../../../config";
import { Loading } from "../../../shared/SharedComponents";
import { printLabel } from "../ordersPageHelpers";

const CreateLabelModal = () => {
  const dispatch = useDispatch();
  const shipping = useSelector(state => state.shipping.shippingPage);
  const {
    createLabelModal,
    toShipping,
    fromShipping,
    parcel,
    shippingRates,
    selectedRateId,
    shipmentId,
    loading,
    label,
  } = shipping;

  const [formErrors, setFormErrors] = useState({});
  const parcelPage = useSelector(state => state.parcels);
  const { parcels } = parcelPage;

  useEffect(() => {
    let clean = true;
    if (clean) {
      dispatch(API.listParcels({}));
    }
    return () => (clean = false);
  }, [dispatch]);

  const setGeneratedAddress = (shipping, type) => {
    if (!shipping || !shipping.address_components) {
      return;
    }
    let autocompleteElement = document.querySelector("#autocomplete");
    const street_num = autocompleteElement ? autocompleteElement.value : "";

    const street_number = shipping.address_components.filter(comp => comp.types.includes("street_number"))[0] || {};

    const address = shipping.address_components.filter(comp => comp.types.includes("route"))[0];
    const street_1 = `${(street_number && street_number.long_name) || street_num.split(" ")[0]} ${address.short_name}`;
    const city = shipping.address_components.filter(comp => comp.types.includes("locality"))[0];
    const state = shipping.address_components.filter(comp => comp.types.includes("administrative_area_level_1"))[0];
    const country = shipping.address_components.filter(comp => comp.types.includes("country"))[0];
    const postal_code = shipping.address_components.filter(comp => comp.types.includes("postal_code"))[0];
    const fullAddress = {
      address_1: street_1,
      city: city.long_name || city.short_name,
      state: state.short_name,
      postalCode: postal_code.long_name,
      country: country.short_name !== "US" ? country.long_name : country.short_name,
      international: country.short_name !== "US" ? true : false,
    };
    if (type === "to") {
      dispatch(setToShipping(fullAddress));
    } else {
      dispatch(setFromShipping(fullAddress));
    }
  };

  const productionAddress = {
    first_name: config.VITE_PRODUCTION_FIRST_NAME,
    last_name: config.VITE_PRODUCTION_LAST_NAME,
    address_1: config.VITE_PRODUCTION_ADDRESS,
    city: config.VITE_PRODUCTION_CITY,
    state: config.VITE_PRODUCTION_STATE,
    postalCode: config.VITE_PRODUCTION_POSTAL_CODE,
    country: config.VITE_PRODUCTION_COUNTRY,
    phone: config.VITE_PRODUCTION_PHONE_NUMBER,
    email: config.VITE_INFO_EMAIL,
    company: "Glow LEDs",
  };
  const headquartersAddress = {
    first_name: config.VITE_HEADQUARTERS_FIRST_NAME,
    last_name: config.VITE_HEADQUARTERS_LAST_NAME,
    address_1: config.VITE_HEADQUARTERS_ADDRESS,
    city: config.VITE_HEADQUARTERS_CITY,
    state: config.VITE_HEADQUARTERS_STATE,
    postalCode: config.VITE_HEADQUARTERS_POSTAL_CODE,
    country: config.VITE_HEADQUARTERS_COUNTRY,
    phone: config.VITE_HEADQUARTERS_PHONE_NUMBER,
    email: config.VITE_INFO_EMAIL,
    company: "Glow LEDs",
  };
  const destanyeAddress = {
    first_name: config.VITE_DESTANYE_FIRST_NAME,
    last_name: config.VITE_DESTANYE_LAST_NAME,
    address_1: config.VITE_PRODUCTION_ADDRESS,
    city: config.VITE_PRODUCTION_CITY,
    state: config.VITE_PRODUCTION_STATE,
    postalCode: config.VITE_PRODUCTION_POSTAL_CODE,
    country: config.VITE_PRODUCTION_COUNTRY,
    phone: config.VITE_HEADQUARTERS_PHONE_NUMBER,
    email: config.VITE_DESTANYE_EMAIL,
    company: "",
  };

  const isRequired = (value, fieldName) => (value === "" ? `${fieldName} is Required` : null);
  const isValidEmail = value =>
    !value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/) ? "Invalid email format" : null;

  // Composite Validation Function
  const validateEmail = value => {
    const required = isRequired(value, "Email");
    if (required) return required;

    const valid = isValidEmail(value);
    if (valid) return valid;

    return null;
  };

  const shippingFormFields = {
    toShipping: {
      type: "object",
      title: "To Shipping Address",
      fields: {
        first_name: {
          type: "text",
          label: "First Name",
          validate: value => isRequired(value, "First Name"),
        },
        last_name: {
          type: "text",
          label: "Last Name",
          validate: value => isRequired(value, "Last Name"),
        },
        address_1: {
          type: "autocomplete_address",
          label: "Address Line 1",
          validate: value => isRequired(value, "Address"),
          setGeneratedAddress: place => setGeneratedAddress(place, "to"),
        },
        address_2: {
          type: "text",
          label: "Address Line 2",
        },
        city: {
          type: "text",
          label: "City",
          validate: value => isRequired(value, "City"),
        },
        state: {
          type: "autocomplete_single",
          label: "State",
          validate: value => isRequired(value, "State"),
          getOptionLabel: option => option.long_name,
          options: state_names,
        },
        postalCode: {
          type: "text",
          label: "Postal Code",
          validate: value => isRequired(value, "Postal Code"),
        },
        country: {
          type: "text",
          label: "Country",
          validate: value => isRequired(value, "Country"),
        },
        international: {
          type: "checkbox",
          label: "International",
        },
        phone: {
          type: "text",
          label: "Phone",
        },
        email: {
          type: "text",
          label: "Email",
          validate: value => validateEmail(value),
        },
        company: {
          type: "text",
          label: "Company",
        },
      },
    },
    fromShipping: {
      type: "object",
      title: "From Shipping Address",
      fields: {
        first_name: {
          type: "text",
          label: "First Name",
          validate: value => isRequired(value, "First Name"),
        },
        last_name: {
          type: "text",
          label: "Last Name",
          validate: value => isRequired(value, "Last Name"),
        },
        address_1: {
          type: "autocomplete_address",
          label: "Address Line 1",
          validate: value => isRequired(value, "Address"),
          setGeneratedAddress: place => setGeneratedAddress(place, "from"),
        },
        address_2: {
          type: "text",
          label: "Address Line 2",
        },
        city: {
          type: "text",
          label: "City",
          validate: value => isRequired(value, "City"),
        },
        state: {
          type: "autocomplete_single",
          label: "State",
          labelProps: "state",
          validate: value => isRequired(value, "State"),
          getOptionLabel: option => option.long_name,
          options: state_names,
        },
        postalCode: {
          type: "text",
          label: "Postal Code",
          validate: value => isRequired(value, "Postal Code"),
        },
        country: {
          type: "text",
          label: "Country",
          validate: value => isRequired(value, "Country"),
        },
        international: {
          type: "checkbox",
          label: "International",
        },
        phone: {
          type: "text",
          label: "Phone",
        },
        email: {
          type: "text",
          label: "Email",
          validate: value => validateEmail(value),
        },
        company: {
          type: "text",
          label: "Company",
        },
      },
    },

    parcel: {
      type: "object",
      title: "Parcel",
      fields: {
        parcelChoice: {
          type: "autocomplete_single",
          label: "Parcels",
          options: parcels,
          labelProp: "parcel",
          getOptionLabel: parcel => {
            if (!parcel) {
              return "";
            }

            let { type, length, width, height } = parcel;
            if (type && length && width) {
              if (type === "bubble_mailer") {
                return `${humanize(type)} - ${length} X ${width}`;
              } else if (height) {
                return `${humanize(type)} - ${length} X ${width} X ${height}`;
              }
            }

            return "";
          },
        },
        length: {
          type: "text",
          label: "Package Length",
          validate: value => (value === "" ? "Package Length is Required" : null),
        },
        width: {
          type: "text",
          label: "Package Width",
          validate: value => (value === "" ? "Package Width is Required" : null),
        },
        height: {
          type: "text",
          label: "Package Height",
          validate: value => (value === "" ? "Package Height is Required" : null),
        },
        weight_pounds: {
          type: "text",
          label: "Package lbs",
          validate: value => (value === "" ? "Package lbs is Required" : null),
        },
        weight_ounces: {
          type: "text",
          label: "Package oz",
          validate: value => (value === "" ? "Package oz is Required" : null),
        },
      },
    },
  };

  const validateForm = () => {
    let isValid = true;
    let errorMessages = {};

    const validateSection = (sectionFields, sectionState) => {
      Object.keys(sectionFields).forEach(fieldName => {
        const field = sectionFields[fieldName];
        if (field.validate) {
          const value = sectionState[fieldName];
          const errorMessage = field.validate(value);
          if (errorMessage) {
            isValid = false;
            errorMessages[fieldName] = errorMessage;
          }
        }
      });
    };

    validateSection(shippingFormFields.toShipping.fields, toShipping);
    validateSection(shippingFormFields.fromShipping.fields, fromShipping);
    validateSection(shippingFormFields.parcel.fields, parcel);

    setFormErrors(errorMessages);
    // You can set errorMessages to state if you want to display them
    return isValid;
  };

  return (
    <GLActionModal
      isOpen={createLabelModal}
      onConfirm={() => dispatch(API.createCustomLabel({ selectedRateId, shipmentId }))}
      onCancel={() => dispatch(closeCreateLabelModal())}
      onAction={() => dispatch(resetRates(label))}
      title="Create Label"
      confirmDisabled={selectedRateId === ""}
      confirmLabel="Buy Label"
      confirmColor="primary"
      cancelLabel="Cancel"
      cancelColor="secondary"
      actionLabel="Reset Rates"
      actionColor="secondary"
      disableEscapeKeyDown
    >
      <Loading loading={loading} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography component="h6" variant="h6" className="ta-c">
            {shippingFormFields.toShipping.title}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => dispatch(setToShipping(productionAddress))}
              >
                {"To Production"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => dispatch(setToShipping(headquartersAddress))}
              >
                {"To Headquarters"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => dispatch(setToShipping(destanyeAddress))}
              >
                {"To Destanye"}
              </Button>
            </Grid>
          </Grid>
          <GLForm
            formData={shippingFormFields.toShipping.fields}
            state={toShipping}
            onChange={value => dispatch(setToShipping(value))}
            formErrors={formErrors} // Pass the errors here
            setFormErrors={setFormErrors}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography component="h6" variant="h6" className="ta-c">
            {shippingFormFields.fromShipping.title}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => dispatch(setFromShipping(productionAddress))}
              >
                {"From Production"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => dispatch(setFromShipping(headquartersAddress))}
              >
                {"From Headquarters"}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => dispatch(setFromShipping(destanyeAddress))}
              >
                {"From Destanye"}
              </Button>
            </Grid>
          </Grid>
          <GLForm
            formData={shippingFormFields.fromShipping.fields}
            state={fromShipping}
            onChange={value => dispatch(setFromShipping(value))}
            formErrors={formErrors} // Pass the errors here
            setFormErrors={setFormErrors}
          />
        </Grid>
      </Grid>
      <Typography component="h6" variant="h6" className="ta-c">
        {shippingFormFields.parcel.title}
      </Typography>
      <GLForm
        formData={shippingFormFields.parcel.fields}
        state={parcel}
        onChange={value => dispatch(setParcel(value))}
        formErrors={formErrors} // Pass the errors here
        setFormErrors={setFormErrors}
      />
      {!label && shippingRates.length === 0 && (
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => {
            const isValid = validateForm();
            if (isValid) {
              dispatch(API.customShippingRates({ toShipping, fromShipping, parcel }));
            }
          }}
        >
          {"Generate Rates"}
        </Button>
      )}
      {!label && shippingRates.length > 0 && (
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom component="div" className="mt-10px">
            {"Choose Shipping Rate"}
          </Typography>
          <RadioGroup value={selectedRateId} onChange={e => dispatch(setSelectedRateId(e.target.value))}>
            {shippingRates.map((rate, index) => (
              <FormControlLabel
                key={index}
                value={rate.id}
                control={<Radio />}
                label={`${rate.carrier} - ${rate.service} - $${rate.rate}`}
              />
            ))}
          </RadioGroup>
        </Grid>
      )}
      {label && (
        <Button variant="contained" color="secondary" fullWidth onClick={() => printLabel(label)}>
          {"Print Label"}
        </Button>
      )}
    </GLActionModal>
  );
};

export default CreateLabelModal;
