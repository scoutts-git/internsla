import React from "react";
import { withTranslation } from "react-i18next";
import "../Landing.css";

class About extends React.PureComponent {
  state = {};

  render() {
    return (
      <div className="about-page">
        <div className="watermark">
          <img
            className="path4"
            alt="..."
            src="https://demos.creative-tim.com/blk-design-system-pro-react/static/media/path3.e62d30e8.png"
          />
          <img
            alt="..."
            className="path path3"
            src="https://demos.creative-tim.com/blk-design-system-pro-react/static/media/path1.cca147bd.png"
          />
          <div
            className="container d-flex flex-column"
            style={{ minHeight: "105vh" }}
          >
            <div
              className="flexible-column-frame-foreground legacy-padding-enabled has-responsive-height"
              data-responsive-height="auto,auto,auto,auto,auto"
              style={{ height: "auto" }}
            >
              <div className="banner-content content-margin ">
                <div
                  className="banner-content-container banner-content-align-center manual-content-position from-2 to-23"
                  id="banner-content-container-banner_9f41bd94-f520-49e3-ab3f-c2da78f6fcc0"
                >
                  <p className="banner-headline_one headline-66">
                    {" "}
                    About iNTERNS.la{" "}
                  </p>
                  <p className="subheadline_about subheadline-21">
                    {" "}
                    Welcome to iNTERNS.la, one of the largest professional
                    networks that brings students and employers together in one
                    centralized location, providing services for students and
                    professionals alike to develop a foundation they will need
                    to jump their career and for employers to find their best
                    candidates.{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="banner parbase section">
              <div className="banner-content content-margin">
                <div
                  className="banner-content-container banner-content-align-center manual-content-position from-4 to-21"
                  id="banner-content-container-banner_96974f2a-6d39-4f2a-b8b2-4308b96cb8bc"
                >
                  <p className="banner-headline vision_headline headline-42">
                    {" "}
                    Vision{" "}
                  </p>
                  <p className="banner-subheadline subheadline-17">
                    {" "}
                    Create economic opportunity for every member of the global
                    workforce.
                    <br />{" "}
                  </p>
                </div>
              </div>
            </div>
            <div className="banner parbase section bottom-section">
              <p className="banner-headline headline-42"> Mission </p>
              <p className="banner-subheadline subheadline-17">
                {" "}
                The mission of iNTERNS.la is simple: connect the world’s
                professionals to strengthen their carreer and build a better
                future.
                <br />{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withTranslation("translations")(About);
