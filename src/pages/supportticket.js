import React, { Fragment } from "react";
import Breadcrumb from "../component/common/breadcrumb/breadcrumb";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import DataTable from "react-data-table-component";
import { supportDB } from "../data/supportdb";

const SupportTicket = () => {
  const columns = [
    {
      name: "Image",
      selector: "image",
      sortable: true,
      center: true,
    },
    {
      name: "Position",
      selector: "position",
      sortable: true,
      center: true,
    },
    {
      name: "Salary",
      selector: "salary",
      sortable: true,
      center: true,
    },
    {
      name: "Office",
      selector: "office",
      sortable: true,
      center: true,
    },
    {
      name: "Skill",
      selector: "skill",
      sortable: true,
      center: true,
    },
    {
      name: "Extn",
      selector: "extn",
      sortable: true,
      center: true,
    },
    {
      name: "Email",
      selector: "email",
      sortable: true,
      center: true,
    },
  ];

  return (
    <Fragment>
      <Breadcrumb parent="Page" title="Support Ticket" />
      <Container fluid={true}>
        <Row>
          <Col sm="12">
            <Card>
              <CardHeader>
                <h5>Support Ticket List</h5>
                <span>List of ticket opend by customers</span>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col xl="4 xl-50 box-col-6" md="6">
                    <Card className="ecommerce-widget">
                      <CardBody className="support-ticket-font">
                        <Row>
                          <div className="col-5">
                            <span>Order</span>
                            <h3 className="total-num counter">2563</h3>
                          </div>
                          <div className="col-7">
                            <div className="text-md-right">
                              <ul>
                                <li>
                                  Profit
                                  <span className="product-stts txt-success ml-2">
                                    8989
                                    <i className="icon-angle-up f-12 ml-1"></i>
                                  </span>
                                </li>
                                <li>
                                  Loss
                                  <span className="product-stts txt-danger ml-2">
                                    2560
                                    <i className="icon-angle-down f-12 ml-1"></i>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Row>
                        <div className="progress-showcase">
                          <div className="progress sm-progress-bar">
                            <div
                              className="progress-bar bg-primary"
                              role="progressbar"
                              style={{ width: "70%" }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xl="4 xl-50 box-col-6" md="6">
                    <Card className="ecommerce-widget">
                      <CardBody className="support-ticket-font">
                        <Row>
                          <div className="col-5">
                            <span>Pending</span>
                            <h3 className="total-num counter">8943</h3>
                          </div>
                          <div className="col-7">
                            <div className="text-md-right">
                              <ul>
                                <li>
                                  Profit
                                  <span className="product-stts txt-success ml-2">
                                    8989
                                    <i className="icon-angle-up f-12 ml-1"></i>
                                  </span>
                                </li>
                                <li>
                                  Loss
                                  <span className="product-stts txt-danger ml-2">
                                    2560
                                    <i className="icon-angle-down f-12 ml-1"></i>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Row>
                        <div className="progress-showcase">
                          <div className="progress sm-progress-bar">
                            <div
                              className="progress-bar bg-secondary"
                              role="progressbar"
                              style={{ width: "70%" }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xl="4 xl-50 box-col-6" md="6">
                    <Card className="ecommerce-widget">
                      <CardBody className="support-ticket-font">
                        <Row>
                          <div className="col-5">
                            <span>Running</span>
                            <h3 className="total-num counter">2500</h3>
                          </div>
                          <div className="col-7">
                            <div className="text-md-right">
                              <ul>
                                <li>
                                  Profit
                                  <span className="product-stts txt-success ml-2">
                                    8989
                                    <i className="icon-angle-up f-12 ml-1"></i>
                                  </span>
                                </li>
                                <li>
                                  Loss
                                  <span className="product-stts txt-danger ml-2">
                                    2560
                                    <i className="icon-angle-down f-12 ml-1"></i>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Row>
                        <div className="progress-showcase mt-4">
                          <div className="progress sm-progress-bar">
                            <div
                              className="progress-bar bg-warning"
                              role="progressbar"
                              style={{ width: "70%" }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xl="4 xl-50 box-col-6" md="6">
                    <Card className="ecommerce-widget">
                      <CardBody className="support-ticket-font">
                        <Row>
                          <div className="col-5">
                            <span>Smooth</span>
                            <h3 className="total-num counter">2060</h3>
                          </div>
                          <div className="col-7">
                            <div className="text-md-right">
                              <ul>
                                <li>
                                  Profit
                                  <span className="product-stts txt-success ml-2">
                                    8989
                                    <i className="icon-angle-up f-12 ml-1"></i>
                                  </span>
                                </li>
                                <li>
                                  Loss
                                  <span className="product-stts txt-danger ml-2">
                                    2560
                                    <i className="icon-angle-down f-12 ml-1"></i>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Row>
                        <div className="progress-showcase mt-4">
                          <div className="progress sm-progress-bar">
                            <div
                              className="progress-bar bg-info"
                              role="progressbar"
                              style={{ width: "70%" }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xl="4 xl-50 box-col-6" md="6">
                    <Card className="ecommerce-widget">
                      <CardBody className="support-ticket-font">
                        <Row>
                          <div className="col-5">
                            <span>Done</span>
                            <h3 className="total-num counter">5600</h3>
                          </div>
                          <div className="col-7">
                            <div className="text-md-right">
                              <ul>
                                <li>
                                  Profit
                                  <span className="product-stts txt-success ml-2">
                                    8989
                                    <i className="icon-angle-up f-12 ml-1"></i>
                                  </span>
                                </li>
                                <li>
                                  Loss
                                  <span className="product-stts txt-danger ml-2">
                                    2560
                                    <i className="icon-angle-down f-12 ml-1"></i>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Row>
                        <div className="progress-showcase mt-4">
                          <div className="progress sm-progress-bar">
                            <div
                              className="progress-bar bg-success"
                              role="progressbar"
                              style={{ width: "70%" }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                  <Col xl="4 xl-50 box-col-6" md="6">
                    <Card className="ecommerce-widget">
                      <CardBody className="support-ticket-font">
                        <Row>
                          <div className="col-5">
                            <span>Cancle</span>
                            <h3 className="total-num counter">2560</h3>
                          </div>
                          <div className="col-7">
                            <div className="text-md-right">
                              <ul>
                                <li>
                                  Profit
                                  <span className="product-stts txt-success ml-2">
                                    8989
                                    <i className="icon-angle-up f-12 ml-1"></i>
                                  </span>
                                </li>
                                <li>
                                  Loss
                                  <span className="product-stts txt-danger ml-2">
                                    2560
                                    <i className="icon-angle-down f-12 ml-1"></i>
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </Row>
                        <div className="progress-showcase">
                          <div className="progress sm-progress-bar">
                            <div
                              className="progress-bar bg-danger"
                              role="progressbar"
                              style={{ width: "70%" }}
                              aria-valuenow="25"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>
                <div className="table-responsive support-table">
                  <DataTable
                    columns={columns}
                    data={supportDB}
                    striped={true}
                    noHeader
                    pagination
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default SupportTicket;
