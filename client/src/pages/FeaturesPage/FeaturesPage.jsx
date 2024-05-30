import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import * as API from "../../api";
import { Button } from "@mui/material";
import { format_date } from "../../utils/helper_functions";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import EditFeatureModal from "./components/EditFeatureModal";
import { open_create_feature_modal, open_edit_feature_modal } from "../../slices/featureSlice";

const FeaturesPage = () => {
  const featurePage = useSelector(state => state.features.featurePage);
  const { loading, remoteVersionRequirement } = featurePage;
  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      {
        title: "Release Date",
        display: feature => feature.release_date && format_date(feature.release_date),
      },
      {
        title: "Category",
        display: feature => feature.category,
      },
      {
        title: "Artist Name",
        display: feature => feature.artist_name,
      },
      {
        title: "Video",
        display: feature => feature.video,
      },
      {
        title: "Actions",
        display: feature => (
          <div>
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_feature_modal(feature))}>
              <EditIcon color="white" />
            </GLIconButton>
            <GLIconButton onClick={() => dispatch(API.deleteFeature(feature._id))} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </div>
        ),
      },
    ],
    []
  );

  const remoteApi = useCallback(options => API.getFeatures(options), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Features | Glow LEDs</title>
      </Helmet>
      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        tableName={"Features"}
        namespaceScope="features"
        namespace="featureTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_feature_modal())}>
            Create Feature
          </Button>
        }
      />
      <EditFeatureModal />
    </div>
  );
};

export default FeaturesPage;
