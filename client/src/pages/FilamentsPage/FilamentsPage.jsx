import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_filament_modal, open_edit_filament_modal } from "../../slices/filamentSlice";
import * as API from "../../api";
import { Box, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditFilamentModal from "./components/EditFilamentModal";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";
import { useLocation } from "react-router-dom";

const FilamentsPage = () => {
  const location = useLocation();
  const filamentPage = useSelector(state => state.filaments.filamentPage);
  const { loading, remoteVersionRequirement } = filamentPage;

  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      {
        title: "Active",
        display: filament => (
          <GLIconButton
            color="white"
            onClick={() => {
              dispatch(
                API.saveFilament({
                  filament: {
                    ...filament,
                    active: filament.active ? false : true,
                  },
                  profile: location.pathname === "/secure/account/profile",
                })
              );
            }}
            tooltip={filament.active ? "deactivate" : "activate"}
          >
            <GLBoolean boolean={filament.active} />
          </GLIconButton>
        ),
      },
      { title: "Color Name", display: "color" },
      { title: "Type", display: "type" },
      { title: "Color Code", display: "color_code" },
      {
        title: "Display Color",
        display: filament => (
          <div
            style={{
              width: "100px",
              height: "30px",
              borderRadius: "10px",
              backgroundColor: filament.color_code,
            }}
          ></div>
        ),
      },
      // { title: "Tags", display: row => row.tags.map(tag => tag.name).join(" ,") },
      {
        title: "",
        nonSelectable: true,
        display: filament => (
          <Box display="flex" justifyContent={"flex-end"}>
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_filament_modal(filament))}>
              <EditIcon color="white" />
            </GLIconButton>

            <GLIconButton onClick={() => dispatch(API.deleteFilament(filament._id))} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => API.getFilaments(options), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Filaments | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        remoteVersionRequirementType={"filaments/setRemoteVersionRequirement"}
        tableName={"Filaments"}
        namespaceScope="filaments"
        namespace="filamentTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_filament_modal())}>
            Create Filament
          </Button>
        }
      />
      <EditFilamentModal />
    </div>
  );
};
export default FilamentsPage;
