import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import * as API from "../../api";
import { Box, Button } from "@mui/material";
import { open_create_palette_modal, open_edit_palette_modal } from "../../slices/paletteSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import EditPaletteModal from "./components/EditPaletteModal";

const PalettesPage = () => {
  const palettePage = useSelector(state => state.palettes.palettePage);
  const { loading, remoteVersionRequirement } = palettePage;
  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      {
        title: "Name",
        display: palette => palette.namespace,
      },
      {
        title: "Colors",
        display: palette => palette.colors.join(", "),
      },
      {
        title: "Actions",
        display: palette => (
          <Box display="flex" justifyContent={"flex-end"}>
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_palette_modal(palette))}>
              <EditIcon color="white" />
            </GLIconButton>
            <GLIconButton onClick={() => dispatch(API.deletePalette(palette._id))} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],
    []
  );

  const remoteApi = useCallback(options => API.getPalettes(options), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Palettes | Glow LEDs</title>
      </Helmet>
      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        tableName={"Palettes"}
        namespaceScope="palettes"
        namespace="paletteTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_palette_modal())}>
            Create Palette
          </Button>
        }
      />
      <EditPaletteModal />
    </div>
  );
};

export default PalettesPage;
