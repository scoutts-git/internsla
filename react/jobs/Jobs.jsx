import React from "react";
import logger from "sabio-debug";
import { Col, Row } from "reactstrap";
import JobCard from "./JobCard";
import Pagination from "rc-pagination";
import localeInfo from "rc-pagination/lib/locale/en_US";
import "rc-pagination/assets/index.css";
import PropTypes from "prop-types";
import swal from "sweetalert";
import Search from "../../utility/Search";
import * as jobsService from "../../../services/jobsService";
import "./JobsPublic.css";

const _logger = logger.extend("Jobs");

class Jobs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      jobsList: [],
      isSearching: false,
      search: "",
      hasApplied: [],
      pagination: {
        current: 1,
        totalCount: 0,
        pageSize: 6
      }
    };
  }

  componentDidMount() {
    const query = this.props.location.state
      ? this.props.location.state.query
      : "";
    if (query) {
      this.handleSearching(
        query,
        this.state.pagination.current,
        this.state.pagination.pageSize
      );
      this.setState({ search: query });
    } else {
      this.jobsGetAll(
        this.state.pagination.current - 1,
        this.state.pagination.pageSize
      );
    }
  }

  jobsGetAll = (pageIndex, pageSize) => {
    jobsService
      .paginate(pageIndex, pageSize)
      .then(this.jobsGetAllSuccess)
      .catch(this.jobsGetAllError);
  };

  jobsGetAllSuccess = response => {
    const jobs = response.item.pagedItems;
    const jobsList = jobs.map(this.mapJob);
    let pagination = {
      current: response.item.pageIndex + 1,
      totalCount: response.item.totalCount,
      pageSize: 6
    };

    this.setState(prevState => {
      return {
        ...prevState,
        jobs,
        jobsList,
        pagination
      };
    });
  };

  resetState = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        jobs: [],
        jobsList: [],
        pagination: {
          current: 1,
          totalCount: 0,
          pageSize: 6
        }
      };
    });
  };

  jobsGetAllError = () => {
    _logger("failed to load jobs");
    this.resetState();
  };

  handleDetails = job => {
    this.props.history.push(`/job/posting/${job.id}/details`, job);
  };

  handleGoToLogin = () => {
    swal(
      "Would you like to log-in?",
      "To apply for this posting you need to be logged-in",
      "info",
      {
        buttons: ["Cancel", "Log-in"]
      }
    ).then(value => {
      if (value) {
        this.props.history.push("/");
      }
    });
  };

  mapJob = job => (
    <Col className="col-xl-4 col-lg-6 col-md-12 col-12" key={job.id}>
      <JobCard
        currentUser={this.props.currentUser}
        jobData={job}
        handleGoToLogin={this.handleGoToLogin}
        handleDetails={this.handleDetails}
      />
    </Col>
  );

  handleSearch = e => {
    this.setState(prevState => {
      return { ...prevState, search: e };
    });
    const data = e;
    const page = this.state.pagination;
    this.handleSearching(data, page.current, page.pageSize);
  };

  handleSearching = (searchStr, pageIndex, pageSize) => {
    jobsService
      .search(searchStr, pageIndex - 1, pageSize)
      .then(this.searchSuccess)
      .catch(this.searchError);
  };

  searchSuccess = res => {
    this.jobsGetAllSuccess(res);
  };

  searchError = () => {
    _logger("search error is firing");
    this.resetState();
  };

  onNextPage = page => {
    if (this.state.search && this.state.search.length > 0) {
      this.handleSearching(
        this.state.search,
        page,
        this.state.pagination.pageSize
      );
    } else {
      this.setState(
        prevState => {
          return {
            ...prevState,
            pagination: {
              ...prevState.pagination,
              current: page - 1
            }
          };
        },
        () => this.jobsGetAll(page - 1, this.state.pagination.pageSize)
      );
    }
  };

  resetSearch = () => {
    this.setState({ search: "", isSearching: false }, () =>
      this.jobsGetAll(0, this.state.pagination.pageSize)
    );
  };

  render() {
    return (
      <React.Fragment>
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
          </div>
          <div className="container jobpage-heading">
            <div className="row">
              <div className="text-center col-md-12">
                <h1 className="title">Job Search</h1>
              </div>
            </div>
            <div className="row">
              {" "}
              <div></div>
              <div className="col-md-3 ml-auto">
                <Search
                  getAllPaginated={this.jobsGetAll}
                  searchBtnClick={this.handleSearch}
                  updateSearchQuery={this.resetSearch}
                  searchQuery={this.state.search}
                  isSearching={this.state.isSearching}
                />
              </div>
            </div>
            <Row className="p-4">{this.state.jobsList}</Row>
            <span className="d-flex">
              <Pagination
                className="customPaginate ml-auto mr-auto"
                onChange={this.onNextPage}
                current={this.state.pagination.current}
                pageSize={this.state.pagination.pageSize}
                total={this.state.pagination.totalCount}
                localeInfo={localeInfo}
              />
            </span>
            {this.state.jobsList.length === 0 ? (
              <p>No Records Found</p>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </React.Fragment>
    );
  }
}
Jobs.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }),
  currentUser: PropTypes.shape({
    id: PropTypes.number,
    roles: PropTypes.array,
    userName: PropTypes.string,
    email: PropTypes.string,
    isLoggedIn: PropTypes.bool
  }),
  location: PropTypes.shape({
    state: PropTypes.shape({
      query: PropTypes.string
    })
  })
};
export default Jobs;
