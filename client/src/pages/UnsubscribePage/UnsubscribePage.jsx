import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Link,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import * as API from '../../api';
import { Loading } from '../../shared/SharedComponents';

const UnsubscribePage = () => {
  const dispatch = useDispatch();
  const { loading, message, error } = useSelector((state) => state.users.userPage);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const [email, setEmail] = useState(searchParams.get('email'));

  const isUnsubscribed = message === 'Unsubscribed';

  // Get error message string from error object
  const errorMessage = error?.message || (typeof error === 'string' ? error : '');

  return (
    <Container maxWidth="sm">
      <Loading loading={loading} />
      <Box sx={{ pt: 4, mb: 4, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Paper elevation={3} sx={{ p: 4, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Unsubscribe
          </Typography>

          {!isUnsubscribed ? (
            <>
              <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
                Don't want to receive Glow LEDs emails? You can choose to update your preferences or unsubscribe below.
              </Typography>

              <TextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                type="email"
                sx={{ mb: 3 }}
              />

              <Button
                variant="contained"
                color="primary"
                onClick={() => dispatch(API.unsubscribeEmail({ email }))}
                sx={{ mb: 2 }}
                disabled={loading}
              >
                {loading ? 'Unsubscribing...' : 'Unsubscribe'}
              </Button>

              {errorMessage && (
                <Typography color="error" sx={{ mb: 2 }}>
                  {errorMessage}
                </Typography>
              )}
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <Typography variant="h6" gutterBottom>
                You've been successfully unsubscribed
              </Typography>
              <Typography variant="body1">
                You will no longer receive marketing emails from Glow LEDs.
                If you change your mind, you can always
                <Link href="/account/preferences" underline="hover" sx={{ ml: 1 }}>
                  update your preferences
                </Link>
                .
              </Typography>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default UnsubscribePage;
