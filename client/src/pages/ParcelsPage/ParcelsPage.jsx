import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import * as API from "../../api";

import { open_create_parcel_modal, open_edit_parcel_modal } from "../../slices/parcelSlice";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import EditParcelModal from "./components/EditParcelModal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";

const ParcelsPage = () => {
  const parcelPage = useSelector(state => state.parcels.parcelPage);
  const { loading, remoteVersionRequirement } = parcelPage;
  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      {
        title: "Name",
        display: parcel =>
          parcel.type === "bubble_mailer"
            ? `${parcel.length} X ${parcel.width}`
            : `${parcel.length} X ${parcel.width} X ${parcel.height}`,
      },
      {
        title: "Type",
        display: parcel => parcel.type,
      },
      {
        title: "Length",
        display: parcel => parcel.length,
      },
      {
        title: "Width",
        display: parcel => parcel.width,
      },
      {
        title: "Height",
        display: parcel => parcel.height,
      },
      {
        title: "Volume",
        display: parcel => parcel.volume,
      },
      {
        title: "Count In Stock",
        display: parcel => parcel.quantity_state,
      },
      {
        title: "",
        display: parcel => (
          <Box display="flex" justifyContent="flex-end">
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_parcel_modal(parcel))}>
              <EditIcon color="white" />
            </GLIconButton>
            <GLIconButton onClick={() => dispatch(API.deleteParcel(parcel._id))} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],

    []
  );

  const remoteApi = useCallback(options => API.getParcels(options), []);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>{"Admin Parcels | Glow LEDs"}</title>
      </Helmet>
      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        tableName="Parcels"
        namespaceScope="parcels"
        namespace="parcelTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_parcel_modal())}>
            {"Create Parcel"}
          </Button>
        }
      />

      <EditParcelModal />
    </Container>
  );
};

export default ParcelsPage;
