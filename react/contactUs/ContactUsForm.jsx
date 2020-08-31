import React, { Component } from "react";
import * as axContactUs from "../../services/contactUsService";
import { ContactUsValidationSchema } from "./ValidationSchema";
import { Formik, Field } from "formik";
import { Form, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import Logger from "sabio-debug";
import swal from "sweetalert";
import "./ContactUs.css";
import { withRouter } from "react-router-dom";

const _logger = Logger.extend("Contact");

class ContactUsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        email: "",
        message: "",
      },
      initialValues: {},
    };
  }

  componentDidMount() {}

  handleSubmit = (values, { resetForm }) => {
    _logger("Handle Submit", values);
    axContactUs
      .contactEmail(values)
      .then(this.emailedSuccess)
      .catch(this.emailedError)
      .then(() => resetForm(this.state.formData));
  };

  emailedSuccess = () => {
    _logger("Contact Email Success");
    swal(
      "Success!",
      "We recieved your message and will respond soon!",
      "success"
    );
    this.props.history.push("/");
  };

  emailedError = () => {
    _logger("Contact Email Error");
  };

  render() {
    return (
      <React.Fragment>
        <Formik
          enableReinitialize={true}
          validationSchema={ContactUsValidationSchema}
          initialValues={this.state.formData}
          onSubmit={this.handleSubmit}
        >
          {(props) => {
            const {
              values,
              touched,
              errors,
              handleSubmit,
              isValid,
              isSubmitting,
            } = props;
            return (
              <Form
                role="form"
                className="p-3 contactForm"
                onSubmit={handleSubmit}
              >
                <div className="row">
                  <div className="mx-auto col-md-10">
                    <div className="row">
                      <div className="col-sm-6">
                        <FormGroup>
                          <div className="contactForm-txt">
                            <label>First name </label>{" "}
                            {errors.firstName && touched.firstName && (
                              <span className="input-feedback text-danger">
                                {errors.firstName}
                              </span>
                            )}
                            <div className="input-group">
                              <div className="input-group-prepend">
                                <span className="input-group-text">
                                  <i className="fas fa-user"></i>
                                </span>
                              </div>
                              <Field
                                name="firstName"
                                type="text"
                                values={values.firstName}
                                placeholder="First name"
                                className={
                                  errors.firstName && touched.firstName
                                    ? "form-control error"
                                    : "form-control"
                                }
                              />
                            </div>
                          </div>
                        </FormGroup>
                      </div>
                      <div className="col-sm-6">
                        <FormGroup>
                          <div className="form-group">
                            <div className="contactForm-txt">
                              <label>Last name</label>{" "}
                              {errors.lastName && touched.lastName && (
                                <span className="input-feedback text-danger">
                                  {errors.lastName}
                                </span>
                              )}
                              <div className="input-group">
                                <div className="input-group-prepend">
                                  <span className="input-group-text">
                                    <i className="fas fa-user"></i>
                                  </span>
                                </div>
                                <Field
                                  name="lastName"
                                  type="text"
                                  values={values.lastName}
                                  placeholder="Last name"
                                  className={
                                    errors.lastName && touched.lastName
                                      ? "form-control error"
                                      : "form-control"
                                  }
                                />
                              </div>
                            </div>
                          </div>
                        </FormGroup>
                      </div>
                    </div>
                    <FormGroup>
                      <div className="form-group">
                        <div className="contactForm-txt">
                          <label>Email</label>{" "}
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
                              name="email"
                              type="text"
                              values={values.email}
                              placeholder="Email"
                              className={
                                errors.email && touched.email
                                  ? "form-control error"
                                  : "form-control"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </FormGroup>
                    <FormGroup>
                      <div className="form-group">
                        <div className="contactForm-txt">
                          <label>Your Message</label>{" "}
                          {errors.message && touched.message && (
                            <span className="input-feedback text-danger">
                              {errors.message}
                            </span>
                          )}
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <span className="input-group-text">
                                <i className="fas fa-paper-plane"></i>
                              </span>
                            </div>
                            <Field
                              id="message"
                              name="message"
                              type="text-area"
                              rows="6"
                              values={values.message}
                              className={
                                errors.message && touched.message
                                  ? "form-control error"
                                  : "form-control"
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </FormGroup>
                    <button
                      type="submit"
                      className="btn-round pull-right btn btn-primary contactBtn"
                      disabled={!isValid || isSubmitting}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </Form>
            );
          }}
        </Formik>
      </React.Fragment>
    );
  }
}
ContactUsForm.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number,
    }),
  }),
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
};
export default withRouter(ContactUsForm);
