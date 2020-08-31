import React, { Component } from "react";
import * as faqService from "../../services/faqService";
import { faqValidationSchema } from "./ValidationSchema";
import { Formik, Field } from "formik";
import { Form, FormGroup } from "reactstrap";
import PropTypes from "prop-types";
import Select from "react-select";
import Logger from "sabio-debug";
import "./Faq.css";

const _logger = Logger.extend("FaqForm");

class FaqForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formData: {
        question: "",
        answer: "",
        categoryId: "",
        sortOrder: 1,
      },
      categories: [],
      initialValues: {},
    };
  }

  componentDidMount() {
    this.getAllCategories();
    const { id } = this.props.match.params;
    if (id) {
      const { state } = this.props.location;
      if (state) {
        this.setFormData(state);
      } else {
        faqService
          .getById(id)
          .then((response) => {
            this.setFormData(response.item);
          })
          .catch(this.getByIdError);
      }
    }
  }

  setFormData = (data) => {
    this.setState((prevState) => {
      return {
        ...prevState,
        formData: {
          ...prevState.formData,
          ...data,
        },
      };
    });
  };

  getByIdSuccess = (response, state) => {
    this.setFormData(state);
  };

  getByIdError = () => {
    _logger("getById Error");
  };

  handleSubmit = (values) => {
    if (this.props.match.params && this.props.match.params.id) {
      faqService
        .update(this.props.match.params.id, values)
        .then(this.editSuccess)
        .catch(this.editError);
    } else {
      faqService.add(values).then(this.addSuccess).catch(this.addError);
    }
  };

  editSuccess = () => {
    this.props.history.push("/admin/faq");
  };

  editError = () => {
    _logger("Edit Error");
  };

  addSuccess = () => {
    this.props.history.push("/admin/faq");
  };

  addError = () => {
    _logger("Add Error");
  };

  getAllCategories = () => {
    faqService
      .getCategories()
      .then(this.getCategoriesSuccess)
      .catch(this.getCategoriesError);
  };

  getCategoriesSuccess = (response) => {
    let categories = response.items.map((item) => {
      return {
        value: item.id,
        label: item.name,
      };
    });

    this.setState((prevState) => {
      return {
        ...prevState,
        categories,
      };
    });
  };

  getCategoriesError = () => {
    _logger("Get Categories Error");
  };

  cancelClick = () => {
    this.props.history.push("/admin/faq");
  };

  render() {
    return (
      <React.Fragment>
        <div className="faq-page">
          <h1 className="text-center page-heading">FAQ Form</h1>
          <Formik
            enableReinitialize={true}
            validationSchema={faqValidationSchema}
            initialValues={this.state.formData}
            onSubmit={this.handleSubmit}
          >
            {(props) => {
              const {
                setFieldValue,
                values,
                touched,
                errors,
                handleSubmit,
                isValid,
                isSubmitting,
              } = props;
              return (
                <Form
                  className="faq-form mx-auto col-sm-7 shadow-lg"
                  onSubmit={handleSubmit}
                >
                  <FormGroup>
                    <div className="form-group fg pr-4 pl-4 row dashed">
                      <label className="colFormLabel">Question:</label>
                      <Field
                        name="question"
                        type="text"
                        values={values.question}
                        placeholder="Question"
                        className={
                          errors.question && touched.question
                            ? "form-control error"
                            : "form-control"
                        }
                      />
                      {errors.question && touched.question && (
                        <span className="input-feedback text-danger">
                          {errors.question}
                        </span>
                      )}
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="form-group fg pr-4 pl-4 row dashed">
                      <label className="colFormLabel">Answer:</label>
                      <Field
                        name="answer"
                        type="text"
                        placeholder="Answer"
                        values={values.answer}
                        className={
                          errors.answer && touched.answer
                            ? "form-control error"
                            : "form-control"
                        }
                      />
                      {errors.answer && touched.answer && (
                        <span className="input-feedback text-danger">
                          {errors.answer}
                        </span>
                      )}
                    </div>
                  </FormGroup>
                  <FormGroup>
                    <div className="form-group fg pr-3 pl-3 row dashed">
                      <label className="colFormLabel">Select Category:</label>
                      <Select
                        value={this.state.categories.find(
                          (option) => option.value === values.categoryId
                        )}
                        type="text"
                        placeholder="Category"
                        className={
                          errors.categoryId && touched.categoryId
                            ? "error col-12"
                            : "col-12"
                        }
                        options={this.state.categories}
                        onChange={(val) =>
                          setFieldValue("categoryId", val.value)
                        }
                      />
                      {errors.categoryId && touched.categoryId && (
                        <span className="input-feedback text-danger">
                          {errors.categoryId}
                        </span>
                      )}
                    </div>
                  </FormGroup>
                  <button
                    type="submit"
                    className="btn btn-warning mr-auto"
                    onClick={this.cancelClick}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isValid || isSubmitting}
                  >
                    Submit
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </React.Fragment>
    );
  }
}
FaqForm.propTypes = {
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
export default FaqForm;
