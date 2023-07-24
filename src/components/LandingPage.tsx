import { Grid, Typography } from "@mui/material";

const landingPage = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      spacing={2}
    >
      <Typography component="h1" variant="h1">
        Airport Missing Things(MYT)
      </Typography>
    </Grid>
  );
};

export default landingPage;
