import React from "react";
import "./Landing.css";

const PublicFooter = () => {
  return (
    <React.Fragment>
      <div className="footer">
        <div className="iLfooter">
          <footer className="font-small blue-grey">
            <div className="container text-center text-md-left mt-5 offset-md-2">
              <div className="row mt-3 dark-grey-text">
                <div className="col-md-3">
                  <a className="link footerLink" href="/">
                    <h1 className="title">iNTERNS.la</h1>
                  </a>
                </div>
                <div className="col-md-4 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h4 className="title">Get to Know Us</h4>
                  <hr
                    className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60 }}
                  />
                  <p>
                    <a className="link footerLink" href="/jobs">
                      Jobs
                    </a>
                  </p>
                  <p>
                    <a className="link footerLink" href="/articles">
                      Blogs
                    </a>
                  </p>{" "}
                  <p>
                    <a className="link footerLink" href="/about">
                      About
                    </a>
                  </p>
                </div>
                <div className="col-md-4 col-lg-2 col-xl-2 mx-auto mb-4">
                  <h4 className="title">Let Us Help You</h4>
                  <hr
                    className="teal accent-3 mb-4 mt-0 d-inline-block mx-auto"
                    style={{ width: 60 }}
                  />
                  <p>
                    <a className="link footerLink" href="/faq">
                      FAQ
                    </a>
                  </p>{" "}
                  <p>
                    <a className="link footerLink" href="/contact-us">
                      Contact Us
                    </a>
                  </p>
                </div>
                <div className="col-md-3 icons">
                  <h3 className="title">Follow us:</h3>
                  <div className="btn-wrapper profile text-left">
                    {/* <a className="in-ic" href="https://www.instagram.com">
                      <i className="fab footerLink fa-instagram white-text mr-4">
                        {" "}
                      </i>
                    </a> */}

                    <a
                      className="fb-ic "
                      href="https://www.facebook.com/InternsLA-115012540250844"
                    >
                      <i className="fab footerLink fa-facebook-f white-text mr-4">
                        {" "}
                      </i>
                    </a>
                    {/* <a className="tw-ic" href="https://www.twitter.com">
                      <i className="fab footerLink fa-twitter white-text mr-4">
                        {" "}
                      </i>
                    </a> */}
                    <a
                      className="li-ic"
                      href="https://www.linkedin.com/company/interns-la/"
                    >
                      <i className="fab footerLink fa-linkedin-in white-text mr-4"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </React.Fragment>
  );
};
export default PublicFooter;
