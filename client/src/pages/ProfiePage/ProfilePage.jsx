import React from "react";
import { useSelector } from "react-redux";
import { GLButton } from "../../shared/GlowLEDsComponents";
import { Loading } from "../../shared/SharedComponents";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.scss";
import { Helmet } from "react-helmet";
import { EditUserModal } from "../UsersPage/components";
import { getProfileTitle } from "./profileHelpers";
import ProfileDetails from "./components/ProfileDetails";
import { ProfileActions } from "./components/ProfileActions";
import ProfileAffiliateMetrics from "./components/ProfileAffiliateActions";
import ProfileAffiliateEarnings from "./components/ProfileAffiliateEarnings";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { determineColor } from "../PaychecksPage/paychecksHelpers";
import { determineOrderColors, orderColors } from "../OrdersPage/ordersPageHelpers";
import { Grid } from "@mui/material";
import SponsorMonthlyCheckinModal from "./components/SponsorMonthlyCheckinModal";
import useProfilePage from "./useProfilePage";

const ProfilePage = () => {
  const navigate = useNavigate();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user, user } = userPage;
  const { first_name } = user;

  const paycheckPage = useSelector(state => state.paychecks.paycheckPage);
  const { loading, remoteVersionRequirement } = paycheckPage;

  const orderPage = useSelector(state => state.orders.orderPage);
  const { loading: loading_order } = orderPage;

  const { orderColumnDefs, paycheckColumnDefs, ordersRemoteApi, paychecksRemoteApi } = useProfilePage();

  return (
    <div className="p-20px inner_content">
      <Helmet>
        <title>Admin User Profile | Glow LEDs</title>
      </Helmet>
      <EditUserModal />
      {current_user?.isAdmin && (
        <GLButton variant="icon" onClick={() => navigate.goBack()}>
          <i className="fas fa-chevron-left"></i>
        </GLButton>
      )}

      <div className="row">
        <h1 style={{ textAlign: "center", width: "100%" }}>{getProfileTitle(current_user, first_name, "Profile")}</h1>
      </div>
      <Loading loading={loading}></Loading>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ProfileDetails />
          <ProfileActions />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfileAffiliateMetrics />
        </Grid>
        <Grid item xs={12}>
          <ProfileAffiliateEarnings />
        </Grid>

        <Grid item xs={12}>
          {user._id && (
            <GLTableV2
              remoteApi={ordersRemoteApi}
              tableName={"Orders"}
              colors={orderColors}
              enableSearch={false}
              noURLParams
              determineColor={determineOrderColors}
              namespaceScope="orders"
              namespace="orderTable"
              columnDefs={orderColumnDefs}
              loading={loading_order}
              enableRowSelect={false}
            />
          )}
        </Grid>
        <Grid item xs={12}>
          {user && user?.affiliate?._id && (
            <GLTableV2
              remoteApi={paychecksRemoteApi}
              remoteVersionRequirement={remoteVersionRequirement}
              determineColor={determineColor}
              noURLParams
              tableName={"Paychecks"}
              enableSearch={false}
              namespaceScope="paychecks"
              namespace="paycheckTable"
              columnDefs={paycheckColumnDefs}
              loading={loading}
              enableRowSelect={false}
            />
          )}
        </Grid>
      </Grid>
      <SponsorMonthlyCheckinModal />
    </div>
  );
};

export default ProfilePage;
