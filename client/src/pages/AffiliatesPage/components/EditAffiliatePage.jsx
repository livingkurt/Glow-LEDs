import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Loading, Notification } from "../../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { listUsers } from "../../../actions/userActions";
import { listProducts } from "../../../actions/productActions";
import { listChips } from "../../../actions/chipActions";
import { snake_case } from "../../../utils/helper_functions";
import { listPromos } from "../../../actions/promoActions";
import { GLAutocomplete, GLButton, GLCheckboxV2, GLText, GLTextField } from "../../../shared/GlowLEDsComponents";
import { clear_affiliate, set_affiliate } from "../../../slices/affiliateSlice";
import * as API from "../../../api/affiliateApi";
import { makeStyles } from "@mui/styles";
import { Container, Paper, Stack, TextField } from "@mui/material";
import GLButtonV2 from "../../../shared/GlowLEDsComponents/GLButtonV2/GLButton";

const useStyles = makeStyles(() => ({
  textField: {
    marginTop: 15,
    marginBottom: 15
  },
  skeleton: {
    marginTop: -10,
    marginBottom: -10
  }
}));

const EditAffiliatePage = props => {
  const userList = useSelector(state => state.userList);
  const { users, loading: loading_users } = userList;

  const history = useHistory();

  const affiliateSlice = useSelector(state => state.affiliateSlice);
  const affiliate = useSelector(state => state.affiliateSlice.affiliate);
  const { loading } = affiliateSlice;
  const {
    user,
    artist_name,
    instagram_handle,
    facebook_name,
    percentage_off,
    sponsor,
    promoter,
    rave_mob,
    active,
    style,
    inspiration,
    bio,
    link,
    picture,
    location,
    years,
    team,
    video,
    venmo,
    products,
    chips,
    pathname,
    public_code,
    private_code
  } = affiliate;

  const productList = useSelector(state => state.productList);
  const { products: products_list, loading: loading_products } = productList;

  const chipList = useSelector(state => state.chipList);
  const { chips: chips_list, loading: loading_chips } = chipList;

  const promoList = useSelector(state => state.promoList);
  const { promos: promos_list, loading: loading_promos } = promoList;

  const dispatch = useDispatch();

  useEffect(() => {
    let clean = true;
    if (clean) {
      if (props.match.params.pathname) {
        dispatch(API.detailsAffiliate({ pathname: props.match.params.pathname }));
      } else {
        dispatch(clear_affiliate());
      }
      dispatch(listUsers({}));
      dispatch(listProducts({ option: false, hidden: false }));
      dispatch(listPromos({}));
      dispatch(listPromos({}));
      dispatch(listChips({}));
    }
    return () => (clean = false);
  }, [dispatch, props.match.params.pathname]);

  const submitHandler = e => {
    e.preventDefault();
    if (props.match.params.pathname) {
      dispatch(API.updateAffiliate(affiliate));
    } else {
      dispatch(API.createAffiliate(affiliate));
    }
    history.push("/secure/glow/affiliates?page=1?limit=10");
  };

  const classes = useStyles();
  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Edit Affiliate | Glow LEDs</title>
      </Helmet>
      <h1 style={{ textAlign: "center" }}>{props.match.params.pathname ? "Edit Affiliate" : "Create Affiliate"}</h1>
      <form onSubmit={submitHandler} style={{ width: "100%" }}>
        {affiliate && (
          <Container maxWidth="md">
            <Paper elevation={3} style={{ backgroundColor: "#5a5a5a", borderRadius: "20px", padding: "20px" }}>
              <GLAutocomplete
                loading={!loading_users}
                margin="normal"
                value={user}
                options={users}
                option_name={option => (option.first_name ? `${option.first_name} ${option.last_name}` : "")}
                getOptionLabel={option => `${option.first_name} ${option.last_name}`}
                getOptionSelected={(option, value) => option._id === value._id}
                name="user"
                label="User"
                onChange={(e, value) => dispatch(set_affiliate({ user: value }))}
                classes={classes}
              />
              <GLTextField
                size="small"
                loading={!loading}
                value={artist_name}
                fullWidth
                type="text"
                margin="normal"
                name="artist_name"
                label="Artist Name"
                variant="outlined"
                onChange={e => dispatch(set_affiliate({ artist_name: e.target.value }))}
              />
              <GLTextField
                size="small"
                loading={!loading}
                value={facebook_name}
                fullWidth
                type="text"
                margin="normal"
                name="facebook_name"
                label="Facebook Name"
                variant="outlined"
                onChange={e => dispatch(set_affiliate({ facebook_name: e.target.value }))}
              />
              <GLTextField
                size="small"
                loading={!loading}
                value={instagram_handle}
                fullWidth
                type="text"
                margin="normal"
                name="instagram_handle"
                label="Instagram Handle"
                variant="outlined"
                onChange={e => dispatch(set_affiliate({ instagram_handle: e.target.value }))}
              />
              <GLTextField
                size="small"
                loading={!loading}
                value={location}
                fullWidth
                type="text"
                margin="normal"
                name="location"
                label="Location"
                variant="outlined"
                onChange={e => dispatch(set_affiliate({ location: e.target.value }))}
              />
              <GLTextField
                size="small"
                loading={!loading}
                value={years}
                fullWidth
                type="text"
                margin="normal"
                name="years"
                label="Years"
                variant="outlined"
                onChange={e => dispatch(set_affiliate({ years: e.target.value }))}
              />
              <GLTextField
                size="small"
                loading={!loading}
                value={picture}
                fullWidth
                type="text"
                margin="normal"
                name="picture"
                label="Picture"
                variant="outlined"
                onChange={e => dispatch(set_affiliate({ picture: e.target.value }))}
              />
              <GLTextField
                size="small"
                loading={!loading}
                value={video}
                fullWidth
                type="text"
                margin="normal"
                name="video"
                label="Video"
                variant="outlined"
                onChange={e => dispatch(set_affiliate({ video: e.target.value }))}
              />
              <GLTextField
                size="small"
                loading={!loading}
                value={style}
                fullWidth
                type="text"
                margin="normal"
                placeholder="Wave Tuts, Clusters, Whips..."
                name="style"
                label="Style"
                variant="outlined"
                onChange={e => dispatch(set_affiliate({ style: e.target.value }))}
              />
              <GLTextField
                size="small"
                loading={!loading}
                value={inspiration}
                placeholder="Flow, Megasloth, Jest..."
                fullWidth
                type="text"
                margin="normal"
                name="inspiration"
                label="Inspiration"
                variant="outlined"
                onChange={e => dispatch(set_affiliate({ inspiration: e.target.value }))}
              />
              <GLTextField
                size="small"
                loading={!loading}
                value={bio}
                placeholder="Write a little something to introduce yourself..."
                fullWidth
                type="text"
                multiline
                rows={4}
                margin="normal"
                name="bio"
                label="Bio"
                variant="outlined"
                onChange={e => dispatch(set_affiliate({ bio: e.target.value }))}
              />
              <GLTextField
                size="small"
                loading={!loading}
                value={link}
                placeholder="https://www..."
                fullWidth
                type="text"
                margin="normal"
                name="link"
                label="Link"
                variant="outlined"
                onChange={e => dispatch(set_affiliate({ link: e.target.value }))}
              />
              <GLTextField
                size="small"
                loading={!loading}
                value={percentage_off}
                placeholder="https://www..."
                fullWidth
                type="text"
                margin="normal"
                name="percentage_off"
                label="Percentage Off"
                variant="outlined"
                onChange={e => dispatch(set_affiliate({ percentage_off: e.target.value }))}
              />
              <GLAutocomplete
                loading={!loading_promos}
                margin="normal"
                value={public_code}
                options={promos_list}
                option_name="promo_code"
                getOptionLabel={option => option.promo_code}
                getOptionSelected={(option, value) => option.promo_code === value.promo_code}
                name="public_code"
                label="Public Code"
                onChange={(e, value) => dispatch(set_affiliate({ public_code: value }))}
                classes={classes}
              />
              <GLAutocomplete
                loading={!loading_promos}
                margin="normal"
                value={private_code}
                options={promos_list}
                option_name="promo_code"
                getOptionLabel={option => option.promo_code}
                getOptionSelected={(option, value) => option.promo_code === value.promo_code}
                name="private_code"
                label="Private Code"
                onChange={(e, value) => dispatch(set_affiliate({ private_code: value }))}
                classes={classes}
              />

              <GLTextField
                size="small"
                loading={!loading}
                value={pathname ? pathname : artist_name && snake_case(artist_name)}
                fullWidth
                type="text"
                margin="normal"
                name="pathname"
                label="Pathname"
                variant="outlined"
                onChange={e => dispatch(set_affiliate({ pathname: e.target.value }))}
              />
              <GLTextField
                size="small"
                loading={!loading}
                value={venmo}
                placeholder="https://www..."
                fullWidth
                type="text"
                margin="normal"
                name="venmo"
                label="Venmo"
                variant="outlined"
                onChange={e => dispatch(set_affiliate({ venmo: e.target.value }))}
              />
              <GLAutocomplete
                loading={!loading_products}
                margin="normal"
                value={products}
                options={products_list}
                getOptionLabel={option => option.name}
                getOptionSelected={(option, value) => option.name === value.name}
                name="products"
                label="Products"
                chipColor={"primary"}
                onChange={(e, value) => dispatch(set_affiliate({ products: value }))}
                classes={classes}
                disableCloseOnSelect
                multiple
                showCheckbox
              />
              <GLAutocomplete
                loading={!loading_chips}
                margin="normal"
                value={chips}
                options={chips_list}
                getOptionLabel={option => option.name}
                getOptionSelected={(option, value) => option.name === value.name}
                name="chips"
                label="Chips"
                chipColor={"primary"}
                onChange={(e, value) => dispatch(set_affiliate({ chips: value }))}
                classes={classes}
                disableCloseOnSelect
                multiple
                showCheckbox
              />
              <div className="jc-b wrap">
                <GLCheckboxV2 onChecked={e => dispatch(set_affiliate({ team: e.target.checked }))} checked={team} label="Team" />
                <GLCheckboxV2 onChecked={e => dispatch(set_affiliate({ sponsor: e.target.checked }))} checked={sponsor} label="Sponsor" />
                <GLCheckboxV2
                  onChecked={e => dispatch(set_affiliate({ promoter: e.target.checked }))}
                  checked={promoter}
                  label="Promoter"
                />
                <GLCheckboxV2
                  onChecked={e => dispatch(set_affiliate({ rave_mob: e.target.checked }))}
                  checked={rave_mob}
                  label="Rave Mob"
                />
                <GLCheckboxV2 onChecked={e => dispatch(set_affiliate({ active: e.target.checked }))} checked={active} label="Active" />
              </div>
              <Stack spacing={2} direction="column">
                <GLButtonV2 type="submit" variant="primary">
                  {pathname ? "Update" : "Create"}
                </GLButtonV2>
                <GLButtonV2 variant="secondary" onClick={() => history.goBack()}>
                  Back to Affiliates
                </GLButtonV2>
              </Stack>
            </Paper>
          </Container>
        )}
      </form>
    </div>
  );
};
export default EditAffiliatePage;
