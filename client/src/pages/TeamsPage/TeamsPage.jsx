import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_team_modal, open_edit_team_modal } from "../../slices/teamSlice";
import * as API from "../../api";
import PolylineIcon from "@mui/icons-material/Polyline";

import { getTeams } from "../../api";
import { determineColor } from "./teamHelpers";
import { useLocation } from "react-router-dom";
import { fullName } from "../UsersPage/usersHelpers";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EditPromoModal } from "../PromosPage/components";
import { open_edit_promo_modal } from "../../slices/promoSlice";
import EditTeamModal from "./EditTeamModal";
import GLIconButton from "../../shared/GlowLEDsComponents/GLIconButton/GLIconButton";
import GLBoolean from "../../shared/GlowLEDsComponents/GLBoolean/GLBoolean";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";

const TeamsPage = () => {
  const location = useLocation();
  const teamPage = useSelector(state => state.teams.teamPage);
  const { loading, remoteVersionRequirement } = teamPage;

  const dispatch = useDispatch();

  const columnDefs = useMemo(
    () => [
      {
        title: "Active",
        display: team => (
          <GLIconButton
            color="white"
            onClick={() => {
              dispatch(
                API.saveTeam({
                  team: {
                    ...team,
                    active: team.active ? false : true,
                  },
                  profile: location.pathname === "/secure/account/profile",
                })
              );
            }}
            tooltip={team.active ? "deactivate" : "activate"}
          >
            <GLBoolean boolean={team.active} />
          </GLIconButton>
        ),
      },
      { title: "Team Name", display: "team_name" },
      {
        title: "Percentage Off",
        display: team => `${team.private_code && team.private_code.percentage_off}%`,
      },
      { title: "User", display: team => fullName(team.captain) },
      {
        title: "Public Code",
        display: team => (
          <Tooltip title="Click to edit public code">
            <div style={{ cursor: "pointer" }} onClick={() => dispatch(open_edit_promo_modal(team?.public_code))}>
              {team?.public_code?.promo_code?.toUpperCase()}
            </div>
          </Tooltip>
        ),
      },
      {
        title: "Private Code",
        display: team => (
          <Tooltip title="Click to edit private code">
            <div style={{ cursor: "pointer" }} onClick={() => dispatch(open_edit_promo_modal(team?.private_code))}>
              {team?.private_code?.promo_code?.toUpperCase()}
            </div>
          </Tooltip>
        ),
      },

      {
        title: "",
        nonSelectable: true,
        display: team => (
          <Box display="flex" justifyContent="flex-end">
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_team_modal(team))}>
              <EditIcon color="white" />
            </GLIconButton>

            <GLIconButton tooltip="Generate Team Codes" onClick={() => dispatch(API.generateTeamCodes(team._id))}>
              <PolylineIcon color="white" />
            </GLIconButton>

            <GLIconButton onClick={() => dispatch(API.deleteTeam(team._id))} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </Box>
        ),
      },
    ],

    [dispatch]
  );

  const remoteApi = useCallback(options => getTeams(options), []);

  return (
    <Container maxWidth="xl" sx={{ py: 2 }}>
      <Helmet>
        <title>{"Admin Teams | Glow LEDs"}</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determineColor={determineColor}
        tableName="Teams"
        namespaceScope="teams"
        namespace="teamTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_team_modal())}>
            {"Create Team"}
          </Button>
        }
      />

      <EditTeamModal />
      <EditPromoModal />
    </Container>
  );
};
export default TeamsPage;
