import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Box, Button, Container, TextField, Typography, MenuItem } from "@mui/material";
import * as API from "../../api";
import { useMicrolightsQuery } from "../../api/allRecordsApi";
import GLLoading from "../../shared/GlowLEDsComponents/GLLoading/GLLoading";
import { showError } from "../../slices/snackbarSlice";
import ColorPicker from "./components/ColorPicker";
import PatternSelector from "./components/PatternSelector";
import ModePreview from "./components/ModePreview";

const ModeCreatorPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const userPage = useSelector(state => state.users.userPage);
  const { current_user } = userPage;
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState({
    name: "",
    description: "",
    colors: [],
    microlight: null,
    flashing_pattern: {
      pattern_type: "solid",
      speed: 50,
      direction: "forward",
    },
    visibility: "public",
  });

  const { data: microlights, isLoading: microlightsLoading } = useMicrolightsQuery();

  useEffect(() => {
    if (id) {
      setLoading(true);
      dispatch(API.detailsMode(id))
        .unwrap()
        .then(data => {
          if (data.user !== current_user._id) {
            dispatch(showError({ message: "You do not have permission to edit this mode" }));
            navigate("/modes/creator");
            return;
          }
          setMode(data);
          setLoading(false);
        })
        .catch(() => {
          setLoading(false);
          navigate("/modes/creator");
        });
    }
  }, [dispatch, id, current_user._id, navigate]);

  const handleSave = async () => {
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

    setLoading(true);
    try {
      const savedMode = await dispatch(
        API.saveMode({
          ...mode,
          user: current_user._id,
        })
      ).unwrap();
      navigate(`/modes/${savedMode._id}`);
    } catch (error) {
      setLoading(false);
    }
  };

  const handleColorChange = (index, color) => {
    const newColors = [...mode.colors];
    newColors[index] = color;
    setMode({ ...mode, colors: newColors });
  };

  const handleAddColor = () => {
    if (!mode.microlight) {
      dispatch(showError({ message: "Please select a microlight first" }));
      return;
    }

    const selectedMicrolight = microlights.find(m => m._id === mode.microlight);
    if (mode.colors.length >= selectedMicrolight.colors_per_mode) {
      dispatch(showError({ message: `This microlight supports up to ${selectedMicrolight.colors_per_mode} colors` }));
      return;
    }

    setMode({
      ...mode,
      colors: [
        ...mode.colors,
        {
          hue: { red: 255, green: 0, blue: 0 },
          saturation: 100,
          brightness: 100,
        },
      ],
    });
  };

  const handleRemoveColor = index => {
    const newColors = mode.colors.filter((_, i) => i !== index);
    setMode({ ...mode, colors: newColors });
  };

  const handleMicrolightChange = event => {
    const selectedMicrolight = microlights.find(m => m._id === event.target.value);
    setMode({
      ...mode,
      microlight: event.target.value,
      colors: mode.colors.slice(0, selectedMicrolight.colors_per_mode),
    });
  };

  if (loading || microlightsLoading) {
    return <GLLoading />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Helmet>
        <title>
          {id ? "Edit Mode" : "Create Mode"}
          {" | Glow LEDs"}
        </title>
      </Helmet>

      <Box display="flex" flexDirection="column" gap={4}>
        <Typography variant="h4">{id ? "Edit Mode" : "Create Mode"}</Typography>

        <Box display="flex" gap={2}>
          <TextField
            label="Mode Name"
            value={mode.name}
            onChange={e => setMode({ ...mode, name: e.target.value })}
            fullWidth
          />
          <TextField
            select
            label="Microlight"
            value={mode.microlight || ""}
            onChange={handleMicrolightChange}
            fullWidth
          >
            {microlights?.map(microlight => (
              <MenuItem key={microlight._id} value={microlight._id}>
                {microlight.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>

        <TextField
          label="Description"
          value={mode.description}
          onChange={e => setMode({ ...mode, description: e.target.value })}
          multiline
          rows={2}
          fullWidth
        />

        <Box>
          <Typography variant="h6" gutterBottom>
            {"Colors"}
          </Typography>
          <Box display="flex" gap={2} flexWrap="wrap">
            {mode.colors.map((color, index) => (
              <ColorPicker
                key={index}
                color={color}
                onChange={color => handleColorChange(index, color)}
                onRemove={() => handleRemoveColor(index)}
              />
            ))}
            <Button variant="outlined" onClick={handleAddColor} disabled={!mode.microlight}>
              {"Add Color"}
            </Button>
          </Box>
        </Box>

        <PatternSelector
          pattern={mode.flashing_pattern}
          onChange={pattern => setMode({ ...mode, flashing_pattern: pattern })}
        />

        <ModePreview mode={mode} />

        <Box display="flex" justifyContent="flex-end" gap={2}>
          <Button variant="contained" color="secondary" onClick={() => navigate(-1)}>
            {"Cancel"}
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            {"Save Mode"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ModeCreatorPage;
