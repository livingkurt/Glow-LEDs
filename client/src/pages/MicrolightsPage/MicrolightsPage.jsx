import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import EditMicrolightModal from "./components/EditMicrolightModal";
import * as API from "../../api";

import { open_create_microlight_modal, open_edit_microlight_modal } from "../../slices/microlightSlice";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FileCopy from "@mui/icons-material/FileCopy";

const MicrolightsPage = () => {
  const microlightPage = useSelector(state => state.microlights.microlightPage);
  const { loading, remoteVersionRequirement } = microlightPage;
  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      {
        title: "Microlight",
        display: "name",
      },
      {
        title: "Company",
        display: "company",
      },
      {
        title: "Category",
        display: "category",
      },
      {
        title: "Programmable",
        display: microlight => <GLBoolean boolean={microlight.programmable} />,
      },
      {
        title: "",
        nonSelectable: true,
        display: microlight => (
          <Box display="flex" justifyContent="flex-end">
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_microlight_modal(microlight))}>
              <EditIcon color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Duplicate"
              onClick={() =>
                dispatch(
                  API.saveMicrolight({
                    ...microlight,
                    _id: null,
                    name: `${microlight.name} Copy`,
                    pathname: `${microlight.pathname}_copy`,
                  })
                )
              }
            >
              <FileCopy color="white" />
            </GLIconButton>
            <GLIconButton onClick={() => dispatch(API.deleteMicrolight(microlight._id))} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],

    []
  );

  const remoteApi = useCallback(options => API.getMicrolights(options), []);
  // const remoteFiltersApi = useCallback(() => API.getMicrolightFilters(), []);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>{"Admin Microlights | Glow LEDs"}</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        // remoteFiltersApi={remoteFiltersApi}
        remoteVersionRequirement={remoteVersionRequirement}
        // determineColor={determineMicrolightColors}
        tableName="Microlights"
        namespaceScope="microlights"
        namespace="microlightTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_microlight_modal())}>
            {"Create Microlight"}
          </Button>
        }
      />

      <EditMicrolightModal />
    </Container>
  );
};
export default MicrolightsPage;
