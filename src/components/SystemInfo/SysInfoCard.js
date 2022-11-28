import React from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import PlaceholderTable from "./PlaceholderTable";
import GetRequestModal from "../GetRequestModal";

import PropTypes from "prop-types";
import OutboundRouteModal from "../OutboundRouteModal";

const SysInfoCard = ({
  data,
  isLoading,
  title,
  tableHeadings,
  tableRows,
  getSpecificData,
  indexKey,
  searchQuery,
}) => {
  return (
    <Card>
      <CardContent>
        <Grid container spacing={3} sx={{ justifyContent: "center" }}>
          <Grid item>
            <Typography color="primary.main" gutterBottom variant="h4">
              {title}
            </Typography>
          </Grid>
        </Grid>
        <Divider sx={{ mt: ".5em", mb: ".5em" }} />
        {isLoading ? (
          <PlaceholderTable />
        ) : (
          <TableContainer>
            <Table size="small" aria-label="simple table">
              <TableHead>
                <TableRow>
                  {tableHeadings.map((heading) => (
                    <TableCell key={heading.key} sx={{ fontSize: ".8rem" }}>
                      {heading.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {data.map((row) => (
                  <TableRow
                    key={row.tmp}
                    sx={{
                      "&:last-child td, &:last-child th": {
                        border: 0,
                      },
                    }}
                  >
                    {tableRows.map((rowMapping) => (
                      <TableCell
                        key={rowMapping.value}
                        sx={{ fontSize: ".7rem" }}
                      >
                        {row[rowMapping.value] === ""
                          ? "-"
                          : row[rowMapping.value]}
                      </TableCell>
                    ))}
                    <TableCell>
                      {/* <GetRequestModal
                        onClickFunc={() =>
                          getSpecificData(row[indexKey], searchQuery)
                        }
                      /> */}
                      <OutboundRouteModal
                        onClickFunc={() =>
                          getSpecificData(row[indexKey], searchQuery)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </CardContent>
    </Card>
  );
};

SysInfoCard.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool,
  title: PropTypes.string,
  tableHeadings: PropTypes.array,
  tableRows: PropTypes.array,
  getSpecificData: PropTypes.func,
  indexKey: PropTypes.string,
  searchQuery: PropTypes.string,
};

export default SysInfoCard;
