import React, { useState, Fragment } from "react";
import Breadcrumb from "../../component/common/breadcrumb/breadcrumb";
import { images, smallImages } from "../../data/galleryData";
import Lightbox from "react-image-lightbox";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
  Media,
  Dropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Pagination,
  PaginationItem,
  PaginationLink,
} from "reactstrap";

const Search = (props) => {
  const [activeTab, setActiveTab] = useState("1");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const initilindex = { index: 0, isOpen: false };
  const [photoIndex, setPhotoIndex] = useState(initilindex);
  const onMovePrev = () => {
    const prev = (photoIndex.index + images.length - 1) % images.length;
    setPhotoIndex({ ...photoIndex, index: prev });
  };
  const onMoveNext = () => {
    const next = (photoIndex.index + 1) % images.length;
    setPhotoIndex({ ...photoIndex, index: next });
  };

  return (
    <Fragment>
      <Breadcrumb parent="Page" title="Search Page" />
      <Container fluid={true} className="search-page">
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <Form className="search-form contact-search">
                  <FormGroup className="m-0">
                    <Label className="sr-only">Email</Label>
                    <Input
                      className="form-control-plaintext"
                      type="search"
                      placeholder="Search.."
                    />
                  </FormGroup>
                </Form>
              </CardHeader>
              <CardBody>
                <Nav tabs className="border-tab-primary">
                  <NavItem id="myTab" role="tablist">
                    <NavLink
                      className={activeTab === "1" ? "active" : ""}
                      onClick={() => setActiveTab("1")}
                    >
                      <i className="icon-target"></i>All
                    </NavLink>
                  </NavItem>
                  <NavItem id="myTab" role="tablist">
                    <NavLink
                      className={activeTab === "2" ? "active" : ""}
                      onClick={() => setActiveTab("2")}
                    >
                      <i className="icon-image"></i>Images
                    </NavLink>
                  </NavItem>
                  <NavItem id="myTab" role="tablist">
                    <NavLink
                      className={activeTab === "3" ? "active" : ""}
                      onClick={() => setActiveTab("3")}
                    >
                      <i className="icon-video-clapper"></i>Videos
                    </NavLink>
                  </NavItem>
                  <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle
                      caret
                      tag="button"
                      className="nav-link active btn-primary"
                    >
                      <i className="icon-settings"></i>Settings
                    </DropdownToggle>
                    <DropdownMenu>
                      <DropdownItem href="#javascript">
                        Search setting
                      </DropdownItem>
                      <DropdownItem href="#javascript">Language</DropdownItem>
                      <DropdownItem href="#javascript">Shopping</DropdownItem>
                      <DropdownItem href="#javascript">Flights</DropdownItem>
                      <DropdownItem href="#javascript">Finance</DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </Nav>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col xl="6">
                        <p className="pb-4">
                          About 6,000 results (0.60 seconds)
                        </p>
                        <div className="info-block">
                          <h6>
                            Lorem Ipsum is simply dummy text of the printing and
                            typesetting industry
                          </h6>
                          <a href="Pocoeducation.info/">Pocoeducation.info/</a>
                          <p>
                            poco introduces a ielts coaching, toefl coaching,
                            gre coaching, gmat coaching, sat coaching in surat.
                          </p>
                          <div className="star-ratings">
                            <ul className="search-info">
                              <li>5 stars</li>
                              <li>590 votes</li>
                              <li>themes</li>
                            </ul>
                          </div>
                        </div>
                        <div className="info-block">
                          <h6>
                            Proin eleifend metus vel erat faucibus, ut bibendum
                            nulla iaculis.
                          </h6>
                          <a href="Pocoeducation.info/">Pocoeducation.info/</a>
                          <p>
                            poco introduces a ielts coaching, toefl coaching,
                            gre coaching, gmat coaching, sat coaching in surat.
                          </p>
                          <div className="star-ratings">
                            <ul className="search-info">
                              <li>4.5 stars</li>
                              <li>500 votes</li>
                              <li>themes</li>
                            </ul>
                          </div>
                        </div>
                        <div className="info-block">
                          <h6>
                            Fusce rutrum elit aliquet nisi malesuada cursus.
                          </h6>
                          <a href="Pocoeducation.info/">Pocoeducation.info/</a>
                          <p>
                            poco introduces a ielts coaching, toefl coaching,
                            gre coaching, gmat coaching, sat coaching in surat.
                          </p>
                          <div className="star-ratings">
                            <ul className="search-info">
                              <li>
                                <i className="icofont icofont-ui-rating"></i>
                                <i className="icofont icofont-ui-rating"></i>
                                <i className="icofont icofont-ui-rating"></i>
                                <i className="icofont icofont-ui-rating"></i>
                                <i className="icofont icofont-ui-rating"></i>
                              </li>
                              <li>5 stars</li>
                              <li>590 votes</li>
                              <li>themes</li>
                            </ul>
                          </div>
                        </div>
                        <div className="info-block">
                          <h6>Morbi feugiat mauris vel semper fringilla.</h6>
                          <a href="Pocoeducation.info/">Pocoeducation.info/</a>
                          <p>
                            poco introduces a ielts coaching, toefl coaching,
                            gre coaching, gmat coaching, sat coaching in surat.
                          </p>
                          <div className="star-ratings">
                            <ul className="search-info">
                              <li>
                                <i className="icofont icofont-ui-rating"></i>
                                <i className="icofont icofont-ui-rating"></i>
                                <i className="icofont icofont-ui-rating"></i>
                                <i className="icofont icofont-ui-rating"></i>
                                <i className="icofont icofont-ui-rating"></i>
                              </li>
                              <li>5 stars</li>
                              <li>590 votes</li>
                              <li>themes</li>
                            </ul>
                          </div>
                        </div>
                        <div className="info-block">
                          <h6>Morbi feugiat mauris vel semper fringilla.</h6>
                          <a href="Pocoeducation.info/">Pocoeducation.info/</a>
                          <p>
                            poco introduces a ielts coaching, toefl coaching,
                            gre coaching, gmat coaching, sat coaching in surat.
                          </p>
                          <div className="star-ratings">
                            <ul className="search-info">
                              <li>
                                <i className="icofont icofont-ui-rating"></i>
                                <i className="icofont icofont-ui-rating"></i>
                                <i className="icofont icofont-ui-rating"></i>
                                <i className="icofont icofont-ui-rating"></i>
                                <i className="icofont icofont-ui-rate-blank"></i>
                              </li>
                              <li>5 stars</li>
                              <li>590 votes</li>
                              <li>themes</li>
                            </ul>
                          </div>
                        </div>
                        <div className="info-block">
                          <Pagination className="pagination-primary">
                            <PaginationItem disabled>
                              <PaginationLink href="#javascript">
                                Previous
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#javascript">
                                1
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem active>
                              <PaginationLink href="#javascript">
                                2
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#javascript">
                                3
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#javascript">
                                Next
                              </PaginationLink>
                            </PaginationItem>
                          </Pagination>
                        </div>
                      </Col>
                      <Col xl="6">
                        <Card className="lg-mt mb-0">
                          <div className="blog-box blog-shadow">
                            <Media
                              className="img-fluid"
                              src={require("../../assets/images/blog/blog.jpg")}
                              alt=""
                            />
                            <div className="blog-details">
                              <p className="digits">25 July 2019</p>
                              <h4>
                                Accusamus et iusto odio dignissimos ducimus qui
                                blanditiis.
                              </h4>
                              <ul className="blog-social digits">
                                <li>
                                  <i className="icofont icofont-user"></i>Mark
                                  Jecno
                                </li>
                                <li>
                                  <i className="icofont icofont-thumbs-up"></i>
                                  02 Hits
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Card>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <div className="info-block">
                      <p className="pb-4 digits">
                        About 12,120 results (0.50 seconds)
                      </p>
                      <div
                        className="my-gallery row gallery-with-description"
                        id="aniimated-thumbnials"
                      >
                        <figure
                          className="col-xl-3 col-sm-6"
                          itemProp="associatedMedia"
                        >
                          <a href="#javascript" data-size="1600x950">
                            <Media
                              src={smallImages[0]}
                              alt="Gallery"
                              className="img-thumbnail"
                              onClick={() =>
                                setPhotoIndex({
                                  ...photoIndex,
                                  index: 0,
                                  isOpen: true,
                                })
                              }
                            />
                            <div className="caption">
                              <h4>Portfolio Title</h4>
                              <p>
                                is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy.
                              </p>
                            </div>
                          </a>
                          <figcaption itemProp="caption description">
                            <h4>Portfolio Title</h4>
                            <p>
                              is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy.
                            </p>
                          </figcaption>
                        </figure>
                        <figure
                          className="col-xl-3 col-sm-6"
                          itemProp="associatedMedia"
                          itemScope=""
                        >
                          <a
                            href="#javascript"
                            itemProp="contentUrl"
                            data-size="1600x950"
                          >
                            <Media
                              src={smallImages[1]}
                              alt="Gallery"
                              className="img-thumbnail"
                              onClick={() =>
                                setPhotoIndex({
                                  ...photoIndex,
                                  index: 1,
                                  isOpen: true,
                                })
                              }
                            />
                            <div className="caption">
                              <h4>Portfolio Title</h4>
                              <p>
                                is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy.
                              </p>
                            </div>
                          </a>
                          <figcaption itemProp="caption description">
                            <h4>Portfolio Title</h4>
                            <p>
                              is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy.
                            </p>
                          </figcaption>
                        </figure>
                        <figure
                          className="col-xl-3 col-sm-6"
                          itemProp="associatedMedia"
                          itemScope=""
                        >
                          <a
                            href="#javascript"
                            itemProp="contentUrl"
                            data-size="1600x950"
                          >
                            <Media
                              src={smallImages[2]}
                              alt="Gallery"
                              className="img-thumbnail"
                              onClick={() =>
                                setPhotoIndex({
                                  ...photoIndex,
                                  index: 2,
                                  isOpen: true,
                                })
                              }
                            />
                            <div className="caption">
                              <h4>Portfolio Title</h4>
                              <p>
                                is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy.
                              </p>
                            </div>
                          </a>
                          <figcaption itemProp="caption description">
                            <h4>Portfolio Title</h4>
                            <p>
                              is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy.
                            </p>
                          </figcaption>
                        </figure>
                        <figure
                          className="col-xl-3 col-sm-6"
                          itemProp="associatedMedia"
                          itemScope=""
                        >
                          <a
                            href="#javascript"
                            itemProp="contentUrl"
                            data-size="1600x950"
                          >
                            <Media
                              src={smallImages[3]}
                              alt="Gallery"
                              className="img-thumbnail"
                              onClick={() =>
                                setPhotoIndex({
                                  ...photoIndex,
                                  index: 3,
                                  isOpen: true,
                                })
                              }
                            />
                            <div className="caption">
                              <h4>Portfolio Title</h4>
                              <p>
                                is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy.
                              </p>
                            </div>
                          </a>
                          <figcaption itemProp="caption description">
                            <h4>Portfolio Title</h4>
                            <p>
                              is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy.
                            </p>
                          </figcaption>
                        </figure>
                        <figure
                          className="col-xl-3 col-sm-6"
                          itemProp="associatedMedia"
                          itemScope=""
                        >
                          <a
                            href="#javascript"
                            itemProp="contentUrl"
                            data-size="1600x950"
                          >
                            <Media
                              src={smallImages[4]}
                              alt="Gallery"
                              className="img-thumbnail"
                              onClick={() =>
                                setPhotoIndex({
                                  ...photoIndex,
                                  index: 4,
                                  isOpen: true,
                                })
                              }
                            />
                            <div className="caption">
                              <h4>Portfolio Title</h4>
                              <p>
                                is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy.
                              </p>
                            </div>
                          </a>
                          <figcaption itemProp="caption description">
                            <h4>Portfolio Title</h4>
                            <p>
                              is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy.
                            </p>
                          </figcaption>
                        </figure>
                        <figure
                          className="col-xl-3 col-sm-6"
                          itemProp="associatedMedia"
                          itemScope=""
                        >
                          <a
                            href="#javascript"
                            itemProp="contentUrl"
                            data-size="1600x950"
                          >
                            <Media
                              src={smallImages[5]}
                              alt="Gallery"
                              className="img-thumbnail"
                              onClick={() =>
                                setPhotoIndex({
                                  ...photoIndex,
                                  index: 5,
                                  isOpen: true,
                                })
                              }
                            />
                            <div className="caption">
                              <h4>Portfolio Title</h4>
                              <p>
                                is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy.
                              </p>
                            </div>
                          </a>
                          <figcaption itemProp="caption description">
                            <h4>Portfolio Title</h4>
                            <p>
                              is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy.
                            </p>
                          </figcaption>
                        </figure>
                        <figure
                          className="col-xl-3 col-sm-6"
                          itemProp="associatedMedia"
                          itemScope=""
                        >
                          <a
                            href="#javascript"
                            itemProp="contentUrl"
                            data-size="1600x950"
                          >
                            <Media
                              src={smallImages[6]}
                              alt="Gallery"
                              className="img-thumbnail"
                              onClick={() =>
                                setPhotoIndex({
                                  ...photoIndex,
                                  index: 6,
                                  isOpen: true,
                                })
                              }
                            />
                            <div className="caption">
                              <h4>Portfolio Title</h4>
                              <p>
                                is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy.
                              </p>
                            </div>
                          </a>
                          <figcaption itemProp="caption description">
                            <h4>Portfolio Title</h4>
                            <p>
                              is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy.
                            </p>
                          </figcaption>
                        </figure>
                        <figure
                          className="col-xl-3 col-sm-6"
                          itemProp="associatedMedia"
                          itemScope=""
                        >
                          <a
                            href="#javascript"
                            itemProp="contentUrl"
                            data-size="1600x950"
                          >
                            <Media
                              src={smallImages[7]}
                              alt="Gallery"
                              className="img-thumbnail"
                              onClick={() =>
                                setPhotoIndex({
                                  ...photoIndex,
                                  index: 7,
                                  isOpen: true,
                                })
                              }
                            />
                            <div className="caption">
                              <h4>Portfolio Title</h4>
                              <p>
                                is simply dummy text of the printing and
                                typesetting industry. Lorem Ipsum has been the
                                industry's standard dummy.
                              </p>
                            </div>
                          </a>
                          <figcaption itemProp="caption description">
                            <h4>Portfolio Title</h4>
                            <p>
                              is simply dummy text of the printing and
                              typesetting industry. Lorem Ipsum has been the
                              industry's standard dummy.
                            </p>
                          </figcaption>
                        </figure>
                      </div>
                    </div>
                    <div className="info-block">
                      <Pagination className="pagination-primary">
                        <PaginationItem disabled>
                          <PaginationLink href="#javascript">
                            Previous
                          </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#javascript">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem active>
                          <PaginationLink href="#javascript">2</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#javascript">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                          <PaginationLink href="#javascript">
                            Next
                          </PaginationLink>
                        </PaginationItem>
                      </Pagination>
                    </div>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col xl="6">
                        <p className="pb-4">
                          About 6,000 results (0.60 seconds)
                        </p>
                        <Media className="info-block">
                          <iframe
                            className="mr-3 mb-3"
                            width="200"
                            height="100"
                            src="https://www.youtube.com/embed/AVFqh3SkA4Q"
                            title="myFrame"
                          ></iframe>
                          <Media body>
                            <h6>
                              Lorem Ipsum is simply dummy text of the printing
                              and typesetting industry
                            </h6>
                            <a href="#javascript">Pocoeducation.info/</a>
                            <p>
                              poco introduces a ielts coaching, toefl coaching,
                              gre coaching, gmat coaching, sat coaching in
                              surat.
                            </p>
                            <div className="star-ratings">
                              <ul className="search-info">
                                <li>5 stars</li>
                                <li>590 votes</li>
                                <li>themes</li>
                              </ul>
                            </div>
                          </Media>
                        </Media>
                        <Media className="info-block">
                          <iframe
                            className="mr-3 mb-3"
                            width="200"
                            height="100"
                            src="https://www.youtube.com/embed/sjN0xhBT2AE"
                            title="myFrame"
                          ></iframe>
                          <Media body>
                            <h6>Morbi eget quam et purus commodo dapibus.</h6>
                            <a href="#javascript">Pocoeducation.info/</a>
                            <p>
                              poco introduces a ielts coaching, toefl coaching,
                              gre coaching, gmat coaching, sat coaching in
                              surat.
                            </p>
                            <div className="star-ratings">
                              <ul className="search-info">
                                <li>5 stars</li>
                                <li>590 votes</li>
                                <li>themes</li>
                              </ul>
                            </div>
                          </Media>
                        </Media>
                        <Media className="info-block">
                          <iframe
                            className="mr-3 mb-3"
                            width="200"
                            height="100"
                            src="https://www.youtube.com/embed/4iWtjctwAI0"
                            title="myFrame"
                          ></iframe>
                          <Media body>
                            <h6>Etiam eget ligula at ante eleifend rutrum.</h6>
                            <a href="#javascript">Pocoeducation.info/</a>
                            <p>
                              poco introduces a ielts coaching, toefl coaching,
                              gre coaching, gmat coaching, sat coaching in
                              surat.
                            </p>
                            <div className="star-ratings">
                              <ul className="search-info">
                                <li>5 stars</li>
                                <li>590 votes</li>
                                <li>themes</li>
                              </ul>
                            </div>
                          </Media>
                        </Media>
                        <Media className="info-block">
                          <iframe
                            className="mr-3 mb-3"
                            width="200"
                            height="100"
                            src="https://www.youtube.com/embed/GwNzqHQdEjE"
                            title="myFrame"
                          ></iframe>
                          <Media body>
                            <h6>
                              Lorem Ipsum is simply dummy text of the printing.
                            </h6>
                            <a href="#javascript">Pocoeducation.info/</a>
                            <p>
                              poco introduces a ielts coaching, toefl coaching,
                              gre coaching, gmat coaching, sat coaching in
                              surat.
                            </p>
                            <div className="star-ratings">
                              <ul className="search-info">
                                <li>5 stars</li>
                                <li>590 votes</li>
                                <li>themes</li>
                              </ul>
                            </div>
                          </Media>
                        </Media>
                        <div className="info-block">
                          <Pagination className="pagination-primary">
                            <PaginationItem disabled>
                              <PaginationLink href="#javascript">
                                Previous
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#javascript">
                                1
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem active>
                              <PaginationLink href="#javascript">
                                2
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#javascript">
                                3
                              </PaginationLink>
                            </PaginationItem>
                            <PaginationItem>
                              <PaginationLink href="#javascript">
                                Next
                              </PaginationLink>
                            </PaginationItem>
                          </Pagination>
                        </div>
                      </Col>
                      <Col xl="6">
                        <div>
                          <div className="embed-responsive embed-responsive-21by9 lg-mt">
                            <iframe
                              width="560"
                              height="315"
                              src="https://www.youtube.com/embed/AVFqh3SkA4Q"
                              allowFullScreen=""
                              title="myFrame"
                            ></iframe>
                          </div>
                          <div className="embed-responsive embed-responsive-21by9 m-t-30">
                            <iframe
                              width="560"
                              height="315"
                              src="https://www.youtube.com/embed/4iWtjctwAI0"
                              allowFullScreen=""
                              title="myFrame"
                            ></iframe>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
      {photoIndex.isOpen && (
        <Lightbox
          mainSrc={images[photoIndex.index]}
          nextSrc={images[(photoIndex.index + 1) % images.length]}
          prevSrc={
            images[(photoIndex.index + images.length - 1) % images.length]
          }
          imageTitle={photoIndex.index + 1 + "/" + images.length}
          onCloseRequest={() => setPhotoIndex({ ...photoIndex, isOpen: false })}
          onMovePrevRequest={onMovePrev}
          onMoveNextRequest={onMoveNext}
        />
      )}
    </Fragment>
  );
};

export default Search;
