import React from "react";
import { withTranslation } from "react-i18next";
import ContactUsForm from "./ContactUsForm";
import "./ContactUs.css";

class ContactUs extends React.PureComponent {
  state = {};

  render() {
    return (
      <div>
        <div id="la-image" className="contactUs-page">
          <div className="watermarkContact">
            <img
              className="Cpath"
              alt="..."
              src="https://demos.creative-tim.com/blk-design-system-pro-react/static/media/path3.e62d30e8.png"
            />
            <img
              alt="..."
              className="Cpath path1"
              src="https://demos.creative-tim.com/blk-design-system-pro-react/static/media/path1.cca147bd.png"
            />
            <div
              className="container df d-flex flex-column"
              style={{ minHeight: "105vh" }}
            >
              <div className="contactUs-ph page-header header-filter contactus-3">
                <div
                  className="page-header-image"
                  style={{
                    backgroundImage:
                      'url("/blk-design-system-pro-react/static/media/andre-benz.a9d57c8e.jpg")',
                  }}
                />
                <div className="container cont-contactUs contact-page">
                  <div className="row">
                    <div className="text-center col-md-12">
                      <h1 className="title">Got a question? </h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className="infoz mb-5 row text-center">
                <div className="col-lg-3">
                  <div className="info info-hover">
                    <i className="fas fa-map-marker-alt fas1 fa-3x"></i>
                    <h4 className="infoz-title">Address</h4>
                    <p className="description">Downtown LA, LA 90012, US</p>
                  </div>
                </div>
                <div className="backImage">
                  <img
                    alt="..."
                    className="contactPath"
                    src="/blk-design-system-pro-react/static/media/path1.cca147bd.png"
                  />
                </div>
                <div className="col-lg-3">
                  <div className="info info-hover">
                    <i className="fas fa-envelope fas1 fa-3x"></i>
                    <h4 className="infoz-title">Email</h4>
                    <p className="description">support@youremail.com</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="info info-hover">
                    <i className="fas fa-mobile-alt fas1 fa-3x"></i>
                    <h4 className="infoz-title">Phone Number</h4>
                    <p className="description">+1(424) 535 3523</p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <div className="info info-hover">
                    <div className="icon icon-success">
                      <i className="fas fa-user fas1 fa-3x"></i>
                    </div>
                    <h4 className="infoz-title">Contact</h4>
                    <p className="description">John Doe</p>
                  </div>
                </div>
              </div>
              <div className="mx mb-4 row contactForm-title">
                <div className="ml-auto mr-auto text-center mx col-md-8">
                  <h1 className="title">Contact Us</h1>
                  <h4 className="desc">
                    Whether you have questions or you would just like to say
                    hello.
                  </h4>
                </div>
              </div>
              <ContactUsForm />
              <div className="mt-5 mx mb-4 pt-5 row contactForm-title">
                <div className="ml-auto mr-auto text-center mt-5 mx col-md-8">
                  <h4 className="desc">
                    Have you visited our FAQ page?{" "}
                    <a className="signUp" href="/faq">
                      Click Here
                    </a>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withTranslation("translations")(ContactUs);
