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

import { state_names } from "../../../utils/helper_functions";
import config from "../../../config";
import { Loading } from "../../../shared/SharedComponents";
import { printLabel } from "../ordersPageHelpers";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Typography from "@mui/material/Typography";
import { stringAutocompleteField } from "../../../shared/GlowLEDsComponents/GLForm/glFormHelpers";

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
    address_1: config.VITE_HEADQUARTERS_ADDRESS_1,
    address_2: config.VITE_HEADQUARTERS_ADDRESS_2,
    city: config.VITE_HEADQUARTERS_CITY,
    state: config.VITE_HEADQUARTERS_STATE,
    postalCode: config.VITE_HEADQUARTERS_POSTAL_CODE,
    country: config.VITE_HEADQUARTERS_COUNTRY,
    phone: config.VITE_HEADQUARTERS_PHONE_NUMBER,
    international: true,
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

  const shippingFormFields = {
    first_name: {
      type: "text",
      label: "First Name",
    },
    last_name: {
      type: "text",
      label: "Last Name",
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
    },
    company: {
      type: "text",
      label: "Company",
    },
  };

  const createLabelFormFields = {
    toShipping: {
      type: "object",
      title: "To Shipping Address",
      fields: shippingFormFields,
    },
    fromShipping: {
      type: "object",
      title: "From Shipping Address",
      fields: shippingFormFields,
    },

    parcel: {
      type: "object",
      title: "Parcel",
      fields: {
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
        customs_info: {
          type: "object",
          title: "Customs Information",
          hidden: !toShipping.international,
          fields: {
            contents_type: stringAutocompleteField({
              label: "Contents Type",
              options: ["merchandise", "gift", "documents", "returned_goods", "sample", "other"],
              validate: value =>
                toShipping.international && !value ? "Contents Type is Required for International Shipments" : null,
            }),
            restriction_type: stringAutocompleteField({
              label: "Restriction Type",
              options: ["none", "quarantine", "sanitary_phytosanitary_inspection", "other"],
              validate: value =>
                toShipping.international && !value ? "Restriction Type is Required for International Shipments" : null,
            }),
            non_delivery_option: stringAutocompleteField({
              label: "Non Delivery Option",
              options: ["return", "abandon"],
              validate: value =>
                toShipping.international && !value
                  ? "Non Delivery Option is Required for International Shipments"
                  : null,
            }),
            customs_items: {
              type: "array",
              title: "Customs Items",
              label: "description",
              validate: value =>
                toShipping.international && (!value || value.length === 0)
                  ? "At least one customs item is required for international shipments"
                  : null,
              itemSchema: {
                type: "object",
                fields: {
                  description: {
                    type: "text",
                    label: "Description",
                    validate: value => (value === "" ? "Description is Required" : null),
                  },
                  quantity: {
                    type: "number",
                    label: "Quantity",
                    validate: value => (value === "" ? "Quantity is Required" : null),
                  },
                  value: {
                    type: "number",
                    label: "Value ($)",
                    validate: value => (value === "" ? "Value is Required" : null),
                  },
                  weight_pounds: {
                    type: "number",
                    label: "Weight (lbs)",
                  },
                  weight_ounces: {
                    type: "number",
                    label: "Weight (oz)",
                    validate: value => (!value && !parcel.weight_pounds ? "Weight is Required" : null),
                  },
                  origin_country: {
                    type: "text",
                    label: "Origin Country",
                    validate: value => (value === "" ? "Origin Country is Required" : null),
                  },
                  hs_tariff_number: {
                    type: "text",
                    label: "HS Tariff Number",
                    validate: value => (value === "" ? "HS Tariff Number is Required" : null),
                  },
                },
              },
            },
          },
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

    validateSection(createLabelFormFields.toShipping.fields, toShipping);
    validateSection(createLabelFormFields.fromShipping.fields, fromShipping);
    validateSection(createLabelFormFields.parcel.fields, parcel);

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
            {createLabelFormFields.toShipping.title}
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
            formData={createLabelFormFields.toShipping.fields}
            state={toShipping}
            onChange={value => dispatch(setToShipping(value))}
            formErrors={formErrors} // Pass the errors here
            setFormErrors={setFormErrors}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography component="h6" variant="h6" className="ta-c">
            {createLabelFormFields.fromShipping.title}
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
            formData={createLabelFormFields.fromShipping.fields}
            state={fromShipping}
            onChange={value => dispatch(setFromShipping(value))}
            formErrors={formErrors} // Pass the errors here
            setFormErrors={setFormErrors}
          />
        </Grid>
      </Grid>
      <Typography component="h6" variant="h6" className="ta-c">
        {createLabelFormFields.parcel.title}
      </Typography>
      <GLForm
        formData={createLabelFormFields.parcel.fields}
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
