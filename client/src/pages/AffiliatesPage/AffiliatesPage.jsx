import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_affiliate_modal, open_edit_affiliate_modal } from "../../slices/affiliateSlice";
import { EditAffiliateModal } from "./components";
import * as API from "../../api";
import PolylineIcon from "@mui/icons-material/Polyline";
import { Button, IconButton } from "@mui/material";
import { getAffiliates } from "../../api";
import { determineColor } from "./affiliateHelpers";
import { useLocation } from "react-router-dom";
import { fullName } from "../UsersPage/usersHelpers";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const AffiliatesPage = () => {
  const location = useLocation();
  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { message, loading, remoteVersionRequirement } = affiliatePage;

  const dispatch = useDispatch();

  const column_defs = useMemo(
    () => [
      {
        title: "Active",
        display: affiliate => (
          <IconButton
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
            aria-label={affiliate.active ? "deactivate" : "activate"}
          >
            {affiliate.active ? <CheckCircleIcon color="white" /> : <CancelIcon color="white" />}
          </IconButton>
        ),
      },
      { title: "Artist Name", display: "artist_name" },
      {
        title: "Percentage Off",
        display: affiliate => `${affiliate.private_code && affiliate.private_code.percentage_off}%`,
      },
      { title: "User", display: affiliate => fullName(affiliate.user) },
      { title: "Public Code", display: affiliate => affiliate.private_code && affiliate.public_code.promo_code },
      { title: "Private Code", display: affiliate => affiliate.private_code && affiliate.private_code.promo_code },

      {
        title: "Actions",
        display: affiliate => (
          <div className="jc-b">
            <IconButton aria-label="Edit" onClick={() => dispatch(open_edit_affiliate_modal(affiliate))}>
              <EditIcon color="white" />
            </IconButton>

            <IconButton aria-label="Edit" onClick={() => dispatch(API.generateSponsorCodes(affiliate._id))}>
              <PolylineIcon color="white" />
            </IconButton>

            <IconButton onClick={() => dispatch(API.deleteAffiliate(affiliate._id))} aria-label="Delete">
              <DeleteIcon color="white" />
            </IconButton>
          </div>
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
        columnDefs={column_defs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_affiliate_modal())}>
            Create Affiliate
          </Button>
        }
      />
      <EditAffiliateModal />
    </div>
  );
};
export default AffiliatesPage;
