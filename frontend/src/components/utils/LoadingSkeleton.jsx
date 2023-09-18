import React, { Fragment } from "react";
import { Stack, Skeleton } from "@mui/material";

const LoadingSkeleton = () => {
  const numberOfSkeletons = 6; // Adjust the number of skeletons as needed
  const skeletons = [];

  for (let i = 0; i < numberOfSkeletons; i++) {
    skeletons.push(
      <Skeleton key={i} animation="wave" variant="rectangular" height={50} />
    );
  }

  return (
    <Fragment>
      <Stack spacing={1}>{skeletons}</Stack>
    </Fragment>
  );
};

export default LoadingSkeleton;
