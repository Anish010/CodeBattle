import React, { Fragment } from "react";
import { Stack } from "@mui/material";
import Lottie from "react-lottie";
import Loading from "../../animations/Loading.json";

const LoadingSkeleton = () => {
   const LoadingLottie = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const numberOfSkeletons = 6; // Adjust the number of skeletons as needed
  const skeletons = [];

  for (let i = 0; i < numberOfSkeletons; i++) {
    skeletons.push(
      // <Skeleton key={i} animation="wave" variant="rectangular" height={50} />
      <div style={{ backgroundColor:"#f5f4f4", marginBottom : "1px" }}>
       <Lottie
          style={{ display: "inline-block", verticalAlign: "middle"}}
          options={LoadingLottie}
          height={60}
          width={90}
        />
        </div>
    );
  }

  return (
    <Fragment>
      <Stack spacing={1} >{skeletons}</Stack>
    </Fragment>
  );
};

export default LoadingSkeleton;
