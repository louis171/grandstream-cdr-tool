import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Skeleton from "@mui/material/Skeleton";

const rows = [1, 2, 3, 4, 5];

const PlaceholderTable = () => {
  return (
    <TableContainer>
      <Table size="small" aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </TableCell>
            <TableCell>
              <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((item) => (
            <TableRow
              key={item}
              sx={{
                "&:last-child td, &:last-child th": {
                  border: 0,
                },
              }}
            >
              <TableCell>
                <Skeleton variant="text" sx={{ fontSize: "0.7rem" }} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" sx={{ fontSize: "0.7rem" }} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" sx={{ fontSize: "0.7rem" }} />
              </TableCell>
              <TableCell>
                <Skeleton variant="text" sx={{ fontSize: "0.7rem" }} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PlaceholderTable;
