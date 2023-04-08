import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Notification } from "../../shared/SharedComponents";
import { Helmet } from "react-helmet";
import { GLButton } from "../../shared/GlowLEDsComponents";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_wholesaler_modal, open_edit_wholesaler_modal } from "../../slices/wholesalerSlice";
import { EditWholesalerModal } from "./components";
import * as API from "../../api";
import { Button } from "@mui/material";
import { getWholesalers } from "../../api";

const WholesalersPage = () => {
  const wholesalerSlice = useSelector(state => state.wholesalerSlice.wholesalerPage);
  const { message, loading, remoteVersionRequirement } = wholesalerSlice;

  const dispatch = useDispatch();

  const column_defs = useMemo(
    () => [
      {
        title: "Active",
        display: wholesaler => (
          <GLButton
            variant="icon"
            onClick={() => {
              dispatch(
                API.saveWholesaler({
                  ...wholesaler,
                  active: wholesaler.active ? false : true
                })
              );
            }}
            aria-label={wholesaler.active ? "deactivate" : "activate"}
          >
            {wholesaler.active ? <i className="fas fa-check-circle" /> : <i className="fas fa-times-circle" />}
          </GLButton>
        )
      },
      { title: "Title", display: "title" },
      { title: "Video", display: "video" },
      { title: "Level", display: "level" },
      { title: "Order", display: "order" },
      { title: "Categorys", display: "categorys" },
      {
        title: "Actions",
        display: wholesaler => (
          <div className="jc-b">
            <GLButton
              variant="icon"
              aria-label="Edit"
              onClick={() => {
                dispatch(open_edit_wholesaler_modal(wholesaler));
              }}
            >
              <i className="fas fa-edit" />
            </GLButton>
            <GLButton variant="icon" onClick={() => dispatch(API.deleteWholesaler(wholesaler.pathname))} aria-label="Delete">
              <i className="fas fa-trash-alt" />
            </GLButton>
          </div>
        )
      }
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => getWholesalers(options), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Wholesalers | Glow LEDs</title>
      </Helmet>
      <Notification message={message} />
      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        tableName={"Wholesalers"}
        namespaceScope="wholesalerSlice"
        namespace="wholesalerTable"
        columnDefs={column_defs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="primary" onClick={() => dispatch(open_create_wholesaler_modal())}>
            Create Wholesaler
          </Button>
        }
      />
      <EditWholesalerModal />
    </div>
  );
};
export default WholesalersPage;
