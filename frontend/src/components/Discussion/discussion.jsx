import React, { Fragment } from "react";
import Lottie from "react-lottie";
import ComingSoon from "../../animations/ComingSoon.json";
import UnderDev from "../../animations/UnderDev.json";
import "./discussion.css"

const discussion = () => {
  const ComingSoonLottie = {
    loop: true,
    autoplay: true,
    animationData: ComingSoon,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const UnderDevLottie = {
    loop: true,
    autoplay: true,
    animationData: UnderDev,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <Fragment>
      <div className="discussion">
        <Lottie
          style={{  position : "relative", left : "0" }}
          options={ComingSoonLottie}
          height={450}
          width={450}
        />
        <Lottie
          style={{ display: "inline-block", verticalAlign: "middle" }}
          options={UnderDevLottie}
          height={450}
          width={450}
        />
      </div>
    </Fragment>
  );
};

export default discussion;
