import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import { open_create_wholesaler_modal, open_edit_wholesaler_modal } from "../../slices/wholesalerSlice";
import { EditWholesalerModal } from "./components";
import * as API from "../../api";
import { Button, Container } from "@mui/material";
import { getWholesalers } from "../../api";
import { determineColor } from "./wholesalerHelper";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";
import { Delete, Edit } from "@mui/icons-material";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";

const WholesalersPage = () => {
  const wholesalerPage = useSelector(state => state.wholesalers.wholesalerPage);
  const { message, loading, remoteVersionRequirement } = wholesalerPage;

  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      {
        title: "Active",
        display: wholesaler => (
          <GLIconButton
            onClick={() => {
              dispatch(
                API.saveWholesaler({
                  ...wholesaler,
                  active: wholesaler.active ? false : true,
                })
              );
            }}
            tooltip={wholesaler.active ? "deactivate" : "activate"}
          >
            <GLBoolean boolean={wholesaler.active} />
          </GLIconButton>
        ),
      },
      { title: "Company", display: "company" },
      { title: "Minimum Order Amount", display: "minimum_order_amount" },
      {
        title: "",
        nonSelectable: true,
        display: wholesaler => (
          <div className="row">
            <GLIconButton
              tooltip="Edit"
              onClick={() => {
                dispatch(open_edit_wholesaler_modal(wholesaler));
              }}
            >
              <Edit color="white" />
            </GLIconButton>
            <GLIconButton onClick={() => dispatch(API.deleteWholesaler(wholesaler._id))} tooltip="Delete">
              <Delete color="white" />
            </GLIconButton>
          </div>
        ),
      },
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => getWholesalers(options), []);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>{"Admin Wholesalers | Glow LEDs"}</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        tableName="Wholesalers"
        namespaceScope="wholesalers"
        namespace="wholesalerTable"
        columnDefs={columnDefs}
        determineColor={determineColor}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_wholesaler_modal())}>
            {"Create Wholesaler"}
          </Button>
        }
      />
      <EditWholesalerModal />
    </Container>
  );
};
export default WholesalersPage;
