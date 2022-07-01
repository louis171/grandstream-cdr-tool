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

const CardAccounts = ({ listAccounts, isLoadingAccounts }) => {
  return (
    <Card sx={{ height: "100%" }}>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          <Grid item>
            <Typography color="primary.main" gutterBottom variant="h4">
              Accounts
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
                  color: "rgba(0, 0, 0, 0.87)",
                },
              }}
              variant="h4"
            >
              {isLoadingAccounts ? (
                <Skeleton variant="text" />
              ) : (
                listAccounts.length
              )}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: ".5em", mb: ".5em" }} />
        <Grid container spacing={2} sx={{ justifyContent: "start" }}>
          <Grid item sx={{ width: "50%" }}>
            <Typography variant="body1">Active Extensions</Typography>
          </Grid>
          <Grid item sx={{ width: "50%" }}>
            <Typography variant="body1">
              {isLoadingAccounts ? (
                <Skeleton variant="text" />
              ) : (
                listAccounts.filter(
                  (x) =>
                    x.status === "Idle" ||
                    x.status === "InUse" ||
                    x.status === "Busy" ||
                    x.status === "Ringing"
                ).length
              )}
            </Typography>
          </Grid>
        </Grid>
        <Grid container spacing={2} sx={{ justifyContent: "start" }}>
          <Grid item sx={{ width: "50%" }}>
            <Typography variant="body1">Extension Range</Typography>
          </Grid>
          <Grid item sx={{ width: "50%" }}>
            <Typography variant="body1">
              {isLoadingAccounts ? (
                <Skeleton variant="text" />
              ) : (
                `
                  ${Number(listAccounts[0].extension)} -
                  ${Math.max(...listAccounts.map((o) => Number(o.extension)))}
                `
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
            <Typography>Extensions</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ textAlign: "center", m: 0, p: 0 }}>
            <TableContainer component={Paper}>
              <Table size="small" aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontSize: ".8rem" }}>Extension</TableCell>
                    <TableCell sx={{ fontSize: ".8rem" }}>Fullname</TableCell>
                    <TableCell sx={{ fontSize: ".8rem" }}>IP</TableCell>
                    <TableCell sx={{ fontSize: ".8rem" }}>Model</TableCell>
                    <TableCell sx={{ fontSize: ".8rem" }}>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {isLoadingAccounts ? (
                    <TableRow
                      sx={{
                        "&:last-child td, &:last-child th": {
                          border: 0,
                        },
                      }}
                    >
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                      <TableCell>
                        <Skeleton variant="text" />
                      </TableCell>
                    </TableRow>
                  ) : (
                    listAccounts.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": {
                            border: 0,
                          },
                        }}
                      >
                        <TableCell sx={{ fontSize: ".7rem" }}>
                          {row.extension}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".7rem" }}>
                          {row.fullname === "" ? "N/A" : row.fullname}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".7rem" }}>
                          {row.addr === "-" ? (
                            "N/A"
                          ) : (
                            <a
                              href={`https://${
                                row.addr.split(" ")[0].split(":")[0]
                              }`}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {row.addr.split(" ")[0].split(":")[0]}
                            </a>
                          )}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".7rem" }}>
                          {row.addr.replace(/[()]/g, "").split(" ")[1]}
                        </TableCell>
                        <TableCell sx={{ fontSize: ".7rem" }}>
                          {row.status}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
      </CardContent>
    </Card>
  );
};

export default CardAccounts;
