import { useCallback, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Helmet } from "react-helmet";
import GLTableV2 from "../../shared/GlowLEDsComponents/GLTableV2/GLTableV2";
import { open_create_team_modal, open_edit_team_modal } from "../../slices/teamSlice";
import * as API from "../../api";
import PolylineIcon from "@mui/icons-material/Polyline";
import { Button, Tooltip } from "@mui/material";
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

const TeamsPage = () => {
  const location = useLocation();
  const teamPage = useSelector(state => state.teams.teamPage);
  const { message, loading, remoteVersionRequirement } = teamPage;

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
            title={team.active ? "deactivate" : "activate"}
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
        title: "Actions",
        display: team => (
          <div className="jc-b">
            <GLIconButton tooltip="Edit" onClick={() => dispatch(open_edit_team_modal(team))}>
              <EditIcon color="white" />
            </GLIconButton>

            <GLIconButton tooltip="Generate Team Codes" onClick={() => dispatch(API.generateTeamCodes(team._id))}>
              <PolylineIcon color="white" />
            </GLIconButton>

            <GLIconButton onClick={() => dispatch(API.deleteTeam(team._id))} tooltip="Delete">
              <DeleteIcon color="white" />
            </GLIconButton>
          </div>
        ),
      },
    ],
    [dispatch]
  );

  const remoteApi = useCallback(options => getTeams(options), []);

  return (
    <div className="main_container p-20px">
      <Helmet>
        <title>Admin Teams | Glow LEDs</title>
      </Helmet>

      <GLTableV2
        remoteApi={remoteApi}
        remoteVersionRequirement={remoteVersionRequirement}
        determineColor={determineColor}
        tableName={"Teams"}
        namespaceScope="teams"
        namespace="teamTable"
        columnDefs={columnDefs}
        loading={loading}
        enableRowSelect={true}
        titleActions={
          <Button color="primary" variant="contained" onClick={() => dispatch(open_create_team_modal())}>
            Create Team
          </Button>
        }
      />
      <EditTeamModal />
      <EditPromoModal />
    </div>
  );
};
export default TeamsPage;
