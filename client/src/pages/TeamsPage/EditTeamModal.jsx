import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import GLActionModal from "../../shared/GlowLEDsComponents/GLActionModal/GLActionModal";
import { set_edit_team_modal, set_team, setCreateTeamStep } from "../../slices/teamSlice";
import * as API from "../../api";
import { GLForm } from "../../shared/GlowLEDsComponents/GLForm";
import { useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { teamFormFields } from "./components/teamFormFields";

import GLStepperModal from "../../shared/GlowLEDsComponents/GLStepperModal/GLStepperModal";
import { Loading } from "../../shared/SharedComponents";
import { useAffiliatesQuery, usePromosQuery, useUsersQuery } from "../../api/allRecordsApi";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const EditTeamModal = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  let { id } = useParams();
  const teamPage = useSelector(state => state.teams.teamPage);
  const { edit_team_modal, team, loading, createTeamStep, stripeAccountLink, loadingSaveTeam } = teamPage;

  const { current_user } = useSelector(state => state.users.userPage);

  const [searchParams] = useSearchParams();
  const stripeSuccess = searchParams.get("stripe_success") === "true";

  const { data: affiliates, isLoading: loadingAffiliates } = useAffiliatesQuery({ active: true });
  const { data: promos, isLoading: loadingPromos } = usePromosQuery({});
  const { data: users, isLoading: loadingUsers } = useUsersQuery({});

  useEffect(() => {
    let clean = true;
    if (clean) {
      // Check for stripe_success=true
      if (stripeSuccess) {
        dispatch(set_edit_team_modal(true)); // Open the modal
        dispatch(setCreateTeamStep(2)); // Set the step to 3 (zero-indexed)
      }
    }
    return () => (clean = false);
  }, [dispatch, stripeSuccess]);

  const formFields = teamFormFields({
    affiliates: loadingAffiliates ? [] : affiliates || [],
    promos: loadingPromos ? [] : promos || [],
    users: loadingUsers ? [] : users || [],
    team,
  });

  const stepLabels = ["Create Team Account", "Create Stripe Account", "Join our Discord", "Complete"];

  const determineConfirmLabel = () => {
    if (createTeamStep === 0) {
      return "Create Team Account";
    } else if (createTeamStep === 1) {
      return "Create Stripe Account";
    } else if (createTeamStep === 2) {
      return "Join our Discord";
    } else if (createTeamStep === 3) {
      return "Complete";
    }
  };
  const determineOnConfirm = () => {
    if (createTeamStep === 0) {
      dispatch(
        API.saveTeam({
          team,
          profile: location.pathname === "/secure/account/profile",
        })
      );
    } else if (createTeamStep === 1) {
      window.open(stripeAccountLink, "_blank"); // Navigate to Stripe
      dispatch(setCreateTeamStep(2));
    } else if (createTeamStep === 2) {
      window.open("https://discord.gg/dftpMYsart", "_blank"); // Navigate to Discord
      dispatch(setCreateTeamStep(3));
      navigate(location.pathname);
    } else if (createTeamStep === 3) {
      dispatch(set_edit_team_modal(false));
      dispatch(API.saveStripeAccount(id || current_user._id));
      dispatch(API.detailsUser(id || current_user._id));
    }
  };

  return (
    <div>
      {team?._id ? (
        <GLActionModal
          isOpen={edit_team_modal}
          onConfirm={() => {
            dispatch(
              API.saveTeam({
                team,
                profile: location.pathname === "/secure/account/profile",
              })
            );
            dispatch(API.detailsUser(id || current_user._id));
            dispatch(set_edit_team_modal(false));
          }}
          onCancel={() => {
            dispatch(set_edit_team_modal(false));
          }}
          title="Edit Team"
          confirmLabel="Save"
          confirmColor="primary"
          cancelLabel="Cancel"
          cancelColor="secondary"
          disableEscapeKeyDown
        >
          <GLForm
            formData={formFields}
            state={team}
            mode="edit"
            onChange={value => dispatch(set_team(value))}
            loading={loading}
          />
        </GLActionModal>
      ) : (
        <GLStepperModal
          isOpen={edit_team_modal}
          step={createTeamStep}
          stepLabels={stepLabels}
          onConfirm={determineOnConfirm}
          onCancel={() => {
            if (createTeamStep === 0) {
              dispatch(set_edit_team_modal(false));
            }
          }}
          title="Create Team"
          confirmLabel={determineConfirmLabel()}
          cancelLabel={createTeamStep === 1 || createTeamStep === 2 || createTeamStep === 3 ? "" : "Cancel"}
          cancelDisabled={stripeSuccess}
          cancelColor="secondary"
          disableEscapeKeyDown
        >
          <Loading loading={loadingSaveTeam} />
          {createTeamStep === 0 && (
            <GLForm
              formData={formFields}
              state={team}
              mode="create"
              onChange={value => dispatch(set_team(value))}
              loading={loading}
            />
          )}
          {createTeamStep === 1 && (
            <Box sx={{ padding: 3, marginBottom: 2 }}>
              <Typography variant="h6" gutterBottom>
                {"Create Your Stripe Account"}
              </Typography>
              <Typography variant="body1" paragraph>
                {
                  "In order to receive commissions from your team sales, you'll need to create a Stripe account. This is a"
                }
                {"quick and secure process."}
              </Typography>
            </Box>
          )}
          {createTeamStep === 2 && (
            <Box sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                {"Join our Glow LEDs Discord Community"}
              </Typography>
              <Typography variant="body1" paragraph>
                {"Be a part of our vibrant community on Discord! Engage with fellow teams, get updates, and share your"}
                {"experiences."}
              </Typography>
              <Typography variant="body1" paragraph>
                {'Once completed Navigate back to this page and click the "Complete" button.'}
              </Typography>
            </Box>
          )}
          {createTeamStep === 3 && (
            <Box sx={{ padding: 3 }}>
              <Typography variant="h6" gutterBottom>
                {"Welcome to the Glow LEDs Team Team!"}
              </Typography>
              <Typography variant="body1" paragraph>
                {"You're all set! You can now start earning commissions on your sales."}
              </Typography>
              <Typography variant="body1" paragraph>
                {"If you have any questions, please reach out to us on Discord."}
              </Typography>
            </Box>
          )}
        </GLStepperModal>
      )}
    </div>
  );
};

export default EditTeamModal;
