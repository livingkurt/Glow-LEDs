import { useEffect } from "react";
import { setFromShipping, setParcel, setToShipping } from "../../../slices/shippingSlice";
import { useDispatch, useSelector } from "react-redux";
import GLActiionModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import * as API from "../../../api";
import { closeCreateLabelModal } from "../../../slices/shippingSlice";
import { GLForm } from "../../../shared/GlowLEDsComponents/GLForm";
import { Button, Grid, Typography } from "@mui/material";
import { humanize } from "../../../utils/helper_functions";
import AddressAutocomplete from "../../PlaceOrderPage/components/AddressAutocomplete";
import config from "../../../config";

const CreateLabelModal = () => {
  const dispatch = useDispatch();
  const shipping = useSelector(state => state.shipping);
  const { createLabelModal, toShipping, fromShipping, parcel } = shipping;

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
      international: country.short_name !== "US" ? true : false
    };
    if (type === "to") {
      dispatch(setToShipping(fullAddress));
    } else {
      dispatch(setFromShipping(fullAddress));
    }
  };

  // const update_parcel = (e, parcel) => {
  //   e.preventDefault();
  //   parcel = JSON.parse(parcel);

  //   set_package_dimensions({
  //     ...parcel,
  //     package_length: parcel.length || 0,
  //     package_width: parcel.width || 0,
  //     package_height: parcel.height || 0
  //   });
  // };

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
    company: "Glow LEDs"
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
    company: "Glow LEDs"
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
    company: ""
  };

  const shippingFormFields = {
    toShipping: {
      type: "object",
      title: "To Shipping Address",
      fields: {
        first_name: {
          type: "text",
          label: "First Name"
        },
        last_name: {
          type: "text",
          label: "Last Name"
        },
        address_1: {
          type: "autocomplete_address",
          label: "Address Line 1",
          setGeneratedAddress: place => setGeneratedAddress(place, "to")
        },
        address_2: {
          type: "text",
          label: "Address Line 2"
        },
        city: {
          type: "text",
          label: "City"
        },
        state: {
          type: "text",
          label: "State"
        },
        postalCode: {
          type: "text",
          label: "Postal Code"
        },
        country: {
          type: "text",
          label: "Country"
        },
        international: {
          type: "checkbox",
          label: "International"
        },
        phone: {
          type: "text",
          label: "Phone"
        },
        email: {
          type: "text",
          label: "Email"
        },
        company: {
          type: "text",
          label: "Company"
        }
      }
    },
    fromShipping: {
      type: "object",
      title: "From Shipping Address",
      fields: {
        first_name: {
          type: "text",
          label: "First Name"
        },
        last_name: {
          type: "text",
          label: "Last Name"
        },
        address_1: {
          type: "autocomplete_address",
          label: "Address Line 1",
          setGeneratedAddress: place => setGeneratedAddress(place, "from")
        },
        address_2: {
          type: "text",
          label: "Address Line 2"
        },
        city: {
          type: "text",
          label: "City"
        },
        state: {
          type: "text",
          label: "State"
        },
        postalCode: {
          type: "text",
          label: "Postal Code"
        },
        country: {
          type: "text",
          label: "Country"
        },
        international: {
          type: "checkbox",
          label: "International"
        },
        phone: {
          type: "text",
          label: "Phone"
        },
        email: {
          type: "text",
          label: "Email"
        },
        company: {
          type: "text",
          label: "Company"
        }
      }
    },
    parcel: {
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
      }
    }
  };

  return (
    <GLActiionModal
      isOpen={createLabelModal}
      // onConfirm={handleCreatePickup}
      onCancel={() => dispatch(closeCreateLabelModal())}
      title={"Create Label"}
      confirmLabel={"Create"}
      confirmColor="primary"
      cancelLabel={"Cancel"}
      cancelColor="secondary"
      disableEscapeKeyDown
    >
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography component="h6" variant="h6" className="ta-c">
            {shippingFormFields.toShipping.title}
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button variant="contained" color="secondary" fullWidth onClick={() => dispatch(setToShipping(productionAddress))}>
                To Production
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="secondary" fullWidth onClick={() => dispatch(setToShipping(headquartersAddress))}>
                To Headquarters
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="secondary" fullWidth onClick={() => dispatch(setToShipping(destanyeAddress))}>
                To Destanye
              </Button>
            </Grid>
          </Grid>
          <GLForm formData={shippingFormFields.toShipping.fields} state={toShipping} onChange={value => dispatch(setToShipping(value))} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography component="h6" variant="h6" className="ta-c">
            {shippingFormFields.fromShipping.title}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Button variant="contained" color="secondary" fullWidth onClick={() => dispatch(setFromShipping(productionAddress))}>
                From Production
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="secondary" fullWidth onClick={() => dispatch(setFromShipping(headquartersAddress))}>
                From Head Quarters
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="secondary" fullWidth onClick={() => dispatch(setFromShipping(destanyeAddress))}>
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
      <GLForm formData={shippingFormFields} state={parcel} onChange={value => dispatch(setParcel(value))} />
    </GLActiionModal>
  );
};

export default CreateLabelModal;
