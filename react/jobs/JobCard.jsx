import React from "react";
import { Card, CardTitle, CardBody, CardText, Container } from "reactstrap";
import PropTypes from "prop-types";
import { FaInfoCircle } from "react-icons/fa";
import Moment from "react-moment";
import "./JobsPublic.css";

const JobCard = props => {
  const showDetails = () => props.handleDetails(props.jobData);
  const goToLogin = () => props.handleGoToLogin(props.jobData);

  return (
    <Container className="p-1 job_card">
      <Card className="cardStyle shadowStyle publicCard">
        <CardTitle className="text-center pt-4  lead text-bold">
          <u>{props.jobData.title}</u>
        </CardTitle>
        <img
          alt="logo"
          className="cardImg mt-1 mb-1"
          src={props.jobData.organization.logo}
        />
        <CardBody>
          <CardText className="m-1 p-0">
            <strong>Organization:</strong> {props.jobData.organization.orgName}
          </CardText>
          <CardText className="m-1 p-0">
            <strong>Location:</strong>{" "}
            {`${props.jobData.location.city}, ${props.jobData.location.stateName} ${props.jobData.location.zip}`}
          </CardText>
          <CardText className="m-1 p-0">
            <strong>Date Posted:</strong>{" "}
            <Moment format="MMMM DD, YYYY">{props.jobData.dateCreated}</Moment>
          </CardText>
        </CardBody>
        <div className="d-flex">
          <button
            type="button"
            className="mr-auto btn btn-job btn-details"
            data-toggle="tooltip"
            data-placement="bottom"
            title="More Details"
            onClick={showDetails}
          >
            <FaInfoCircle />
          </button>
          {!props.currentUser.isLoggedIn ? (
            <button
              type="button"
              className="btn btn_purple m-1 font-weight-bold"
              onClick={goToLogin}
            >
              {" "}
              {"Login To Apply!"}
            </button>
          ) : null}
        </div>
      </Card>
    </Container>
  );
};

JobCard.propTypes = {
  hasApplied: PropTypes.arrayOf(PropTypes.number),
  jobData: PropTypes.shape({
    id: PropTypes.number.isRequired,
    organization: PropTypes.shape({
      orgName: PropTypes.string.isRequired,
      siteUrl: PropTypes.string.isRequired,
      logo: PropTypes.string.isRequired
    }),
    location: PropTypes.shape({
      zip: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      stateName: PropTypes.string.isRequired
    }),
    title: PropTypes.string.isRequired,
    dateCreated: PropTypes.string.isRequired,
    dateModified: PropTypes.string.isRequired
  }),
  currentUser: PropTypes.shape({
    roles: PropTypes.array,
    userName: PropTypes.string,
    email: PropTypes.string,
    isLoggedIn: PropTypes.bool
  }),
  handleDetails: PropTypes.func,
  handleDelete: PropTypes.func,
  handleEdit: PropTypes.func,
  handleQuickApply: PropTypes.func,
  handleGoToLogin: PropTypes.func,
  handleApply: PropTypes.func,
  isApplying: PropTypes.shape({
    jobPostId: PropTypes.number
  })
};

export default JobCard;
