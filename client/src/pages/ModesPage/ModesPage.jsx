import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import EditModeModal from "./components/EditModeModal";
import * as API from "../../api";

import { open_create_mode_modal, open_edit_mode_modal } from "../../slices/modeSlice";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import { toCapitalize } from "../../utils/helper_functions";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import FileCopy from "@mui/icons-material/FileCopy";

const ModesPage = () => {
  const modePage = useSelector(state => state.modes.modePage);
  const { loading, remoteVersionRequirement } = modePage;
  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      {
        title: "Name",
        display: "name",
      },
      {
        title: "Description",
        display: "description",
      },
      { title: "Author", display: "author" },
      {
        title: "Microlight",
        display: mode => mode.microlight?.name || "N/A",
      },
      { title: "Order", display: row => row.order },
      {
        title: "Visibility",
        display: mode => toCapitalize(mode.visibility),
      },
      {
        title: "",
        nonSelectable: true,
        display: mode => (
          <Box display="flex" justifyContent="flex-end">
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_mode_modal(mode))}>
              <EditIcon color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Duplicate"
              onClick={() =>
                dispatch(
                  API.saveMode({
                    ...mode,
                    _id: null,
                    name: `${mode.name} Copy`,
                  })
                )
              }
            >
              <FileCopy color="white" />
            </GLIconButton>
            <GLIconButton onClick={() => dispatch(API.deleteMode(mode._id))} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],

    []
  );

  const remoteApi = useCallback(options => API.getModes(options), []);
  const remoteReorderApi = useCallback(options => API.reorderModes(options), []);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>{"Admin Modes | Glow LEDs"}</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteReorderApi={remoteReorderApi}
        remoteVersionRequirement={remoteVersionRequirement}
        tableName="Modes"
        namespaceScope="modes"
        namespace="modeTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        enableDragDrop
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_mode_modal())}>
            {"Create Mode"}
          </Button>
        }
      />

      <EditModeModal />
    </Container>
  );
};
export default ModesPage;
