import { useSelector } from "react-redux";
import { Box, Typography, Stack } from "@mui/material";

const ProfileDetails = () => {
  const userPage = useSelector(state => state.users.userPage);
  const { current_user, user } = userPage;

  const { _id, first_name, last_name, email, isVerified, isAdmin, shipping, email_subscription } = user;

  return (
    <Box sx={{ p: 3 }}>
      <Stack spacing={2}>
        {current_user?.isAdmin && (
          <Box>
            <Typography variant="h6" gutterBottom>
              {"ID"}
            </Typography>
            <Typography>{_id}</Typography>
          </Box>
        )}

        <Box>
          <Typography variant="h6" gutterBottom>
            {"First Name"}
          </Typography>
          <Typography>{first_name}</Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {"Last Name"}
          </Typography>
          <Typography>{last_name}</Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {"Email"}
          </Typography>
          <Typography>{email}</Typography>
        </Box>

        <Box>
          <Typography variant="h6" gutterBottom>
            {"Password"}
          </Typography>
          <Typography>{"**********"}</Typography>
        </Box>

        {shipping && shipping.first_name && shipping.last_name && (
          <Box>
            <Typography variant="h6" gutterBottom>
              {"Shipping Address"}
            </Typography>
            <Stack spacing={0.5}>
              <Typography>
                {shipping.first_name} {shipping.last_name}
              </Typography>
              <Typography>
                {shipping.address_1} {shipping.address_2}
              </Typography>
              <Typography>
                {shipping.city}
                {", "}
                {shipping.state} {shipping.postalCode} {shipping.country}
              </Typography>
              {shipping.international && <Typography>{"International"}</Typography>}
              <Typography>{shipping.email}</Typography>
            </Stack>
          </Box>
        )}

        <Box>
          <Typography variant="h6" gutterBottom>
            {"Promotional Emails"}
          </Typography>
          <Typography>{email_subscription ? "Subscribed" : "Not Subscribed"}</Typography>
        </Box>

        {current_user?.isAdmin && (
          <>
            <Box>
              <Typography variant="h6" gutterBottom>
                {"Verified"}
              </Typography>
              <Typography>{isVerified === true ? "Verified" : "Not Verified"}</Typography>
            </Box>

            <Box>
              <Typography variant="h6" gutterBottom>
                {"Admin"}
              </Typography>
              <Typography>{isAdmin === true ? "Admin" : "Not Admin"}</Typography>
            </Box>
          </>
        )}
      </Stack>
    </Box>
  );
};

export default ProfileDetails;
