import React from "react";
import "./Loading.scss";
const Loading = () => {
  return (
    <React.Fragment>
      <div className="pg-loading-screen pg-loading">
        <div className="pg-loading-inner align-center">
          <div className="pg-loading-center-outer">
            <div className="pg-loading-center-middle">
              <h1 className="loading_text">Loading...</h1>
              <div className=" pg-loaded justify-content-center">
                <br />
                <img
                  className="loader_wave"
                  src="https://sabio-training.s3-us-west-2.amazonaws.com/intern_285a8d02-dbd8-4b6c-9172-84276d02f4bc716 (1).gif"
                  alt="wave"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Loading;
