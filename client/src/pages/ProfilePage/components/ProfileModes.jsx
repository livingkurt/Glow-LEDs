import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import GLTableV2 from "../../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import * as API from "../../../api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import GLIconButton from "../../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FileCopy from "@mui/icons-material/FileCopy";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

const ProfileModes = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userPage = useSelector(state => state.users.userPage);
  const { user } = userPage;
  const [loading, setLoading] = useState(false);

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
      {
        title: "Microlight",
        display: mode => mode.microlight?.name || "N/A",
      },
      {
        title: "Visibility",
        display: "visibility",
      },
      {
        title: "",
        nonSelectable: true,
        display: mode => (
          <Box display="flex" justifyContent="flex-end">
            <GLIconButton tooltip="Edit" onClick={() => navigate(`/modes/creator/${mode._id}`)}>
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
            <GLIconButton onClick={() => handleDelete(mode._id)} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],

    [dispatch, navigate]
  );

  const handleDelete = async id => {
    setLoading(true);
    try {
      await dispatch(API.deleteMode(id)).unwrap();
    } finally {
      setLoading(false);
    }
  };

  const remoteApi = async ({ search, sorting, filters, page, pageSize }) => {
    try {
      return await API.getModes({
        search,
        sorting,
        filters: {
          ...filters,
          user: user._id,
        },
        page,
        pageSize,
      });
    } catch (error) {
      console.error("Error fetching modes:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography variant="h6">{"My Modes"}</Typography>
        <Button variant="contained" color="primary" startIcon={<AddIcon />} onClick={() => navigate("/modes/creator")}>
          {"Create Mode"}
        </Button>
      </Box>

      <GLTableV2
        remoteApi={remoteApi}
        tableName="My Modes"
        namespaceScope="modes"
        namespace="modeTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={false}
        enableSearch={true}
        noURLParams
      />
    </Paper>
  );
};

export default ProfileModes;
