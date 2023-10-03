import { useSelector, useDispatch } from "react-redux";
import { TextField, Typography, Grid, Button, Link } from "@mui/material";
import { closeMonthlyCheckinModal, setCheckin, setNumberOfContent, setQuestion } from "../../../slices/affiliateSlice";
import * as API from "../../../api";
import GLActiionModal from "../../../shared/GlowLEDsComponents/GLActiionModal/GLActiionModal";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const SponsorMonthlyCheckinModal = () => {
  const dispatch = useDispatch();
  let { id } = useParams();
  const affiliatePage = useSelector(state => state.affiliates.affiliatePage);
  const { questionsConcerns, monthlyCheckinModal, numberOfContent, month, year } = affiliatePage;
  const userPage = useSelector(state => state.users.userPage);
  const { user, current_user } = userPage;

  console.log({ month, year });

  useEffect(() => {
    if (user?.affiliate) {
      const checkin = user?.affiliate?.sponsorMonthlyCheckins?.find(
        checkin => checkin.month === month && checkin.year === year
      );
      if (checkin) {
        dispatch(setCheckin(checkin));
      }
    }
  }, [user?.affiliate?.sponsorMonthlyCheckins, dispatch, user?.affiliate, month, year]);

  return (
    <GLActiionModal
      isOpen={monthlyCheckinModal}
      onConfirm={() => {
        dispatch(
          API.monthlyCheckin({ affiliateId: user.affiliate._id, questionsConcerns, numberOfContent, month, year })
        );
        // dispatch(API.detailsUser(user._id));
        dispatch(API.detailsUser(id || current_user._id));
      }}
      onCancel={() => dispatch(closeMonthlyCheckinModal())}
      title={"Sponsor Monthly Check In"}
      confirmLabel={"Confirm"}
      confirmColor="primary"
      confirmDisabled={numberOfContent < 3}
      cancelLabel={"Cancel"}
      cancelColor="secondary"
      disableEscapeKeyDown
    >
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="body1" gutterBottom>
            Please fill out this form below to complete your monthly check in.
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body1">You are checking in for: {month}</Typography>
        </Grid>
        <Grid item>
          <TextField
            fullWidth
            id="questionsConcerns"
            name="questionsConcerns"
            label="Questions/problems we can discuss in meetings or questions for the company."
            value={questionsConcerns}
            onChange={e => dispatch(setQuestion(e.target.value))}
            multiline
            rows={4}
          />
        </Grid>

        <Grid item>
          <Typography variant="body1" gutterBottom>
            Please follow the link below to upload at least 3 pieces of content to the corresponding month folder in the
            Google Drive.
          </Typography>
        </Grid>
        <Grid item>
          <Link
            href="https://drive.google.com/drive/folders/1shjx7y3Yqa6_UC3h-Fg0JMAhutX3hE6d?usp=sharing"
            target="_blank"
            rel="noopener"
          >
            <Button variant="contained" color="primary" fullWidth>
              Google Drive
            </Button>
          </Link>
        </Grid>

        <Grid item>
          <TextField
            fullWidth
            type="number"
            id="numberOfContent"
            name="numberOfContent"
            label="How many pieces of content did you upload this month?"
            value={numberOfContent}
            onChange={e => dispatch(setNumberOfContent(e.target.value))}
          />
        </Grid>
        <Grid item>
          <Typography variant="body1" gutterBottom>
            Once checkin is completed your monthly sponsor codes will be generated at the beginning of the month.
          </Typography>
        </Grid>
      </Grid>
    </GLActiionModal>
  );
};

export default SponsorMonthlyCheckinModal;
