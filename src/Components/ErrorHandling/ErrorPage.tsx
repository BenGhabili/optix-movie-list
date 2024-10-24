import React from 'react';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const ErrorPage = () =>
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
    <Typography color="error" variant="body2">
      Ooooops! Something went wrong!
    </Typography>
  </Box>;

  export default ErrorPage;
