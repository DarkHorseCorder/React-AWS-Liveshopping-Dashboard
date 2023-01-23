import React, { useState, useEffect, useLayoutEffect } from "react";
import { MENUITEMS } from "./menu";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useWindowSize = (wrapper) => {
  const [size, setSize] = useState([0, 0]);

  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  if (wrapper === "horizontal_sidebar") {
    if (size[0] > 100 && size[0] < 991) {
      document.querySelector(".page-wrapper").className =
        "page-wrapper default";
      document.querySelector(".page-body-wrapper").className =
        "page-body-wrapper default";
    } else {
      document.querySelector(".page-wrapper").className =
        "page-wrapper horizontal_sidebar";
      document.querySelector(".page-body-wrapper").className =
        "page-body-wrapper horizontal_sidebar";
    }
  }

  return size;
};

const Sidebar = (props) => {
  const [margin, setMargin] = useState(0);
  const [mainmenu, setMainMenu] = useState(MENUITEMS);
  const configDB = useSelector((content) => content.Customizer.customizer);
  const sidebar_type = configDB.settings.sidebar.wrapper;
  const layout_type = useState(configDB.settings.layout_type);
  const [hideRightArrow, setHideRightArrow] = useState(true);
  const [hideLeftArrow, setHideLeftArrow] = useState(true);
  const [hideLeftArrowRTL, setHideLeftArrowRTL] = useState(true);
  const [hideRightArrowRTL, setHideRightArrowRTL] = useState(true);
  // eslint-disable-next-line
  const [width, height] = useWindowSize(sidebar_type);

  useEffect(() => {
    const currentUrl = window.location.pathname;

    mainmenu.filter((items) => {
      if (items.path === currentUrl) setNavActive(items);
      if (!items.children) return false;
      items.children.filter((subItems) => {
        if (subItems.path === currentUrl) setNavActive(subItems);
        if (!subItems.children) return false;
        subItems.children.filter((subSubItems) => {
          if (subSubItems.path === currentUrl) {
            setNavActive(subSubItems);
            return true;
          } else {
            return false;
          }
        });
        return subItems;
      });
      return items;
    });
    // eslint-disable-next-line
  }, []);

  const setNavActive = (item) => {
    MENUITEMS.filter((menuItem) => {
      if (menuItem !== item) menuItem.active = false;
      if (menuItem.children && menuItem.children.includes(item))
        menuItem.active = true;
      if (menuItem.children) {
        menuItem.children.filter((submenuItems) => {
          if (submenuItems.children && submenuItems.children.includes(item)) {
            menuItem.active = true;
            submenuItems.active = true;
            return true;
          } else {
            return false;
          }
        });
      }
      return menuItem;
    });
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS });
  };

  const toggletNavActive = (item) => {
    if (!item.active) {
      MENUITEMS.forEach((a) => {
        if (MENUITEMS.includes(item)) a.active = false;
        if (!a.children) return false;
        a.children.forEach((b) => {
          if (a.children.includes(item)) {
            b.active = false;
          }
          if (!b.children) return false;
          b.children.forEach((c) => {
            if (b.children.includes(item)) {
              c.active = false;
            }
          });
        });
      });
    }
    item.active = !item.active;
    setMainMenu({ mainmenu: MENUITEMS });
    document
      .querySelector(".iconsidebar-menu")
      .classList.remove("iconbar-mainmenu-close");
  };

  const scrollToRight = () => {
    const elmnt = document.getElementById("myDIV");
    const menuWidth = elmnt.offsetWidth;
    const temp = menuWidth + margin;
    // Checking condition for remaing margin
    if (temp < menuWidth) {
      setMargin(-temp);
      setHideRightArrow(true);
    } else {
      setMargin((margin) => (margin += -width));
      setHideLeftArrow(false);
    }
  };

  const scrollToLeft = () => {
    // If Margin is reach between screen resolution
    if (margin >= -width) {
      setMargin(0);
      setHideLeftArrow(true);
    } else {
      setMargin((margin) => (margin += width));
      setHideRightArrow(false);
    }
  };

  const scrollToLeftRTL = () => {
    if (margin <= -width) {
      setMargin((margin) => (margin += -width));
      setHideLeftArrowRTL(true);
    } else {
      setMargin((margin) => (margin += -width));
      setHideRightArrowRTL(false);
    }
  };

  const scrollToRightRTL = () => {
    const temp = width + margin;
    // Checking condition for remaing margin
    if (temp === 0) {
      setMargin(temp);
      setHideRightArrowRTL(true);
    } else {
      setMargin((margin) => (margin += width));
      setHideRightArrowRTL(false);
      setHideLeftArrowRTL(false);
    }
  };

  return (
    <div className="iconsidebar-menu">
      <div className="sidebar custom-scrollbar">
        <ul className="iconMenu-bar custom-scrollbar">
          <li
            className={`left-arrow ${
              layout_type === "rtl"
                ? hideLeftArrowRTL
                  ? "d-none"
                  : "hideLeftArrowRTL"
                : hideLeftArrow
                ? "d-none"
                : "hideLeftArrow"
            }`}
            onClick={
              configDB.sidebar_type === "horizontal_sidebar" &&
              layout_type === "rtl"
                ? scrollToLeftRTL
                : scrollToLeft
            }
          >
            <i className="fa fa-angle-left"></i>
          </li>
          {MENUITEMS.map((menuItem, i) => (
            <li className={`${menuItem.active ? "open" : ""}`} key={i}>
              {menuItem.tag}
              <Link
                className="bar-icons"
                to={menuItem.path}
                onClick={() => toggletNavActive(menuItem)}
              >
                {menuItem.icon}
                <span>{menuItem.title}</span>
              </Link>

              {/* {menuItem.children ? (
                <ul className="iconbar-mainmenu custom-scrollbar">
                  {menuItem.children.map((childrenItem, index) => (
                    <Fragment key={index}>
                      {childrenItem.type === "sub" ? (
                        <li className="iconbar-header">{childrenItem.title}</li>
                      ) : (
                        ""
                      )}

                      {childrenItem.type === "sub-header" ? (
                        <li className="iconbar-header sub-header">
                          {childrenItem.title}
                        </li>
                      ) : (
                        ""
                      )}

                      {childrenItem.type === "link" ? (
                        <li className={childrenItem.active ? "active" : ""}>
                          <Link
                            className={childrenItem.active ? "active" : ""}
                            to={childrenItem.path}
                            onClick={() => toggletNavActive(childrenItem)}
                          >
                            {childrenItem.title}
                          </Link>
                        </li>
                      ) : (
                        ""
                      )}

                      {childrenItem.type === "exteral_link" ? (
                        <li className={childrenItem.active ? "active" : ""}>
                          <a
                            className={childrenItem.active ? "active" : ""}
                            href={childrenItem.path}
                            onClick={() => toggletNavActive(childrenItem)}
                          >
                            {childrenItem.title}
                          </a>
                        </li>
                      ) : (
                        ""
                      )}
                    </Fragment>
                  ))}
                </ul>
              ) : (
                ""
              )} */}
            </li>
          ))}
          <li
            className={`right-arrow ${
              layout_type === "rtl"
                ? hideRightArrowRTL
                  ? "d-none"
                  : "hideRightArrowRTL"
                : hideRightArrow
                ? "d-none"
                : "hideRightArrow"
            }`}
            onClick={
              sidebar_type === "horizontal_sidebar" && layout_type === "rtl"
                ? scrollToRightRTL
                : scrollToRight
            }
          >
            <i className="fa fa-angle-right"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
