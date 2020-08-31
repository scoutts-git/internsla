import React from "react";
import PropTypes from "prop-types";
import { Collapse, CardBody, Card } from "reactstrap";
import "./Faq.css";

const FaqCategoryCard = props => {
  const toggleCat = () => {
    props.handleToggle(props.cat.id);
  };

  return (
    <React.Fragment>
      <div className="mx-auto col-sm-7">
        <div className="cat-card rounded">
          <h5 className="cat-text faqMainText" onClick={toggleCat}>
            {props.cat.name}
            <span className="float-right">
              {props.cat.isOpen ? (
                <i className="fas fa-angle-double-down"></i>
              ) : (
                  <i className="fas fa-angle-double-left"></i>
                )}
            </span>
          </h5>
          <Collapse isOpen={props.cat.isOpen}>
            <Card className="qna-card">
              <CardBody>{props.cat.faqs}</CardBody>
            </Card>
          </Collapse>
        </div>
      </div>
    </React.Fragment>
  );
};

FaqCategoryCard.propTypes = {
  cat: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    faqs: PropTypes.arrayOf(PropTypes.element),
    isOpen: PropTypes.bool.isRequired
  }),
  handleToggle: PropTypes.func.isRequired
};

export default FaqCategoryCard;
