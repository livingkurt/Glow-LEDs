import { useEffect } from "react";
import {
  resetRates,
  setFromShipping,
  setParcel,
  setSelectedRateId,
  setToShipping,
} from "../../../slices/shippingSlice";
import { useDispatch, useSelector } from "react-redux";
import GLActiionModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import * as API from "../../../api";
import { closeCreateLabelModal } from "../../../slices/shippingSlice";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { Button, FormControlLabel, Grid, Radio, RadioGroup, Typography } from "@mui/material";
import { humanize } from "../../../utils/helper_functions";
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
      console.error("Invalid shipping data:", shipping);
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
    first_name: config.REACT_APP_PRODUCTION_FIRST_NAME,
    last_name: config.REACT_APP_PRODUCTION_LAST_NAME,
    address_1: config.REACT_APP_PRODUCTION_ADDRESS,
    city: config.REACT_APP_PRODUCTION_CITY,
    state: config.REACT_APP_PRODUCTION_STATE,
    postalCode: config.REACT_APP_PRODUCTION_POSTAL_CODE,
    country: config.REACT_APP_PRODUCTION_COUNTRY,
    phone: config.REACT_APP_PRODUCTION_PHONE_NUMBER,
    email: config.REACT_APP_INFO_EMAIL,
    company: "Glow LEDs",
  };
  const headquartersAddress = {
    first_name: config.REACT_APP_HEADQUARTERS_FIRST_NAME,
    last_name: config.REACT_APP_HEADQUARTERS_LAST_NAME,
    address_1: config.REACT_APP_HEADQUARTERS_ADDRESS,
    city: config.REACT_APP_HEADQUARTERS_CITY,
    state: config.REACT_APP_HEADQUARTERS_STATE,
    postalCode: config.REACT_APP_HEADQUARTERS_POSTAL_CODE,
    country: config.REACT_APP_HEADQUARTERS_COUNTRY,
    phone: config.REACT_APP_HEADQUARTERS_PHONE_NUMBER,
    email: config.REACT_APP_INFO_EMAIL,
    company: "Glow LEDs",
  };
  const destanyeAddress = {
    first_name: config.REACT_APP_DESTANYE_FIRST_NAME,
    last_name: config.REACT_APP_DESTANYE_LAST_NAME,
    address_1: config.REACT_APP_PRODUCTION_ADDRESS,
    city: config.REACT_APP_PRODUCTION_CITY,
    state: config.REACT_APP_PRODUCTION_STATE,
    postalCode: config.REACT_APP_PRODUCTION_POSTAL_CODE,
    country: config.REACT_APP_PRODUCTION_COUNTRY,
    phone: config.REACT_APP_HEADQUARTERS_PHONE_NUMBER,
    email: config.REACT_APP_DESTANYE_EMAIL,
    company: "",
  };

  const shippingFormFields = {
    toShipping: {
      type: "object",
      title: "To Shipping Address",
      fields: {
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
          setGeneratedAddress: place => setGeneratedAddress(place, "to"),
        },
        address_2: {
          type: "text",
          label: "Address Line 2",
        },
        city: {
          type: "text",
          label: "City",
        },
        state: {
          type: "text",
          label: "State",
        },
        postalCode: {
          type: "text",
          label: "Postal Code",
        },
        country: {
          type: "text",
          label: "Country",
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
      },
    },
    fromShipping: {
      type: "object",
      title: "From Shipping Address",
      fields: {
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
          setGeneratedAddress: place => setGeneratedAddress(place, "from"),
        },
        address_2: {
          type: "text",
          label: "Address Line 2",
        },
        city: {
          type: "text",
          label: "City",
        },
        state: {
          type: "text",
          label: "State",
        },
        postalCode: {
          type: "text",
          label: "Postal Code",
        },
        country: {
          type: "text",
          label: "Country",
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
        },
        width: {
          type: "text",
          label: "Package Width",
        },
        height: {
          type: "text",
          label: "Package Height",
        },
        weight_pounds: {
          type: "text",
          label: "Package lbs",
        },
        weight_ounces: {
          type: "text",
          label: "Package oz",
        },
      },
    },
  };

  useEffect(() => {
    if (label.length > 0) {
      console.log({ label });
      setTimeout(() => {
        printLabel(label);
      }, 1000);
      // dispatch(clearPrints());
      // dispatch(closeCreateLabelModal());
    }
  }, [dispatch, label]);

  return (
    <GLActiionModal
      isOpen={createLabelModal}
      onConfirm={() => dispatch(API.createCustomLabel({ selectedRateId, shipmentId }))}
      onCancel={() => dispatch(closeCreateLabelModal())}
      onAction={() => dispatch(resetRates(label))}
      title={"Create Label"}
      confirmDisabled={selectedRateId === ""}
      confirmLabel={"Buy Label"}
      confirmColor="primary"
      cancelLabel={"Cancel"}
      cancelColor="secondary"
      actionLabel={"Reset Rates"}
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
                To Production
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => dispatch(setToShipping(headquartersAddress))}
              >
                To Headquarters
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => dispatch(setToShipping(destanyeAddress))}
              >
                To Destanye
              </Button>
            </Grid>
          </Grid>
          <GLForm
            formData={shippingFormFields.toShipping.fields}
            state={toShipping}
            onChange={value => dispatch(setToShipping(value))}
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
                From Production
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => dispatch(setFromShipping(headquartersAddress))}
              >
                From Headquarters
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="secondary"
                fullWidth
                onClick={() => dispatch(setFromShipping(destanyeAddress))}
              >
                From Destanye
              </Button>
            </Grid>
          </Grid>
          <GLForm
            formData={shippingFormFields.fromShipping.fields}
            state={fromShipping}
            onChange={value => dispatch(setFromShipping(value))}
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
      />
      {!label && shippingRates.length === 0 && (
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          onClick={() => dispatch(API.customShippingRates({ toShipping, fromShipping, parcel }))}
        >
          Generate Rates
        </Button>
      )}
      {!label && shippingRates.length > 0 && (
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom component="div" className="mt-10px">
            Choose Shipping Rate
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
          Print Label
        </Button>
      )}
    </GLActiionModal>
  );
};

export default CreateLabelModal;
