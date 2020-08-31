import React from "react";
import PropTypes from "prop-types";
import { login, getCurrent } from "../../services/userService";
import { Formik, Form, Field } from "formik";
import { loginValidationSchema } from "./loginValidationSchema";
import JobSearchBar from "./LandingJobSearchBar";
import { FormGroup } from "reactstrap";
import swal from "sweetalert";
import logger from "sabio-debug";
import "./Landing.css";

const _logger = logger.extend("Landing");

class Landing extends React.PureComponent {
  state = {
    login: {
      email: "",
      password: "",
    },
    userDetails: {},
  };

  handleSubmit = (values) => {
    login(values).then(this.onLoginSuccess).catch(this.onLoginError);
  };

  onLoginSuccess = (res) => {
    const item = res.item;
    const userDetails = {
      id: item.id,
      role: item.roles[0].name,
      profile: item.createdProfile,
    };
    this.setState({ userDetails }, () => this.getCurrent());
  };
  getCurrent = () => {
    getCurrent().then(this.ongetCurrentSuccess).catch(this.ongetCurrentError);
  };
  ongetCurrentSuccess = (res) => {
    const currentUser = res.item;
    const details = this.state.userDetails;
    if (details.role === "Admin") {
      this.props.history.push("/admin/dashboard", {
        type: "login",
        currentUser,
      });
    } else {
      if (details.role === "Seeker") {
        if (details.profile) {
          this.props.history.push(`/seeker/dashboard`, {
            type: "login",
            currentUser: { ...currentUser, profile: details.profile },
          });
        } else {
          this.props.history.push(`/initialsetup`, {
            type: "login",
            currentUser: { ...currentUser, profile: details.profile },
          });
        }
      } else {
        if (details.role === "Organization") {
          if (details.profile) {
            this.props.history.push(`/organization/dashboard`, {
              type: "login",
              currentUser,
            });
          } else {
            this.props.history.push(`/orgSetup`, {
              type: "login",
              currentUser,
            });
          }
        } else {
          if (details.role === "OrgMembers") {
            this.props.history.push(`/organization/dashboard`, {
              type: "login",
              currentUser,
            });
          }
        }
      }
    }
  };

  ongetCurrentError = (res) => {
    _logger("res", res);
  };

  onLoginError = (err) => {
    let statusCode = String(err);
    statusCode = statusCode.substring(statusCode.length - 3);
    if (statusCode === "405") {
      const options = {
        title: "Login Error",
        text: "Email not found in our records",
        type: "warning",
        buttons: {
          close: {
            value: true,
            text: "Close",
            className: "bg-primary",
          },
        },
      };
      swal(options).then((value) => {
        if (value) {
          this.props.history.push("/");
        }
      });
    } else {
      if (statusCode === "404") {
        const options = {
          title: "Login Error",
          text: "The Email and Password do not match",
          type: "warning",
          buttons: {
            close: {
              value: true,
              text: "Close",
              className: "bg-primary",
            },
          },
        };
        swal(options).then((value) => {
          if (value) {
            this.props.history.push("/");
          }
        });
      } else {
        if (statusCode === "401") {
          const options = {
            title: "Login Error",
            text: "Please Confirm Your Email",
            type: "warning",
            buttons: {
              close: {
                value: true,
                text: "Close",
                className: "bg-primary",
              },
            },
          };
          swal(options).then((value) => {
            if (value) {
              this.props.history.push("/");
            }
          });
        } else {
          const options = {
            title: "Server Error",
            text: "Please try to login again later",
            type: "warning",
            buttons: {
              close: {
                value: true,
                text: "Close",
                className: "bg-primary",
              },
            },
          };
          swal(options).then((value) => {
            if (value) {
              this.props.history.push("/");
            }
          });
        }
      }
    }
  };

  searchJobs = (query) => {
    this.props.history.push("/jobs", { query });
  };

  render() {
    return (
      <div>
        <div className="la-background">
          <div className="watermark">
            <img
              className="path"
              alt="..."
              src="https://demos.creative-tim.com/blk-design-system-pro-react/static/media/path4.43994fd6.png"
            />
            <img
              alt="..."
              className="path path1"
              src="https://demos.creative-tim.com/blk-design-system-pro-react/static/media/path5.b9149b5f.png"
            />
            <div
              className="container d-flex flex-column"
              style={{ minHeight: "105vh" }}
            >
              <div className="row my-auto title-banner">
                <div className="col-lg-4 saying d-flex justify-content-center pb-5">
                  <h1
                    className="display-2 saying-h font-weight-normal mb-5 mt-1"
                    style={{ fontFamily: '"Montserrat", sans-serif' }}
                  >
                    The Best Place To Find Awesome Internship Opportunities in
                    the World !
                  </h1>
                  <JobSearchBar searchJobs={this.searchJobs} />
                </div>
                {this.props.currentUser.isLoggedIn === false ? (
                  <div className="container login col-8">
                    <div className="d-flex justify-content-center jcc h-100">
                      <div className="card landing_login">
                        <div className="card-header loginHeader">
                          <h3>Login</h3>
                          <div className="d-flex justify-content-end social_icon">
                            <span>
                              <div className="brand-logo float-left">
                                <img
                                  className="img loginLogo"
                                  src="https://sabio-training.s3-us-west-2.amazonaws.com/intern_ba3e54ba-37a8-4066-a9d3-a6aff778962fLOGO_iNTERNS_LA.png"
                                  alt="App Logo"
                                />
                              </div>
                            </span>
                          </div>
                        </div>
                        <div className="card-body loginFields">
                          <Formik
                            enableReinitialize={true}
                            validationSchema={loginValidationSchema}
                            initialValues={this.state.login}
                            onSubmit={this.handleSubmit}
                          >
                            {(props) => {
                              const {
                                values,
                                handleSubmit,
                                errors,
                                touched,
                              } = props;
                              return (
                                <Form onSubmit={handleSubmit}>
                                  <FormGroup>
                                    <div className="form-group">
                                      <label className="mr-2">Email</label>
                                      {errors.email && touched.email && (
                                        <span className="input-feedback text-danger">
                                          {errors.email}
                                        </span>
                                      )}
                                      <div className="input-group">
                                        <div className="input-group-prepend">
                                          <span className="input-group-text">
                                            <i className="fas fa-envelope"></i>
                                          </span>
                                        </div>
                                        <Field
                                          className={
                                            errors.email && touched.email
                                              ? "form-control error"
                                              : "form-control"
                                          }
                                          name="email"
                                          type="text"
                                          values={values.email}
                                          placeholder="Email"
                                          autoComplete="off"
                                        />
                                      </div>
                                    </div>
                                  </FormGroup>
                                  <FormGroup>
                                    <div className="form-group">
                                      <label className="mr-2">Password</label>
                                      {errors.password && touched.password && (
                                        <span className="input-feedback text-danger">
                                          {errors.password}
                                        </span>
                                      )}
                                      <div className="input-group">
                                        <div className="input-group-prepend">
                                          <span className="input-group-text">
                                            <i className="fas fa-key"></i>
                                          </span>
                                        </div>
                                        <Field
                                          name="password"
                                          type="password"
                                          values={values.password}
                                          placeholder="Password"
                                          autoComplete="off"
                                          className={
                                            errors.password && touched.password
                                              ? "form-control error"
                                              : "form-control"
                                          }
                                        />
                                      </div>
                                    </div>
                                  </FormGroup>
                                  <div>
                                    <div className="text-center">
                                      <button
                                        type="submit"
                                        className="btn float-right purple_btn loginForm_btn"
                                      >
                                        Login
                                      </button>
                                    </div>
                                  </div>
                                  <div className="card-footer">
                                    <div className="d-flex justify-content-center landingRegister links">
                                      No account?
                                      <a className="signUp" href="/register">
                                        Register
                                      </a>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                      <a
                                        className="signUp"
                                        href="/forgot-password"
                                      >
                                        Forgot your password?
                                      </a>
                                    </div>
                                  </div>
                                </Form>
                              );
                            }}
                          </Formik>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Landing;

Landing.propTypes = {
  currentUser: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string),
    isLoggedIn: PropTypes.bool,
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
};
