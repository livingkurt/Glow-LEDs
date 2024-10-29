import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_paycheck_modal } from "../../slices/paycheckSlice";
import { EditPaycheckModal } from "./components";
import * as API from "../../api";
import {  Button, Container } from "@mui/material";
import usePaychecksPage from "./usePaychecksPage";

const PaychecksPage = () => {
  const { remoteApi, remoteFiltersApi, remoteVersionRequirement, determineColor, selectedRows } = usePaychecksPage();

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>{"Admin Paychecks | Glow LEDs"}</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteFiltersApi={remoteFiltersApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determineColor={determineColor}
        tableName="Paychecks"
        namespaceScope="paychecks"
        namespace="paycheckTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <div className="row g-10px">
            {selectedRows.length > 1 && (
              <Button
                color="secondary"
                variant="contained"
                onClick={() => {
                  const confirm = window.confirm(`Are you sure you want to Delete ${selectedRows.length} Paychecks?`);
                  if (confirm) {
                    dispatch(API.deleteMultiplePaychecks(selectedRows));
                  }
                }}
              >
                {"Delete Paychecks"}
              </Button>
            )}
            <Button color="primary" variant="contained" onClick={() => dispatch(open_create_paycheck_modal())}>
              {"Create Paycheck"}
            </Button>
          </div>
        }
      />
      <EditPaycheckModal />
    </Container>
  );
};
export default PaychecksPage;
