import React, { Fragment } from "react";
import Lottie from "react-lottie";
import ComingSoon from "../../animations/ComingSoon.json";
import UnderDev from "../../animations/UnderDev.json";
import "./discussion.css"
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useEffect } from "react";

const Discussion = () => {
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

  const navigate = useNavigate();

  useEffect(() => {
    const authToken = Cookies.get("authToken");
    if (!authToken) {
      navigate("/");
  }
  })
  
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

export default Discussion;
