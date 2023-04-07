import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_affiliate_modal, open_edit_affiliate_modal } from "../../slices/affiliateSlice";
import { EditAffiliateModal } from "./components";
import * as API from "../../api";
import { Button } from "@mui/material";
import { getAffiliates } from "../../api";
import { determine_color } from "./affiliateHelpers";

const AffiliatesPage = () => {
  const affiliatesSlice = useSelector(state => state.affiliateSlice.affiliatePage);
  const { message, loading, remoteVersionRequirement } = affiliatesSlice;

  const dispatch = useDispatch();

  const column_defs = useMemo(
    () => [
      {
        title: "Active",
        display: affiliate => (
          <GLButton
            variant="icon"
            onClick={() => {
              dispatch(
                API.saveAffiliate({
                  ...affiliate,
                  active: affiliate.active ? false : true
                })
              );
            }}
            aria-label={affiliate.active ? "deactivate" : "activate"}
          >
            {affiliate.active ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
          </GLButton>
        )
      },
      { title: "Artist Name", display: "artist_name" },
      {
        title: "Percentage Off",
        display: affiliate => `${affiliate.private_code && affiliate.private_code.percentage_off}%`
      },
      { title: "Venmo", display: "venmo" },
      { title: "Public Code", display: affiliate => affiliate.private_code && affiliate.public_code.promo_code },
      { title: "Private Code", display: affiliate => affiliate.private_code && affiliate.private_code.promo_code },
      {
        title: "Actions",
        display: affiliate => (
          <div className="jc-b">
            <GLButton
              variant="icon"
              aria-label="Edit"
              onClick={() => {
                dispatch(open_edit_affiliate_modal(affiliate));
              }}
            >
              <i className="fas fa-edit" />
            </GLButton>
            <GLButton variant="icon" onClick={() => dispatch(API.deleteAffiliate(affiliate.pathname))} aria-label="Delete">
              <i className="fas fa-trash-alt" />
            </GLButton>
          </div>
        )
      }
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => getAffiliates(options), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Affiliates | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determine_color={determine_color}
        tableName={"Affiliates"}
        namespaceScope="affiliateSlice"
        namespace="affiliateTable"
        columnDefs={column_defs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="primary" onClick={() => dispatch(open_create_affiliate_modal())}>
            Create Affiliate
          </Button>
        }
      />
      <EditAffiliateModal />
    </div>
  );
};
export default AffiliatesPage;
