import React from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  Container,
  Button
} from "reactstrap";
import swal from "sweetalert";
import Moment from "react-moment";
import logger from "sabio-debug";
import "./JobsPublic.css";

const _logger = logger.extend("JobDetails");

const JobDetails = props => {
  var job = props.location.state;
  _logger("JobDetails");
  const isNotProvided = contactInfo =>
    contactInfo === "" ? "Not Provided" : contactInfo;

  const handleGoToLogin = () => {
    swal(
      "Would you like to log-in?",
      "To apply for this posting you need to be logged-in",
      "info",
      {
        buttons: ["Cancel", "Log-in"]
      }
    ).then(value => {
      if (value) {
        props.history.push("/");
      }
    });
  };

  return (
    <div className="job-page">
      <div className="watermarkJobs">
        <img
          className="path path1"
          alt="..."
          src="https://demos.creative-tim.com/blk-design-system-pro-react/static/media/path5.b9149b5f.png"
        />
        <img
          alt="..."
          className="path path2 "
          src="https://demos.creative-tim.com/blk-design-system-pro-react/static/media/path1.cca147bd.png"
        />
        <Container className="col-lg-9 col-sm-12 p-1 ml-auto mr-auto job_details">
          <Card className="m-3 shadowStyle publicCard">
            <span className="d-flex mt-5 ml-5 mr-5">
              <CardTitle className="lead job_title text-bold">
                <u>{job.title}</u>
              </CardTitle>
              <img
                className="showMoreCardImg ml-auto"
                src={job.organization.logo}
                alt={job.id}
              />
            </span>
            <CardBody>
              <CardText className="m-3">
                <strong>Company:</strong> {job.organization.orgName}
              </CardText>
              <CardText className="m-3">
                <strong>Job type:</strong> {job.jobType.name}
              </CardText>
              <CardText className="m-3">
                <strong>Location:</strong>{" "}
                {`${job.location.lineOne}, ${job.location.city} ${job.location.stateName} ${job.location.zip}`}
              </CardText>
              <CardText className="m-3">
                <strong>Description:</strong> {job.description}
              </CardText>
              <CardText className="m-3">
                <strong>Requirements:</strong> {job.requirements}
              </CardText>
              <CardText className="m-3">
                <strong>Is Active:</strong> {job.isActive.toString()}
              </CardText>
              <CardText className="m-3">
                <strong>Contact Person:</strong> {job.contactName}
              </CardText>
              <CardText className="m-3">
                <strong>Phone:</strong> {isNotProvided(job.contactPhone)}
              </CardText>
              <CardText className="m-3">
                <strong>E-mail:</strong> {isNotProvided(job.contactEmail)}
              </CardText>
              <div className="d-flex small text-muted m-3">
                <div className="mr-auto">
                  Date Posted:{" "}
                  <Moment format="MMMM DD, YYYY">{job.dateCreated}</Moment>
                </div>
                <div>
                  Date Modified:{" "}
                  <Moment format="MMMM DD, YYYY">{job.dateModified}</Moment>
                </div>
              </div>
            </CardBody>
            <div className="d-flex m-3">
              <Button
                className="mr-auto btn_purple"
                onClick={props.history.goBack}
                data-toggle="tooltip"
                data-placement="bottom"
                title="Back"
              >
                <i className="fas fa-arrow-left"></i>
              </Button>
              {!props.currentUser.isLoggedIn && (
                <Button className=" btn_purple" onClick={handleGoToLogin}>
                  Login To Apply!
                </Button>
              )}
            </div>
          </Card>
        </Container>
      </div>
    </div>
  );
};

JobDetails.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
    goBack: PropTypes.func
  }),
  currentUser: PropTypes.shape({
    roles: PropTypes.array,
    userName: PropTypes.string,
    email: PropTypes.string,
    isLoggedIn: PropTypes.bool
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      id: PropTypes.number,
      organization: PropTypes.shape({
        orgName: PropTypes.string,
        siteUrl: PropTypes.string,
        logo: PropTypes.string
      }),
      jobType: PropTypes.shape({
        name: PropTypes.string
      }),
      location: PropTypes.shape({
        lineOne: PropTypes.string,
        lineTwo: PropTypes.string,
        zip: PropTypes.string,
        stateName: PropTypes.string,
        city: PropTypes.string
      }),
      title: PropTypes.string,
      description: PropTypes.string,
      requirements: PropTypes.string,
      isActive: PropTypes.bool,
      contactName: PropTypes.string,
      contactPhone: PropTypes.string,
      contactEmail: PropTypes.string,
      dateCreated: PropTypes.string,
      dateModified: PropTypes.string
    })
  })
};
export default JobDetails;
