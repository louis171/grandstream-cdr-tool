import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Skeleton from "@mui/material/Skeleton";

import LoadingSkeleton from "../LoadingSkeleton";

const CardSysInfo = ({
  systemGeneralStatus,
  systemStatus,
  isLoadingGeneralSystemStatus,
  isLoadingSystemStatus,
}) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          <Grid sx={{ width: "100%" }} item>
            <Typography
              sx={{ width: "100%", textAlign: "center" }}
              color="primary.main"
              gutterBottom
              variant="h4"
            >
              <LoadingSkeleton
                condition={isLoadingGeneralSystemStatus}
                item={systemGeneralStatus["product-model"]}
                variant="text"
              />
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ justifyContent: "start" }}>
          <Grid item sx={{ width: "50%" }}>
            <Typography variant="body1">System Time</Typography>
          </Grid>
          <Grid item sx={{ width: "50%" }}>
            <Typography variant="body1">
              <LoadingSkeleton
                condition={isLoadingSystemStatus}
                item={systemStatus["system-time"]}
                variant="text"
              />
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ justifyContent: "start" }}>
          <Grid item sx={{ width: "50%" }}>
            <Typography variant="body1">Up Time</Typography>
          </Grid>
          <Grid item sx={{ width: "50%" }}>
            <Typography variant="body1">
              {isLoadingSystemStatus ? (
                <Skeleton variant="text" />
              ) : (
                systemStatus["up-time"].replace(" ", " day(s) ")
              )}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ justifyContent: "start" }}>
          <Grid item sx={{ width: "50%" }}>
            <Typography variant="body1">Serial Number</Typography>
          </Grid>
          <Grid item sx={{ width: "50%" }}>
            <Typography variant="body1">
              <LoadingSkeleton
                condition={isLoadingSystemStatus}
                item={systemStatus["serial-number"]}
                variant="text"
              />
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ justifyContent: "start" }}>
          <Grid item sx={{ width: "50%" }}>
            <Typography variant="body1">Part Number</Typography>
          </Grid>
          <Grid item sx={{ width: "50%" }}>
            <Typography variant="body1">
              <LoadingSkeleton
                condition={isLoadingSystemStatus}
                item={systemStatus["part-number"]}
                variant="text"
              />
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: ".5em", mb: ".5em" }} />
        <Grid container spacing={2} sx={{ justifyContent: "start" }}>
          <Grid item sx={{ width: "50%" }}>
            <Typography variant="body1">Version</Typography>
          </Grid>
          <Grid item sx={{ width: "50%" }}>
            <Typography variant="body1">
              <LoadingSkeleton
                condition={isLoadingGeneralSystemStatus}
                item={systemGeneralStatus["boot-version"]}
                variant="text"
              />
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardSysInfo;
