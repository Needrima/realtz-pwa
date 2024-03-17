import React, { useContext } from "react";
import "./Screen1.scss";
import { LoginContext } from "../../../pages/Login/Login";
import image1 from "../../../assets/images/login1.png";
import image2 from "../../../assets/images/login2.png";
import image3 from "../../../assets/images/login3.png";
import image4 from "../../../assets/images/login4.png";
import facebookIcon from "../../../assets/icons/facebook.svg";
import googleIcon from "../../../assets/icons/google.svg";

const Screen1 = () => {
  const { changeScreen } = useContext(LoginContext);

  return (
    <>
      <div className="container ">
        <div className="row pb-2 g-0">
          <div className="col">
            <img src={image1} alt="" />
          </div>
          <div className="col">
            <img src={image2} alt="" />
          </div>
        </div>
        <div className="row g-0">
          <div className="col">
            <img src={image3} alt="" />
          </div>
          <div className="col">
            <img src={image4} alt="" />
          </div>
        </div>

        <h1 className="fw-bold mt-4">
          Ready to <span className="text-default">explore</span>
        </h1>

        <div className="w-">
          <button className="btn btn-block text-light bg-default fw-bold px-5 py-3 fs-4">
            Continue with Email
          </button>

          <div className="separator">OR</div>

          <div className="row">
            <button className="col-6 btn text-light bg-default fw-bold px-5 py-3 fs-4">
              <img alt="" src={facebookIcon} />
            </button>
            <button className="col-6 btn text-light bg-default fw-bold px-5 py-3 fs-4">
              <img alt="" src={googleIcon} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Screen1;
