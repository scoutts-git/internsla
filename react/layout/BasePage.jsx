/* eslint react/forbid-prop-types: 0 */ // --> OFF
import React from "react";
import PropTypes from "prop-types";
import PublicNav from "../public/PublicNav";
import PublicFooter from "../public/PublicFooter";
import "./Base.css";

const BasePage = (props) => (
  <>
    <PublicNav currentUser={props.currentUser} history={props.history} />
    <section className="section-container landingTop main_wrapper">
      {props.children}
    </section>
    <PublicFooter />
  </>
);

BasePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }),
  children: PropTypes.object.isRequired,
  currentUser: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string),
  }),
};
export default BasePage;
