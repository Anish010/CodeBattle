import React from 'react'
import Lottie from 'react-lottie';
import manCoding from '../../animations/man_coding.json';
import rocket from "../../animations/rocket.json"

const MainBody = () => {
    const manCodingLottie = {
        loop: true,
        autoplay: true,
        animationData: manCoding,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const rocketLottie = {
        loop: true,
        autoplay: true,
        animationData: rocket,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    return (
        <>
            <div className="main-body-container">
                <div className="text-container">
                    <div className="text-heading" >
                        <span style={{ display: 'inline-block', verticalAlign: 'middle' }}>
                            Learn.Code.Conquer
                            <Lottie
                                style={{ display: "inline-block", verticalAlign: "middle" }}
                                options={rocketLottie}
                                height={100}
                                width={100}
                            />
                        </span>
                    </div >

                    <div className="description">
                        <span style={{ fontSize: "22px", color: "#6c11a1c3", fontWeight: "800" }}>Learn<br /></span>
                        Acquire new knowledge, skills, and insights in the realm of coding and algorithms <br />
                        <br /><span style={{ fontSize: "22px", color: "#6c11a1c3", fontWeight: "800" }}>Code</span><br /> Engage in hands-on practice and implementation of programming concepts, fostering a deeper understanding of coding principles and algorithms.<br />
                        <br /><span style={{ fontSize: "22px", color: "#6c11a1c3", fontWeight: "800" }}>Conquer</span><br />Overcome challenges, enhance problem-solving abilities, and master complex algorithms to excel in your coding journey.
                    </div>
                </div>
                <div className="lottie-container">
                    <Lottie
                        options={manCodingLottie}
                        height={400}
                        width={400}
                    />
                </div>
            </div>
        </>
    )
}

export default MainBody