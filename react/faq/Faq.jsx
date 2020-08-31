import React from "react";
import * as faqService from "../../services/faqService";
import FaqCategoryCard from "./FaqCategoryCard";
import PropTypes from "prop-types";
import Logger from "sabio-debug";
import FaqCard from "./FaqCard";
import "./Faq.css";
import swal from "sweetalert";

const _logger = Logger.extend("Faq");

class Faq extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      faq: [],
      mappedFaq: [],
      categories: [],
      mappedCategory: [],
      loggedIn: ""
    };
  }

  componentDidMount() {
    const role =
      this.props.currentUser.roles && this.props.currentUser.roles[0]
        ? this.props.currentUser.roles[0]
        : "Seeker";
    this.setState({ loggedIn: role });
    this.getAllCategories();
  }

  getAllCategories = () => {
    faqService
      .getCategories()
      .then(this.getAllCatSuccess)
      .catch(this.getAllCatError);
  };

  getAllCatSuccess = response => {
    let categories = response.items;
    this.setState(
      prevState => {
        return {
          ...prevState,
          categories
        };
      },
      () => this.getAll()
    );
  };

  getAllCatError = () => {
    this.setState(prevState => {
      return {
        ...prevState,
        mappedCategory: []
      };
    });
  };

  getAll = () => {
    faqService
      .getAll()
      .then(this.getAllFaqSuccess)
      .catch(this.getAllFaqError);
  };

  getAllFaqSuccess = response => {
    let faqs = response.item;
    let categories = [...this.state.categories];
    if (faqs && categories) {
      categories.forEach(currentCategory => {
        currentCategory.faqs = [];
        currentCategory.isOpen = false;
        faqs.forEach(currentFaq => {
          if (currentCategory.id === currentFaq.categoryId) {
            currentCategory.faqs.push(this.mapFaq(currentFaq));
          }
        });
      });
      this.setState(prevState => {
        return {
          ...prevState,
          mappedCategories: categories.map(this.mapCategory)
        };
      });
    }
  };

  getAllFaqError = () => {
    _logger("getAll Faq Error");
  };

  mapFaq = faq => (
    <FaqCard
      role={this.state.loggedIn}
      faq={faq}
      key={faq.id}
      handleEdit={this.handleEditFaq}
      handleDelete={this.handleDeleteFaq}
    />
  );

  mapCategory = cat => (
    <FaqCategoryCard cat={cat} key={cat.id} handleToggle={this.handleToggle} />
  );

  handleToggle = id => {
    let categories = [...this.state.categories];
    let index = categories.findIndex(category => category.id === id);
    categories[index].isOpen = !categories[index].isOpen;
    _logger(categories);
    this.setState(prevState => {
      return {
        ...prevState,
        categories,
        mappedCategories: categories.map(this.mapCategory)
      };
    });
  };

  handleEditFaq = faq => {
    this.props.history.push(`/admin/faq/${faq.id}/edit`, faq);
  };

  handleDeleteFaq = id => {
    swal({
      title: "Are you sure?",
      text:
        "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true
    }).then(willDelete => {
      if (willDelete) {
        this.deleteFaq(id);
        swal("Poof! Your FAQ has been deleted!", {
          icon: "success"
        });
      } else {
        swal("Your FAQ is safe!");
      }
    });
  };

  deleteFaq = id => {
    _logger(id);
    faqService
      .del(id)
      .then(this.deleteSuccess)
      .catch(this.deleteError);
  };

  deleteSuccess = () => {
    this.getAll();
  };

  deleteError = () => {
    _logger("Delete Error");
  };

  newFaqClick = () => {
    this.props.history.push("/admin/faq/new");
  };

  render() {
    return (
      <div>
        <div className="faq-page">
          <div className="form-inline col-2 my-3 my-lg-0 row-4">
            {this.state.loggedIn && this.state.loggedIn === "Admin" ? (
              <button
                className="btn btn-primary my-2 my-sm-0"
                type="btn"
                onClick={this.newFaqClick}
              >
                Create
              </button>
            ) : null}
          </div>
          <div className="faq-categories">{this.state.mappedCategories}</div>
        </div>
      </div>
    );
  }
}
Faq.propTypes = {
  currentUser: PropTypes.shape({
    roles: PropTypes.arrayOf(PropTypes.string)
  }),
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  })
};
export default Faq;
