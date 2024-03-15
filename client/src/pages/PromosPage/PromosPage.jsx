import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_promo_modal, open_edit_promo_modal } from "../../slices/promoSlice";
import { EditPromoModal } from "./components";
import * as API from "../../api";
import { Button } from "@mui/material";
import { determineColor } from "./promosHelpers";
import { format_date } from "../../utils/helper_functions";
import { fullName } from "../UsersPage/usersHelpers";

const PromosPage = () => {
  const promoPage = useSelector(state => state.promos.promoPage);
  const { message, loading, remoteVersionRequirement } = promoPage;

  const promoTable = useSelector(state => state.promos.promoTable);
  const { selectedRows } = promoTable;
  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      { title: "Date", display: paycheck => paycheck.createdAt && format_date(paycheck.createdAt) },
      {
        title: "Active",
        display: promo =>
          promo.active ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />,
      },
      { title: "Promo Code", display: promo => promo.promo_code.toUpperCase() },
      { title: "Percentage Off", display: promo => `${promo.percentage_off || 0}%` },
      { title: "User", display: promo => fullName(promo.user) },
      { title: "Affiliate", display: promo => promo?.affiliate?.artist_name },
      { title: "Amount Off", display: promo => `$${promo.amount_off || "0.00"}` },
      { title: "Minimum Total", display: promo => `$${promo.minimum_total || "0.00"}` },
      {
        title: "Free Shipping",
        display: promo =>
          promo.free_shipping ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />,
      },
      {
        title: "Actions",
        nonSelectable: true,
        display: promo => (
          <div className="jc-b">
            <GLButton variant="icon" aria-label="Edit" onClick={() => dispatch(open_edit_promo_modal(promo))}>
              <i className="fas fa-edit" />
            </GLButton>
            <GLButton
              variant="icon"
              onClick={() =>
                dispatch(
                  API.savePromo({
                    ...promo,
                    active: !promo.active,
                  })
                )
              }
              aria-label="mark paid"
            >
              <i className="fas fa-check-circle" />
            </GLButton>
            <GLButton variant="icon" onClick={() => dispatch(API.deletePromo(promo._id))} aria-label="Delete">
              <i className="fas fa-trash-alt" />
            </GLButton>
          </div>
        ),
      },
    ],
    []
  );

  const remoteApi = useCallback(options => API.getPromos(options), []);
  const remoteFiltersApi = useCallback(() => API.getPromoFilters(), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Promos | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteFiltersApi={remoteFiltersApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determineColor={determineColor}
        tableName={"Promos"}
        namespaceScope="promos"
        searchPlaceholder={"Search By Promo Code"}
        namespace="promoTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <div className="row g-10px">
            <Button color="secondary" variant="contained" onClick={() => dispatch(API.refreshSponsorCodes())}>
              Create Sponsor Codes
            </Button>
            {/* <Button
              color="secondary"
              variant="contained"
              className="h-40px"
              onClick={async () => await API_Emails.send_code_used_emails_a("cosmo")}
            >
              Send Code Used Email
            </Button> */}
            {selectedRows.length > 1 && (
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  const confirm = window.confirm(`Are you sure you want to Delete ${selectedRows.length} Promos?`);
                  if (confirm) {
                    dispatch(API.deleteMultiplePromos(selectedRows));
                  }
                }}
              >
                Delete Promos
              </Button>
            )}
            <Button color="primary" variant="contained" onClick={() => dispatch(open_create_promo_modal())}>
              Create Promo
            </Button>
          </div>
        }
      />
      <EditPromoModal />
    </div>
  );
};
export default PromosPage;
