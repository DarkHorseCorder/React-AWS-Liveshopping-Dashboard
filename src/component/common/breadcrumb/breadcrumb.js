import React from 'react';
import {Container,Row,Col,Breadcrumb,BreadcrumbItem} from 'reactstrap'
import {Link} from 'react-router-dom'

const Breadcrumbs = (props) => {
    return (
        <Container fluid={true}>
            <div className="page-header">
              <Row>
                <Col lg="6" className="main-header">
                  <h2>{props.caption1}<span>{props.caption2}</span></h2>
                  <h6 className="mb-0">{props.description}</h6>
                </Col>
                <Col lg="6" className="breadcrumb-right">
                  <Breadcrumb>
                    <BreadcrumbItem><Link to="/default/sample-page"><i className="pe-7s-home"></i></Link></BreadcrumbItem>
                    <BreadcrumbItem>{props.parent}</BreadcrumbItem>
                    <BreadcrumbItem active>{props.title}</BreadcrumbItem>
                  </Breadcrumb>
                </Col>
              </Row>
            </div>
        </Container>
    );
}

export default Breadcrumbs;