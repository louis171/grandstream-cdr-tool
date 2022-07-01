import React from "react";
import { GridToolbarContainer, GridToolbarExport } from "@mui/x-data-grid";

const CustomDataGridToolBar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarExport />
    </GridToolbarContainer>
  );
};

export default CustomDataGridToolBar;
