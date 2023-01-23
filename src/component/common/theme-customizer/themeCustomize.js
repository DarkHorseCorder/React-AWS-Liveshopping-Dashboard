import React, { Fragment, useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import {
  NavLink,
  TabContent,
  TabPane,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import {
  ADD_LAYOUT,
  ADD_COLOR,
  ADD_MIXlAYOUT,
  ADD_COSTOMIZER,
  ROUTER_ANIMATION,
  ADD_SIDEBAR_TYPES,
} from "../../../redux/actionType";
const ThemeCustomize = (props) => {

  const configDB = useSelector((content) => content.Customizer.customizer);
  const [showHorizontal, setShowHorizontal] = useState(true);
  const [boxLayout, setBoxLayout] = useState(true);
  const [modal, setModal] = useState();
  const [activeTab1, setActiveTab1] = useState("1");
  const [rightSidebar, setRightSidebar] = useState(true);
  const [layout_type, setLayout_type] = useState(configDB.settings.layout_type);
  const mix_layout = configDB.color.mix_layout;
  const primary_color = localStorage.getItem("primary_color");
  const secondary_color = localStorage.getItem("secondary_color");
  const layout_version = localStorage.getItem("layout_version");
  const layout_animation = localStorage.getItem("animation");
  const color = localStorage.getItem("color");
  const config_primary = configDB.color.primary_color;
  const config_secondary = configDB.color.secondary_color;
  const config_color = configDB.color.color;
  const config_layout_version = configDB.color.layout_version;
  const sidebar_type = configDB.settings.sidebar.type;

  const dispatch = useDispatch();

  //set layout_type
  document.body.setAttribute("main-theme-layout", layout_type);
  document.documentElement.dir = layout_type;

  useEffect(() => {
    dispatch({ type: ADD_COSTOMIZER });

    dispatch({
      type: ADD_COLOR,
      payload: {
        color,
        primary_color,
        secondary_color,
        layout_version,
      },
    });
    dispatch({ type: ROUTER_ANIMATION, payload: layout_animation });

    //set sidebar_type
    document.querySelector(".page-wrapper").className =
      "page-wrapper " + sidebar_type;
    // mix_layout type
    if (mix_layout === "default") {
      document.body.className = layout_version;
    } else {
      document.body.className = mix_layout;
    }
    document.body.className = layout_version;

    if (
      localStorage.getItem("primary_color") == null ||
      localStorage.getItem("secondary_color") == null ||
      localStorage.getItem("color") == null ||
      localStorage.getItem("layout_version") == null
    ) {
      document.documentElement.className = config_color;
      localStorage.setItem("primary_color", config_primary);
      localStorage.setItem("secondary_color", config_secondary);
      localStorage.setItem("color", config_color);
      localStorage.setItem("layout_version", config_layout_version);
      dispatch({
        type: ADD_COLOR,
        payload: {
          color: config_color,
          primary_color: config_primary,
          secondary_color: config_secondary,
          layout_version: config_layout_version,
        },
      });
    }

    // eslint-disable-next-line
  }, [dispatch]);

  const toggle = () => {
    setModal(!modal);
  };

  const openCustomizer = () => {
    if (rightSidebar) {
      setRightSidebar(!rightSidebar);
      document.querySelector(".customizer-contain").classList.add("open");
      document.querySelector(".customizer-links").classList.add("open");
    }
  };

  const closeCustomizer = () => {
    setRightSidebar(!rightSidebar);
    document.querySelector(".customizer-contain").classList.remove("open");
    document.querySelector(".customizer-links").classList.remove("open");
  };

  const handleLayout = (layout) => {
    setLayout_type(layout);
    setShowHorizontal(true)
    setBoxLayout(true)
    document.querySelectorAll(".main-layout li").forEach((item) => {
      item.classList.remove("active");
    });

    document.body.setAttribute("main-theme-layout", layout);
    document.documentElement.dir = layout;

    if (layout === "box-layout") {
      setShowHorizontal(false)
    }

    dispatch({ type: ADD_LAYOUT, payload: layout });
  };

  const handleCustomizerMix = (e) => {
    e.preventDefault();
    document.querySelectorAll(".customizer-mix li").forEach((item) => {
      item.classList.remove("active");
    });
    document.body.className = e.currentTarget.getAttribute("data-attr");
    e.currentTarget.classList.add("active");
    dispatch({
      type: ADD_MIXlAYOUT,
      payload: e.currentTarget.getAttribute("data-attr"),
    });
  };

  const colorChangeTheme = (value) => {
    if (value === "color-1") {
      localStorage.setItem("color", "color-1");
      localStorage.setItem("layout_version", "light");
      localStorage.setItem("primary_color", "#7e37d8");
      localStorage.setItem("secondary_color", "#fe80b2");
    }
    if (value === "color-2") {
      localStorage.setItem("color", "color-2");
      localStorage.setItem("layout_version", "light");
      localStorage.setItem("primary_color", "#ff4c3b");
      localStorage.setItem("secondary_color", "#26c6da");
    }
    if (value === "color-3") {
      localStorage.setItem("color", "color-3");
      localStorage.setItem("layout_version", "light");
      localStorage.setItem("primary_color", "#d64dcf");
      localStorage.setItem("secondary_color", "#8e24aa");
    }
    if (value === "color-4") {
      localStorage.setItem("color", "color-4");
      localStorage.setItem("layout_version", "light");
      localStorage.setItem("primary_color", "#4c2fbf");
      localStorage.setItem("secondary_color", "#2e9de4");
    }
    if (value === "color-5") {
      localStorage.setItem("color", "color-5");
      localStorage.setItem("layout_version", "light");
      localStorage.setItem("primary_color", "#7c4dff");
      localStorage.setItem("secondary_color", "#7b1fa2");
    }
    if (value === "color-6") {
      localStorage.setItem("color", "color-6");
      localStorage.setItem("layout_version", "light");
      localStorage.setItem("primary_color", "#3949ab");
      localStorage.setItem("secondary_color", "#4fc3f7");
    }
    if (value === "dark-1") {
      localStorage.setItem("color", "color-1");
      localStorage.setItem("layout_version", "dark-only");
      localStorage.setItem("primary_color", "#7e37d8");
      localStorage.setItem("secondary_color", "#fe80b2");
    }
    if (value === "dark-2") {
      localStorage.setItem("layout_version", "dark-only");
      localStorage.setItem("primary_color", "#ff4c3b");
      localStorage.setItem("secondary_color", "#26c6da");
      localStorage.setItem("color", "color-2");
    }
    if (value === "dark-3") {
      localStorage.setItem("layout_version", "dark-only");
      localStorage.setItem("primary_color", "#d64dcf");
      localStorage.setItem("secondary_color", "#8e24aa");
      localStorage.setItem("color", "color-3");
    }
    if (value === "dark-4") {
      localStorage.setItem("layout_version", "dark-only");
      localStorage.setItem("primary_color", "#4c2fbf");
      localStorage.setItem("secondary_color", "#2e9de4");
      localStorage.setItem("color", "color-4");
    }
    if (value === "dark-5") {
      localStorage.setItem("layout_version", "dark-only");
      localStorage.setItem("primary_color", "#7c4dff");
      localStorage.setItem("secondary_color", "#7b1fa2");
      localStorage.setItem("color", "color-5");
    }
    if (value === "dark-6") {
      localStorage.setItem("layout_version", "dark-only");
      localStorage.setItem("primary_color", "#3949ab");
      localStorage.setItem("secondary_color", "#4fc3f7");
      localStorage.setItem("color", "color-6");
    }
    window.location.reload();
  };

  const selectAnimation = (e) => {
    localStorage.setItem("animation", e.target.value);
    dispatch({ type: ROUTER_ANIMATION, payload: e.target.value });
    window.location.reload();
  };

  const handleSidebarType = (e, type) => {
    e.preventDefault();
    setBoxLayout(true)
    document.querySelectorAll(".sidebar-type li").forEach((item) => {
      item.classList.remove("active");
    });
    document.querySelector(".page-wrapper").className = "page-wrapper " + type;
    e.currentTarget.classList.add("active");
    
    if (type === "horizontal_sidebar") {
      setBoxLayout(false)
      document
        .querySelector(".iconsidebar-menu")
        .classList.remove("iconbar-second-close");
      document
        .querySelector(".iconsidebar-menu")
        .classList.remove("iconbar-mainmenu-close");
    }
    dispatch({ type: ADD_SIDEBAR_TYPES, payload: { type } });
  };

  return (
    <Fragment>
      <div className="customizer-links">
        <div
          className="nav flex-column nac-pills"
          id="c-pills-tab"
          role="tablist"
          aria-orientation="vertical"
        >
          <NavLink
            className={activeTab1 === "1" ? "active" : ""}
            onClick={() => setActiveTab1("1")}
            id="c-pills-home-tab"
          >
            <div className="settings" onClick={openCustomizer}>
              <img
                src={require("../../../assets/images/customize.png")}
                alt=""
              />
            </div>
          </NavLink>
          <NavLink
            className={activeTab1 === "2" ? "active" : ""}
            onClick={() => setActiveTab1("2")}
            id="c-pills-profile-tab"
          >
            <div className="settings color-settings" onClick={openCustomizer}>
              <img
                src={require("../../../assets/images/color-picker.png")}
                alt=""
              />
            </div>
          </NavLink>
        </div>
      </div>
      <div className="customizer-contain">
        <div className="customizer-body custom-scrollbar">
          <TabContent activeTab={activeTab1}>
            <div className="customizer-header pl-0 mb-4">
              <i className="icon-close" onClick={closeCustomizer}></i>
              <h5>Customizer</h5>
              <p className="mb-0">Customize &amp; Preview Real Time</p>
              <Button
                color="primary"
                className="plus-popup mt-2"
                onClick={() => setModal(!modal)}
              >
                Configuration
              </Button>
              <Modal
                isOpen={modal}
                toggle={toggle}
                className="modal-body"
                centered={true}
              >
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>
                  <Container fluid={true} className="bd-example-row">
                    <Row>
                      <p>
                        To replace our design with your desired theme. Please do
                        configuration as mention
                      </p>
                      <p>
                        <b> {"Path : data > customizer > config.js"} </b>
                      </p>
                    </Row>

                    <pre>
                      <code>
                        <div> export class ConfigDB &#123;</div>
                        <div> static data = &#123;</div>
                        <div> settings&#58; &#123;</div>
                        <div>
                          layout_type&#58; '{configDB.settings.layout_type}'
                        </div>
                        <div> sidebar&#58; &#123;</div>
                        <div> type&#58; '{configDB.settings.sidebar.type}'</div>
                        <div> &#125;,</div>
                        <div> &#125;,</div>
                        <div> color&#58; &#123;</div>
                        <div>
                          {" "}
                          layout_version&#58; '{
                            configDB.color.layout_version
                          }',{" "}
                        </div>
                        <div> color&#58; '{configDB.color.color}', </div>
                        <div>
                          {" "}
                          primary_color&#58; '{
                            configDB.color.primary_color
                          }',{" "}
                        </div>
                        <div>
                          {" "}
                          secondary_color&#58; '{configDB.color.secondary_color}
                          ',{" "}
                        </div>
                        <div>
                          {" "}
                          mix_layout&#58; '{configDB.color.mix_layout}',{" "}
                        </div>
                        <div> &#125;,</div>
                        <div>
                          {" "}
                          router_animation&#58; '{configDB.router_animation}'
                        </div>
                        <div> &#125;</div>
                        <div> &#125;</div>
                      </code>
                    </pre>
                  </Container>
                </ModalBody>
                <ModalFooter>
                  <CopyToClipboard text={JSON.stringify(configDB)}>
                    <Button
                      color="primary"
                      className="notification"
                      onClick={() => {
                        toast.success("Code Copied to clipboard !", {
                          position: toast.POSITION.BOTTOM_RIGHT,
                        });
                        toggle();
                      }}
                    >
                      Copy text
                    </Button>
                  </CopyToClipboard>
                  <Button color="secondary" onClick={toggle}>
                    Cancel
                  </Button>
                </ModalFooter>
              </Modal>
            </div>
            <TabPane tabId="1">
              <h6>Layout Type</h6>
              <ul className="main-layout layout-grid">
                <li
                  className={`${layout_type === "ltr" ? "active" : ""}`}
                  onClick={() => handleLayout("ltr")}
                >
                  <div className="header bg-light">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <div className="body">
                    <ul>
                      <li className="bg-dark sidebar"></li>
                      <li className="bg-light body">
                        {" "}
                        <span className="badge badge-dark">LTR</span>
                      </li>
                    </ul>
                  </div>
                </li>
                <li
                  className={`${layout_type === "rtl" ? "active" : ""}`}
                  onClick={() => handleLayout("rtl")}
                >
                  <div className="header bg-light">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <div className="body">
                    <ul>
                      <li className="bg-light body">
                        <span className="badge badge-dark">RTL</span>
                      </li>
                      <li className="bg-dark sidebar"></li>
                    </ul>
                  </div>
                </li>
                {boxLayout ?
                <li
                  className={`${layout_type === "box-layout" ? "active" : ""}`}
                  onClick={() => handleLayout("box-layout")}
                >
                  <div className="header bg-light">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <div className="body">
                    <ul>
                      <li className="bg-dark sidebar"></li>
                      <li className="bg-light body">
                        {" "}
                        <span className="badge badge-dark">Box</span>
                      </li>
                    </ul>
                  </div>
                </li>
                :""}
              </ul>
              <h6 className="">Sidebar Type</h6>
              <ul className="sidebar-type layout-grid">
                <li
                  className="active"
                  onClick={(e) => handleSidebarType(e, "default")}
                >
                  <div className="header bg-light">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <div className="body">
                    <ul>
                      <li className="bg-dark sidebar"></li>
                      <li className="bg-light body"></li>
                    </ul>
                  </div>
                </li>
                {showHorizontal ? 
                <li
                  data-attr="horizontal_sidebar"
                  className="horizontal_sidebar"
                  onClick={(e) => handleSidebarType(e, "horizontal_sidebar")}
                >
                  <div className="header bg-light">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <div className="body">
                    <ul>
                      <li className="bg-dark sidebar horizontal-menu"></li>
                      <li className="bg-light body"> </li>
                    </ul>
                  </div>
                </li>
                :""}
              </ul>
              <h6>Router Animation</h6>
              <Input
                type="select"
                defaultValue={layout_animation}
                name="selectMulti"
                onChange={selectAnimation}
              >
                <option value="zoomfade">Zoom Fade</option>
                <option value="slidefade">Silde Fade</option>
                <option value="fadebottom">Fade Bottom</option>
                <option value="fade">Fade</option>
                <option value="zoomout">Zoom Out</option>
                <option value="none">None</option>
              </Input>
            </TabPane>
            <TabPane tabId="2">
              <h6>Light layout</h6>
              <ul className="layout-grid customizer-color">
                <li
                  className="color-layout"
                  data-attr="light-1"
                  data-primary="#7e37d8"
                  data-secondary="#1ea6ec"
                  onClick={() => colorChangeTheme("color-1")}
                >
                  <div></div>
                </li>
                <li
                  className="color-layout"
                  data-attr="light-2"
                  data-primary="#ff4c3b"
                  data-secondary="#26c6da"
                  onClick={() => colorChangeTheme("color-2")}
                >
                  <div></div>
                </li>
                <li
                  className="color-layout"
                  data-attr="light-3"
                  data-primary="#d64dcf"
                  data-secondary="#8e24aa"
                  onClick={() => colorChangeTheme("color-3")}
                >
                  <div></div>
                </li>
                <li
                  className="color-layout"
                  data-attr="light-4"
                  data-primary="#4c2fbf"
                  data-secondary="#2e9de4"
                  onClick={() => colorChangeTheme("color-4")}
                >
                  <div></div>
                </li>
                <li
                  className="color-layout"
                  data-attr="light-5"
                  data-primary="#7c4dff"
                  data-secondary="#7b1fa2"
                  onClick={() => colorChangeTheme("color-5")}
                >
                  <div></div>
                </li>
                <li
                  className="color-layout"
                  data-attr="light-6"
                  data-primary="#3949ab"
                  data-secondary="#4fc3f7"
                  onClick={() => colorChangeTheme("color-6")}
                >
                  <div></div>
                </li>
              </ul>
              <h6 className="">Dark Layout</h6>
              <ul className="layout-grid customizer-color dark">
                <li
                  className="color-layout"
                  data-attr="dark-1"
                  data-primary="#7e37d8"
                  data-secondary="#1ea6ec"
                  onClick={() => colorChangeTheme("dark-1")}
                >
                  <div></div>
                </li>
                <li
                  className="color-layout"
                  data-attr="dark-2"
                  data-primary="#ff4c3b"
                  data-secondary="#26c6da"
                  onClick={() => colorChangeTheme("dark-2")}
                >
                  <div></div>
                </li>
                <li
                  className="color-layout"
                  data-attr="dark-3"
                  data-primary="#d64dcf"
                  data-secondary="#8e24aa"
                  onClick={() => colorChangeTheme("dark-3")}
                >
                  <div></div>
                </li>
                <li
                  className="color-layout"
                  data-attr="dark-4"
                  data-primary="#4c2fbf"
                  data-secondary="#2e9de4"
                  onClick={() => colorChangeTheme("dark-4")}
                >
                  <div></div>
                </li>
                <li
                  className="color-layout"
                  data-attr="dark-5"
                  data-primary="#7c4dff"
                  data-secondary="#7b1fa2"
                  onClick={() => colorChangeTheme("dark-5")}
                >
                  <div></div>
                </li>
                <li
                  className="color-layout"
                  data-attr="dark-6"
                  data-primary="#3949ab"
                  data-secondary="#4fc3f7"
                  onClick={() => colorChangeTheme("dark-6")}
                >
                  <div></div>
                </li>
              </ul>
              <h6 className="">Mix Layout</h6>
              <ul className="layout-grid customizer-mix">
                <li
                  className="color-layout active"
                  data-attr="color-only"
                  onClick={handleCustomizerMix}
                >
                  <div className="header bg-light">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <div className="body">
                    <ul>
                      <li className="bg-light sidebar"></li>
                      <li className="bg-light body"></li>
                    </ul>
                  </div>
                </li>
                <li
                  className="color-layout"
                  data-attr="sidebar-dark"
                  onClick={handleCustomizerMix}
                >
                  <div className="header bg-light">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <div className="body">
                    <ul>
                      <li className="bg-dark sidebar"></li>
                      <li className="bg-light body"></li>
                    </ul>
                  </div>
                </li>
                <li
                  className="color-layout"
                  data-attr="dark-only"
                  onClick={handleCustomizerMix}
                >
                  <div className="header bg-dark">
                    <ul>
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <div className="body">
                    <ul>
                      <li className="bg-dark sidebar"></li>
                      <li className="bg-dark body"></li>
                    </ul>
                  </div>
                </li>
              </ul>
            </TabPane>
          </TabContent>
        </div>
      </div>
    </Fragment>
  );
};

export default ThemeCustomize;
