import React from "react";
import Skeleton from "@mui/material/Skeleton";

const LoadingSkeleton = ({ condition, item, variant }) => {
  return condition ? <Skeleton variant={variant} /> : item;
};

export default LoadingSkeleton;
