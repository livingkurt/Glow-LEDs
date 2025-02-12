import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import {
  open_create_affiliate_modal,
  open_edit_affiliate_modal,
  open_sponsor_task_modal,
} from "../../slices/affiliateSlice";
import * as API from "../../api";
import PolylineIcon from "@mui/icons-material/Polyline";
import AssignmentIcon from "@mui/icons-material/Assignment";

import { determineColor } from "./affiliateHelpers";
import { useLocation } from "react-router-dom";
import { fullName } from "../UsersPage/usersHelpers";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditPromoModal } from "../PromosPage/components";
import { open_edit_promo_modal } from "../../slices/promoSlice";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import { EditAffiliateModal } from "./components";
import SponsorTaskModal from "./components/SponsorTaskModal";

const AffiliatesPage = () => {
  const location = useLocation();
  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { loading, remoteVersionRequirement } = affiliatePage;

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
        nonSelectable: true,
        display: affiliate => (
          <Box display="flex" justifyContent="flex-end">
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_affiliate_modal(affiliate))}>
              <EditIcon color="white" />
            </GLIconButton>

            {affiliate.sponsor && (
              <GLIconButton tooltip="Add Sponsor Task" onClick={() => dispatch(open_sponsor_task_modal(affiliate))}>
                <AssignmentIcon color="white" />
              </GLIconButton>
            )}

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

  const remoteApi = useCallback(options => API.getAffiliates(options), []);
  const remoteFiltersApi = useCallback(options => API.getAffiliateFilters(), []);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>{"Admin Affiliates | Glow LEDs"}</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteFiltersApi={remoteFiltersApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determineColor={determineColor}
        tableName="Affiliates"
        namespaceScope="affiliates"
        namespace="affiliateTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_affiliate_modal())}>
            {"Create Affiliate"}
          </Button>
        }
      />

      <EditAffiliateModal />
      <EditPromoModal />
      <SponsorTaskModal />
    </Container>
  );
};
export default AffiliatesPage;
