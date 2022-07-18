import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import Skeleton from "@mui/material/Skeleton";

const CardInbound = ({ isLoadingInboundRoutes, listInboundRoutes }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          <Grid item>
            <Typography color="primary.main" gutterBottom variant="h4">
              Inbound Routes
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
              {isLoadingInboundRoutes ? (
                <Skeleton variant="text" />
              ) : (
                listInboundRoutes.length
              )}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: ".5em", mb: ".5em" }} />
        <Accordion
          sx={{
            mt: ".5rem",
            "&:before": { display: "none" },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="extensions-content"
            id="extensions-header"
          >
            <Typography>Inbound Routes</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: "center", m: 0, p: 0 }}>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: ".8rem" }}>Name</TableCell>
                    <TableCell sx={{ fontSize: ".8rem" }}>Pattern</TableCell>
                    <TableCell sx={{ fontSize: ".8rem" }}>
                      Destination
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listInboundRoutes.map((row) => (
                    <TableRow
                      key={row.tmp}
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell sx={{ fontSize: ".7rem" }}>
                        {row.inbound_rt_name === "" ? "-" : row.inbound_rt_name}
                      </TableCell>
                      <TableCell sx={{ fontSize: ".7rem" }}>
                        {row.did_pattern_match_list === ""
                          ? "N/A"
                          : row.did_pattern_match_list}
                      </TableCell>
                      <TableCell sx={{ fontSize: ".7rem" }}>
                        {row.destination_type === ""
                          ? "N/A"
                          : `${row.destination_type} - `}
                        {row.account}
                        {row.announcement}
                        {row.external_number}
                        {row.ivr}
                        {row.queue}
                        {row.ringgroup}
                        {row.vmgroup}
                        {row.voicemail}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CardInbound;
