import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import * as API from "../../api";
import { useMicrolightsQuery } from "../../api/allRecordsApi";
import GLLoading from "../../shared/GlowLEDsComponents/GLLoading/GLLoading";
import { showError } from "../../slices/snackbarSlice";
import { openLoginModal } from "../../slices/userSlice";
import { modeInitialState, set_mode } from "../../slices/modeSlice";

const useModeCreatorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [macro] = useState(true); // You can make this dynamic later if needed
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;

  const { mode, loading } = useSelector(state => state.modes.modePage);

  const { data: microlights, isLoading: microlightsLoading } = useMicrolightsQuery();
  // Modify the selectedMicrolight logic to use macro
  const selectedMicrolight = macro
    ? microlights?.find(m => m.name === "Helios")
    : microlights?.find(m => m._id === mode.microlight);

  // First useEffect - handles initial Helios setup
  useEffect(() => {
    const copy = searchParams.get("copy");

    if (id || copy) {
      // Handle editing or copying existing mode
      dispatch(API.detailsMode(id || copy));
    } else if (microlights?.length) {
      // Handle new mode creation
      const helios = microlights.find(m => m.name === "Helios");
      if (helios) {
        dispatch(
          set_mode({
            ...modeInitialState,
            microlight: helios._id,
            _id: undefined,
            flashing_pattern: {
              name: "",
              type: "",
              on_dur: 5,
              off_dur: 8,
              gap_dur: 0,
              dash_dur: 0,
              group_size: 0,
              blend_speed: 0,
            },
          })
        );
      }
    }
  }, [dispatch, id, searchParams, microlights]);

  const handleSave = async ({ createNew = false } = {}) => {
    if (!mode.microlight) {
      dispatch(showError({ message: "Please select a microlight" }));
      return;
    }

    if (!mode.name.trim()) {
      dispatch(showError({ message: "Please enter a name for your mode" }));
      return;
    }

    if (mode.colors.length === 0) {
      dispatch(showError({ message: "Please add at least one color" }));
      return;
    }
    if (!current_user._id) {
      dispatch(openLoginModal());
      return;
    }
    const { payload } = await dispatch(
      API.saveMode({
        mode: {
          ...mode,
          _id: searchParams.has("copy") || createNew ? undefined : mode._id,
          user: current_user._id,
          affiliate: current_user?.affiliate,
        },
        copy: searchParams.has("copy"),
      })
    );

    navigate(`/modes/${payload._id}`);
  };

  const handleMicrolightChange = (event, newValue) => {
    if (!newValue) {
      dispatch(
        set_mode({
          microlight: null,
          colors: [],
          flashing_pattern: {
            name: "",
            type: "",
            on_dur: 5,
            off_dur: 8,
            gap_dur: 0,
            dash_dur: 0,
            group_size: 0,
            blend_speed: 0,
          },
        })
      );
      return;
    }

    dispatch(
      set_mode({
        microlight: newValue._id, // Store the ID instead of the whole object
        colors: [], // Reset colors when microlight changes
        flashing_pattern: newValue.flashing_patterns[0] || {
          name: "",
          type: "",
          on_dur: 5,
          off_dur: 8,
          gap_dur: 0,
          dash_dur: 0,
          group_size: 0,
          blend_speed: 0,
        },
      })
    );
  };

  const handleDragEnd = result => {
    if (!result.destination) return;

    const { source, destination } = result;

    if (source.droppableId === "color-palette" && destination.droppableId === "color-slots") {
      const newColor = selectedMicrolight.colors[source.index];

      // Check if the maximum number of colors has been reached
      if (mode.colors.length >= selectedMicrolight.colors_per_mode) {
        return; // Prevent adding more colors than allowed
      }

      // Add initial maximum levels if controls are enabled
      const colorWithLevels = {
        ...newColor,
        brightness: selectedMicrolight?.brightness_control ? 100 : undefined,
        saturation: selectedMicrolight?.saturation_control ? 100 : undefined,
      };

      const newColors = [...mode.colors];
      newColors.splice(destination.index, 0, colorWithLevels);
      dispatch(set_mode({ colors: newColors }));
    } else if (source.droppableId === "color-slots" && destination.droppableId === "color-slots") {
      const newColors = [...mode.colors];
      const [removed] = newColors.splice(source.index, 1);
      newColors.splice(destination.index, 0, removed);
      dispatch(set_mode({ colors: newColors }));
    }
  };

  // Add this to the existing handleColorClick function in the component
  const handleColorClick = color => {
    if (mode?.colors.length >= selectedMicrolight.colors_per_mode) {
      return; // Prevent adding more colors than allowed
    }

    const colorWithLevels = {
      ...color,
      brightness: selectedMicrolight?.brightness_control ? 100 : undefined,
      saturation: selectedMicrolight?.saturation_control ? 100 : undefined,
    };

    dispatch(set_mode({ colors: [...mode.colors, colorWithLevels] }));
  };

  if (loading || microlightsLoading) {
    return <GLLoading />;
  }

  return {
    mode,
    loading,
    microlightsLoading,
    handleSave,
    handleMicrolightChange,
    handleDragEnd,
    selectedMicrolight,
    macro,
    handleColorClick,
    microlights,
  };
};

export default useModeCreatorPage;
