import React from "react";
import Grid from "@mui/material/Grid";
import { DataGrid } from "@mui/x-data-grid";
import CustomDataGridToolBar from "./CustomDataGridToolBar";
import { columns } from "../config/dataGridConfig";

import { darken, lighten } from "@mui/material/styles";

import { guidGenerator } from "../functions/functions";

const CDRDataGrid = (props) => {
  const { filteredGsCdrApi, isLoading } = props;

  const getBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.6) : lighten(color, 0.6);

  const getHoverBackgroundColor = (color, mode) =>
    mode === "dark" ? darken(color, 0.5) : lighten(color, 0.5);

  return (
    <Grid container spacing={2} sx={{ mt: ".5em" }}>
      <Grid item xs={12} md={12} lg={12}>
        <div style={{ height: 450, width: "100%" }}>
          <div style={{ display: "flex", height: "100%" }}>
            <div style={{ flexGrow: 1 }}>
              <DataGrid
                rows={filteredGsCdrApi}
                columns={columns}
                getRowId={() => guidGenerator()}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection={false}
                disableSelectionOnClick
                components={{ Toolbar: CustomDataGridToolBar }}
                getRowClassName={(params) =>
                  params.row.disposition === undefined ||
                  params.row.disposition === ""
                    ? "super-app-theme--unknown"
                    : `super-app-theme--${params.row.disposition
                        .toLowerCase()
                        .replace(" ", "_")}`
                }
                sx={{
                  "& .super-app-theme--answered": {
                    bgcolor: (theme) =>
                      getBackgroundColor(
                        theme.palette.success.main,
                        theme.palette.mode
                      ),
                    "&:hover": {
                      bgcolor: (theme) =>
                        getHoverBackgroundColor(
                          theme.palette.success.main,
                          theme.palette.mode
                        ),
                    },
                  },
                  "& .super-app-theme--failed": {
                    bgcolor: (theme) =>
                      getBackgroundColor(
                        theme.palette.error.main,
                        theme.palette.mode
                      ),
                    "&:hover": {
                      bgcolor: (theme) =>
                        getHoverBackgroundColor(
                          theme.palette.error.main,
                          theme.palette.mode
                        ),
                    },
                  },
                  "& .super-app-theme--no_answer": {
                    bgcolor: (theme) =>
                      getBackgroundColor(
                        theme.palette.warning.main,
                        theme.palette.mode
                      ),
                    "&:hover": {
                      bgcolor: (theme) =>
                        getHoverBackgroundColor(
                          theme.palette.warning.main,
                          theme.palette.mode
                        ),
                    },
                  },
                  "& .super-app-theme--busy": {
                    bgcolor: (theme) =>
                      getBackgroundColor(
                        theme.palette.error.main,
                        theme.palette.mode
                      ),
                    "&:hover": {
                      bgcolor: (theme) =>
                        getHoverBackgroundColor(
                          theme.palette.error.main,
                          theme.palette.mode
                        ),
                    },
                  },
                  "& .super-app-theme--unknown": {
                    bgcolor: (theme) =>
                      getBackgroundColor(
                        theme.palette.secondary.main,
                        theme.palette.mode
                      ),
                    "&:hover": {
                      bgcolor: (theme) =>
                        getHoverBackgroundColor(
                          theme.palette.secondary.main,
                          theme.palette.mode
                        ),
                    },
                  },
                }}
              />
            </div>
          </div>
        </div>
      </Grid>
    </Grid>
  );
};

export default CDRDataGrid;
