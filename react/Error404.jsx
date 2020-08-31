import React from "react";
import { Link } from "react-router-dom";
import "./Error404.css"
import PropTypes from "prop-types";

const Error404 = (props) => {
    return (
        <div className="Error404">
            <div className="text-center Error404Text">
                <div className="display-2">404</div>
                <h1  >Page not found</h1>
                <h4 >The page you are looking for does not exist.</h4>
                <div className='text-center'>
                    {props.currentUser ? null : <Link className="Error404Links" to="/">Log-in</Link>}
                </div>
            </div>
        </div>
    )

}
Error404.propTypes = {
    currentUser: PropTypes.shape({
        roles: PropTypes.array,
        userName: PropTypes.string,
        email: PropTypes.string,
        isLoggedIn: PropTypes.bool
    }),
};
export default Error404;