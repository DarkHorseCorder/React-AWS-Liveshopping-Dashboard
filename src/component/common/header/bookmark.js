import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Button } from "reactstrap";
import { MENUITEMS } from "../sidebar/menu";
import { Link } from "react-router-dom";
const Bookmark = (props) => {
  // eslint-disable-next-line
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  const [searchValue, setSearchValue] = useState("");
  const [searchResult, setSearchResult] = useState(false);
  // eslint-disable-next-line
  const [bookmarkSearch, SetBookmarkSearch] = useState(false);
  const [bookmarkItems, setBookmarkItems] = useState([]);

  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      //Do whatever when esc is pressed
      setSearchValue("");
      setSearchResult([]);
      SetBookmarkSearch(false);
      document.querySelector(".filled-bookmark").classList.remove("is-open");
      document
        .querySelector(".page-wrapper")
        .classList.remove("offcanvas-bookmark");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    mainmenu.filter((menuItems) => {
      if (menuItems.bookmark) {
        setBookmarkItems((bookmarkItems) => [...bookmarkItems, menuItems]);
      }
      return menuItems;
    });
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
    // eslint-disable-next-line
  }, []);

  const addnewbookmark = () => {
    document.querySelector(".flip-card-inner").classList.add("flipped");
  };
  const backtobookmark = () => {
    document.querySelector(".flip-card-inner").classList.remove("flipped");
  };

  const handleSearchKeyword = (keyword) => {
    keyword ? addFix() : removeFix();
    const items = [];
    setSearchValue(keyword);
    mainmenu.filter((menuItems) => {
      if (
        menuItems.title.toLowerCase().includes(keyword) &&
        menuItems.type === "link"
      ) {
        items.push(menuItems);
      }
      if (!menuItems.children) return false;
      menuItems.children.filter((subItems) => {
        if (
          subItems.title.toLowerCase().includes(keyword) &&
          subItems.type === "link"
        ) {
          subItems.icon = menuItems.icon;
          items.push(subItems);
        }
        if (!subItems.children) return false;
        subItems.children.filter((suSubItems) => {
          if (suSubItems.title.toLowerCase().includes(keyword)) {
            suSubItems.icon = menuItems.icon;
            items.push(suSubItems);
          }
          return suSubItems;
        });
        return subItems;
      });
      checkSearchResultEmpty(items);
      setSearchResult(items);
      return menuItems;
    });
  };

  const checkSearchResultEmpty = (items) => {
    if (!items.length) {
      document.querySelector(".empty-bookmark").classList.add("is-open");
    } else {
      document.querySelector(".empty-bookmark").classList.remove("is-open");
    }
  };

  const addFix = () => {
    document.querySelector(".filled-bookmark").classList.add("is-open");
  };

  const removeFix = () => {
    setSearchValue("");
    setSearchResult([]);
    document.querySelector(".filled-bookmark").classList.remove("is-open");
  };

  const addToBookmark = (event, items) => {
    const index = bookmarkItems.indexOf(items);
    if (index === -1 && !items.bookmark) {
      items.bookmark = true;
      event.currentTarget.classList.add("starred");
      setBookmarkItems([...bookmarkItems, items]);
    } else {
      event.currentTarget.classList.remove("starred");
      bookmarkItems.splice(index, 1);
      setBookmarkItems(bookmarkItems);
      items.bookmark = false;
    }
  };

  return (
    <Fragment>
      <li className="onhover-dropdown">
        <img
          className="img-fluid img-shadow-warning"
          src={require("../../../assets/images/dashboard/bookmark.png")}
          alt=""
        />
        <div className="onhover-show-div bookmark-flip">
          <div className="flip-card">
            <div className="flip-card-inner">
              <div className="front">
                <ul className="droplet-dropdown bookmark-dropdown">
                  <li className="gradient-primary text-center">
                    <h5 className="f-w-700">Guide</h5>
                    <span>Aides & Support</span>
                  </li>
                  {/* <li>
                    <Row>
                      {bookmarkItems.map((items, index) => {
                        return (
                          <div className="col-4 text-center" key={index}>
                            <Link to={items.path}>{items.icon}</Link>
                          </div>
                        );
                      })}
                    </Row>
                  </li> */}
                  <li className="text-center">
                    <Button
                      color="flip-btn"
                      id="flip-btn"
                      onClick={addnewbookmark}
                    >
                      Consulter le guide
                    </Button>
                  </li>
                </ul>
              </div>
              <div className="back">
                <ul>
                  <li>
                    <div className="droplet-dropdown bookmark-dropdown flip-back-content">
                      <input
                        type="text"
                        placeholder="search..."
                        value={searchValue}
                        onChange={(e) => handleSearchKeyword(e.target.value)}
                      />
                      <div
                        className="Typeahead-menu filled-bookmark custom-scrollbar"
                        id="search-outer"
                      >
                        {searchValue
                          ? searchResult.map((data, index) => {
                              return (
                                <div className="ProfileCard u-cf" key={index}>
                                  <div className="ProfileCard-avatar">
                                    {data.icon}
                                  </div>
                                  <div className="ProfileCard-details">
                                    <div className="ProfileCard-realName">
                                      <Link
                                        to={data.path}
                                        className="realname"
                                        onClick={removeFix}
                                      >
                                        {data.title}
                                      </Link>
                                      <span className="pull-right">
                                        <a href="#javascript">
                                          <i
                                            className="fa fa-star-o mt-1 icon-star"
                                            onClick={(e) =>
                                              addToBookmark(e, data)
                                            }
                                          ></i>
                                        </a>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          : ""}
                      </div>
                      <div className="Typeahead-menu empty-bookmark">
                        <div className="tt-dataset tt-dataset-0">
                          <div className="EmptyMessage">
                            Opps!! There are no result found.
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <li>
                    <Button
                      color="flip-back"
                      className="d-block"
                      id="flip-back"
                      onClick={backtobookmark}
                    >
                      Back
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </li>
    </Fragment>
  );
};

export default Bookmark;
