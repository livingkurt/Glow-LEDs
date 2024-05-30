import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_affiliate_modal, open_edit_affiliate_modal } from "../../slices/affiliateSlice";
import { EditAffiliateModal } from "./components";
import * as API from "../../api";
import PolylineIcon from "@mui/icons-material/Polyline";
import { Box, Button, Tooltip } from "@mui/material";
import { getAffiliates } from "../../api";
import { determineColor } from "./affiliateHelpers";
import { useLocation } from "react-router-dom";
import { fullName } from "../UsersPage/usersHelpers";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditPromoModal } from "../PromosPage/components";
import { open_edit_promo_modal } from "../../slices/promoSlice";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";

const AffiliatesPage = () => {
  const location = useLocation();
  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { message, loading, remoteVersionRequirement } = affiliatePage;

  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      {
        title: "Active",
        display: affiliate => (
          <GLIconButton
            color="white"
            onClick={() => {
              dispatch(
                API.saveAffiliate({
                  affiliate: {
                    ...affiliate,
                    active: affiliate.active ? false : true,
                  },
                  profile: location.pathname === "/secure/account/profile",
                })
              );
            }}
            tooltip={affiliate.active ? "deactivate" : "activate"}
          >
            <GLBoolean boolean={affiliate.active} />
          </GLIconButton>
        ),
      },
      { title: "Artist Name", display: "artist_name" },
      {
        title: "Percentage Off",
        display: affiliate => `${affiliate.private_code && affiliate.private_code.percentage_off}%`,
      },
      { title: "User", display: affiliate => fullName(affiliate.user) },
      {
        title: "Public Code",
        display: affiliate => (
          <Tooltip title="Click to edit public code">
            <div style={{ cursor: "pointer" }} onClick={() => dispatch(open_edit_promo_modal(affiliate?.public_code))}>
              {affiliate?.public_code?.promo_code?.toUpperCase()}
            </div>
          </Tooltip>
        ),
      },
      {
        title: "Private Code",
        display: affiliate => (
          <Tooltip title="Click to edit private code">
            <div style={{ cursor: "pointer" }} onClick={() => dispatch(open_edit_promo_modal(affiliate?.private_code))}>
              {affiliate?.private_code?.promo_code?.toUpperCase()}
            </div>
          </Tooltip>
        ),
      },

      {
        title: "",
        display: affiliate => (
          <Box display="flex" justifyContent={"flex-end"}>
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_affiliate_modal(affiliate))}>
              <EditIcon color="white" />
            </GLIconButton>

            <GLIconButton
              tooltip="Generate Sponsor Codes"
              onClick={() => dispatch(API.generateSponsorCodes(affiliate._id))}
            >
              <PolylineIcon color="white" />
            </GLIconButton>

            <GLIconButton onClick={() => dispatch(API.deleteAffiliate(affiliate._id))} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => getAffiliates(options), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Affiliates | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determineColor={determineColor}
        tableName={"Affiliates"}
        namespaceScope="affiliates"
        namespace="affiliateTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_affiliate_modal())}>
            Create Affiliate
          </Button>
        }
      />
      <EditAffiliateModal />
      <EditPromoModal />
    </div>
  );
};
export default AffiliatesPage;
