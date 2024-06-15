import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import EditChipModal from "./components/EditChipModal";
import * as API from "../../api";
import { Box, Button, Container } from "@mui/material";
import { open_create_chip_modal, open_edit_chip_modal } from "../../slices/chipSlice";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { FileCopy } from "@mui/icons-material";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";

const ChipsPage = () => {
  const chipPage = useSelector(state => state.chips.chipPage);
  const { loading, remoteVersionRequirement } = chipPage;
  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      {
        title: "Chip",
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
        display: chip => <GLBoolean boolean={chip.programmable} />,
      },
      {
        title: "",
        display: chip => (
          <Box display="flex" justifyContent={"flex-end"}>
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_chip_modal(chip))}>
              <EditIcon color="white" />
            </GLIconButton>
            <GLIconButton
              tooltip="Duplicate"
              onClick={() =>
                dispatch(
                  API.saveChip({
                    ...chip,
                    _id: null,
                    name: `${chip.name} Copy`,
                    pathname: `${chip.pathname}_copy`,
                  })
                )
              }
            >
              <FileCopy color="white" />
            </GLIconButton>
            <GLIconButton onClick={() => dispatch(API.deleteChip(chip._id))} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],
    []
  );

  const remoteApi = useCallback(options => API.getChips(options), []);
  // const remoteFiltersApi = useCallback(() => API.getChipFilters(), []);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>Admin Chips | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        // remoteFiltersApi={remoteFiltersApi}
        remoteVersionRequirement={remoteVersionRequirement}
        // determineColor={determineChipColors}
        tableName={"Chips"}
        namespaceScope="chips"
        namespace="chipTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_chip_modal())}>
            Create Chip
          </Button>
        }
      />
      <EditChipModal />
    </Container>
  );
};
export default ChipsPage;
