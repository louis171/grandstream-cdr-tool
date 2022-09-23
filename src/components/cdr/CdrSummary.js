import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Skeleton } from "@mui/material";

import PictureAsPdfRoundedIcon from "@mui/icons-material/PictureAsPdfRounded";

import { secondsToHHMMSS } from "../../functions/functions";
import requestOptionsUtil from "../../util/RequestOptionsUtil";

const CdrSummary = ({
  filteredGsCdrApi,
  createPdf,
  userExtGroup,
  userCaller,
  userCallee,
  userAnsweredBy,
}) => {
  return (
    <Grid container spacing={2} sx={{ marginY: (theme) => theme.spacing(2) }}>
      <Grid item xs={12} sm={12} md={12} lg={6}>
        <Card sx={{ height: "100%" }}>
          <CardContent>
            <Grid container spacing={3} sx={{ justifyContent: "center" }}>
              <Grid sx={{ width: "100%" }} item>
                <Typography
                  sx={{ width: "100%", textAlign: "center" }}
                  color="primary.main"
                  gutterBottom
                  variant="h5"
                >
                  CDR Summary
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: "start" }}>
              <Grid item sx={{ width: "50%" }}>
                <Typography variant="body1">Caller</Typography>
              </Grid>
              <Grid item sx={{ width: "50%" }}>
                <Typography variant="body1">
                  {requestOptionsUtil.userCallerCreate(
                    userExtGroup,
                    userCaller,
                    true
                  )}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: "start" }}>
              <Grid item sx={{ width: "50%" }}>
                <Typography variant="body1">Callee</Typography>
              </Grid>
              <Grid item sx={{ width: "50%" }}>
                <Typography variant="body1">
                  {requestOptionsUtil.userCalleeCreate(userCallee, true)}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: "start" }}>
              <Grid item sx={{ width: "50%" }}>
                <Typography variant="body1">Answered By</Typography>
              </Grid>
              <Grid item sx={{ width: "50%" }}>
                <Typography variant="body1">
                  {requestOptionsUtil.userAnsweredByCreate(
                    userAnsweredBy,
                    true
                  )}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: "start" }}>
              <Grid item sx={{ width: "50%" }}>
                <Typography variant="body1">Total calls</Typography>
              </Grid>
              <Grid item sx={{ width: "50%" }}>
                <Typography variant="body1">
                  {filteredGsCdrApi.length > 0 ? (
                    filteredGsCdrApi.length
                  ) : (
                    <Skeleton variant="text" />
                  )}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: "start" }}>
              <Grid item sx={{ width: "50%" }}>
                <Typography variant="body1">Total Duration</Typography>
              </Grid>
              <Grid item sx={{ width: "50%" }}>
                <Typography variant="body1">
                  {filteredGsCdrApi.length > 0 ? (
                    secondsToHHMMSS(
                      filteredGsCdrApi.reduce(
                        (partialSum, a) => partialSum + Number(a.duration),
                        0
                      )
                    )
                  ) : (
                    <Skeleton variant="text" />
                  )}
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2} sx={{ justifyContent: "start" }}>
              <Grid item sx={{ width: "50%" }}>
                <Typography variant="body1">Billable Duration</Typography>
              </Grid>
              <Grid item sx={{ width: "50%" }}>
                <Typography variant="body1">
                  {filteredGsCdrApi.length > 0 ? (
                    secondsToHHMMSS(
                      filteredGsCdrApi.reduce(
                        (partialSum, a) => partialSum + Number(a.billsec),
                        0
                      )
                    )
                  ) : (
                    <Skeleton variant="text" />
                  )}
                </Typography>
              </Grid>
            </Grid>
            <Grid
              container
              spacing={2}
              sx={{ justifyContent: "center", mt: "1em" }}
            >
              <Grid item>
                <Button variant="contained" type="button" onClick={createPdf}>
                  <PictureAsPdfRoundedIcon />
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default CdrSummary;
