import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_filament_modal, open_edit_filament_modal } from "../../slices/filamentSlice";
import * as API from "../../api";
import { Button, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditFilamentModal from "./components/EditFilamentModal";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const FilamentsPage = () => {
  const filamentPage = useSelector(state => state.filaments.filamentPage);
  const { loading, remoteVersionRequirement } = filamentPage;

  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      { title: "Color", display: "color" },
      { title: "Type", display: "type" },
      { title: "Color Code", display: "color_code" },
      {
        title: "Active",
        display: filament => (filament.active ? <CheckCircleIcon color="white" /> : <CancelIcon color="white" />),
      },
      { title: "Tags", display: row => row.tags.map(tag => tag.name).join(" ,") },
      {
        title: "Actions",
        display: filament => (
          <div className="jc-b">
            <IconButton
              variant="contained"
              aria-label="Edit"
              onClick={() => dispatch(open_edit_filament_modal(filament))}
            >
              <EditIcon color="white" />
            </IconButton>

            <IconButton
              variant="contained"
              onClick={() => dispatch(API.deleteFilament(filament._id))}
              aria-label="Delete"
            >
              <DeleteIcon color="white" />
            </IconButton>
          </div>
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
