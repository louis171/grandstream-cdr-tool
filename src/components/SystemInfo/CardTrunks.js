import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import Skeleton from "@mui/material/Skeleton";

import LoadingSkeleton from "../LoadingSkeleton";

const CardTrunks = ({
  listVoipTrunk,
  listAnalogTrunk,
  isLoadingAnalogTrunk,
  isLoadingVoipTrunk,
}) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          <Grid item>
            <Typography color="primary.main" gutterBottom variant="h4">
              Trunks
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          <Grid sx={{ width: "100%" }} item>
            <Typography
              sx={{
                width: "100%",
                textAlign: "center",
                position: "relative",
                "&:after": {
                  content: '" Total"',
                  position: "absolute",
                  bottom: 5,
                  ml: ".4em",
                  fontSize: ".5em",
                  color: "primary.text",
                },
              }}
              variant="h4"
            >
              <LoadingSkeleton
                condition={isLoadingVoipTrunk && isLoadingAnalogTrunk}
                item={
                  Number(listVoipTrunk.total_item) +
                  Number(listAnalogTrunk.total_item)
                }
                variant="text"
              />
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: ".5em", mb: ".5em" }} />
        <Grid container spacing={2}>
          <Grid item sx={{ width: "25%" }}>
            <Typography
              sx={{ fontSize: ".8rem", color: "primary.main" }}
              variant="body2"
            >
              Trunk Name
            </Typography>
            {isLoadingVoipTrunk ? (
              <Skeleton variant="text" />
            ) : (
              listVoipTrunk.voip_trunk.map((trunk) => (
                <Typography key={trunk.trunk_index} sx={{ fontSize: ".8rem" }} variant="body2">
                  {trunk.trunk_name ? trunk.trunk_name : "-"}
                </Typography>
              ))
            )}
          </Grid>
          <Grid item sx={{ width: "25%" }}>
            <Typography
              sx={{ fontSize: ".8rem", color: "primary.main" }}
              variant="body2"
            >
              Username
            </Typography>
            {isLoadingVoipTrunk ? (
              <Skeleton variant="text" />
            ) : (
              listVoipTrunk.voip_trunk.map((trunk) => (
                <Typography sx={{ fontSize: ".8rem" }} variant="body2">
                  {trunk.username ? trunk.username : "-"}
                </Typography>
              ))
            )}
          </Grid>
          <Grid item sx={{ width: "25%" }}>
            <Typography
              sx={{ fontSize: ".8rem", color: "primary.main" }}
              variant="body2"
            >
              Host
            </Typography>
            {isLoadingVoipTrunk ? (
              <Skeleton variant="text" />
            ) : (
              listVoipTrunk.voip_trunk.map((trunk) => (
                <Typography sx={{ fontSize: ".8rem" }} variant="body2">
                  {trunk.host ? trunk.host : "-"}
                </Typography>
              ))
            )}
          </Grid>
          <Grid item sx={{ width: "25%" }}>
            <Typography
              sx={{ fontSize: ".8rem", color: "primary.main" }}
              variant="body2"
            >
              Type
            </Typography>
            {isLoadingVoipTrunk ? (
              <Skeleton variant="text" />
            ) : (
              listVoipTrunk.voip_trunk.map((trunk) => (
                <Typography sx={{ fontSize: ".8rem" }} variant="body2">
                  {trunk.trunk_type ? trunk.trunk_type : "-"}
                </Typography>
              ))
            )}
          </Grid>
        </Grid>
        <Divider sx={{ mt: ".5em", mb: ".5em" }} />
        <Grid container spacing={2}>
          <Grid item sx={{ width: "25%" }}>
            <Typography
              sx={{ fontSize: ".8rem", color: "primary.main" }}
              variant="body2"
            >
              Trunk Name
            </Typography>
            {isLoadingAnalogTrunk ? (
              <Skeleton variant="text" />
            ) : (
              listAnalogTrunk.analogtrunk.map((trunk) => (
                <Typography sx={{ fontSize: ".8rem" }} variant="body2">
                  {trunk.trunk_name ? trunk.trunk_name : "-"}
                </Typography>
              ))
            )}
          </Grid>
          <Grid item sx={{ width: "25%" }}>
            <Typography
              sx={{ fontSize: ".8rem", color: "primary.main" }}
              variant="body2"
            >
              Channels
            </Typography>
            {isLoadingAnalogTrunk ? (
              <Skeleton variant="text" />
            ) : (
              listAnalogTrunk.analogtrunk.map((trunk) => (
                <Typography sx={{ fontSize: ".8rem" }} variant="body2">
                  {trunk.chans ? trunk.chans : "-"}
                </Typography>
              ))
            )}
          </Grid>
          <Grid item sx={{ width: "25%" }}>
            <Typography
              sx={{ fontSize: ".8rem", color: "primary.main" }}
              variant="body2"
            >
              Out of service
            </Typography>
            {isLoadingAnalogTrunk ? (
              <Skeleton variant="text" />
            ) : (
              listAnalogTrunk.analogtrunk.map((trunk) => (
                <Typography sx={{ fontSize: ".8rem" }} variant="body2">
                  {trunk.out_of_service ? trunk.out_of_service : "-"}
                </Typography>
              ))
            )}
          </Grid>
          <Grid item sx={{ width: "25%" }}>
            <Typography
              sx={{ fontSize: ".8rem", color: "primary.main" }}
              variant="body2"
            >
              Mode
            </Typography>
            {isLoadingAnalogTrunk ? (
              <Skeleton variant="text" />
            ) : (
              listAnalogTrunk.analogtrunk.map((trunk) => (
                <Typography sx={{ fontSize: ".8rem" }} variant="body2">
                  {trunk.trunkmode ? trunk.trunkmode : "-"}
                </Typography>
              ))
            )}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default CardTrunks;
