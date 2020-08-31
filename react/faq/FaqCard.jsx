import React from "react";
import PropTypes from "prop-types";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "./Faq.css";

const FaqCard = props => {
  const handleClickEdit = () => {
    props.handleEdit(props.faq);
  };

  const handleClickDelete = () => {
    props.handleDelete(props.faq);
  };

  return (
    <React.Fragment>
      <div className="container mx-auto">
        <div className="b0 mb-2 card inner-card">
          <div className="card-header">
            <h4 className="card-title question">
              <a className="text-inherit">
                <span> Question: {props.faq.question}</span>
              </a>
            </h4>
          </div>
          <div className="card-body answer">
            <p>Answer: {props.faq.answer}</p>
            {props.role === "Admin" ? (
              <button
                type="button"
                className="mb-1 btn btn-faq btn-delete"
                onClick={handleClickDelete}
              >
                <FaTrashAlt />
              </button>
            ) : null}
            {props.role === "Admin" ? (
              <button
                type="button"
                className="mb-1 btn btn-faq btn-create"
                onClick={handleClickEdit}
              >
                <FaEdit />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

FaqCard.propTypes = {
  role: PropTypes.string,
  faq: PropTypes.shape({
    question: PropTypes.string.isRequired,
    answer: PropTypes.string.isRequired
  }),
  loggedIn: PropTypes.string,
  handleDelete: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired
};
export default React.memo(FaqCard);
