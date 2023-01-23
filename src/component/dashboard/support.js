import React, { Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb/breadcrumb' 
import {Container,Row,Col,Card,CardHeader,CardBody} from 'reactstrap';


var awsCli = require('aws-cli-js');
var Options = awsCli.Options;
var Aws = awsCli.Aws;
var options = new Options(
  /* accessKey    */ 'ASIAT2WQ2Z7ULCINU5HK',
  /* secretKey    */ 'CWb67e0p0z/xWTCLLvWEyHFQ9IgTDcjMWWAsUyf9',
  /* sessionToken */ 'IQoJb3JpZ2luX2VjEIvwEaCWV1LXdlc3QtMSJIMEYCIQDnLGScvQdATXp/V48zeZzQqPe2DqMfObcrlc/A0+E4YQIhANkd3t5+u9V8QkqMFYK1pXUPeNJxH0pyItyUPwnFAKSkKusBCCQQABoMMjYzNTA0NzExNjU2IgxzV/sTVPHCMu02DKIqyAGJWwMgDPglDfN5ajPl6CXA+C/AUXvlkM9UUTWIJ4KBFSB3fR0boU2IRgDj1fM1DXewyoCTup0G3aajyIX4TvAgt4zwIpwhXs/CyLu8Vcbkjuhx9r7ugWMMJ/oWsUjWlDQZzVfR3lrVBvv4bR3+eHN81KCq2Xi4vPJ7VegIERsjfqh+D0cNqCl4uQ9MuU6eJ9ExTagL+zKhf2D1bwckQ7adPVyUjsRczIvbyJevmVVZt2u34uImvA/VzYoz6oPKZXq0H4cMCFqUvzC4z5mSBjqXAUeGJAWavPgkzhJNThvoTFRjbTEgzKeUUuXGKSqNis1oaNXCjnedxukk7PoWClmmXcvLjT7eu2L47bM+yV4lBxCPxrCUjtS9nZtOqDHmyqx2BHiI07VtjldDSt113ShvreXC8a4QEXocNnbbwbdQXTCJQWO0m+o34MzyuQ++JrU2U1a3mCU8byH8FO6EWRh8emwhtb5k+Jg=',
  /* currentWorkingDirectory */ null,
  /* cliPath */ 'aws'
);

var aws = new Aws(options);

const get_aws_user_list = () =>{
  console.log(aws); 
  aws.command('iam list-users').then(function (data) {
    console.log('data = ', data); 
  });
}

const  Sample = (props) => {
    return (
         <Fragment>
         <Breadcrumb parent="Default" title="Support"/>
         <Container fluid={true}>
            <Row>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <button onClick={get_aws_user_list}>Get AWS user list</button>
                  </CardHeader>
                  <CardBody>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>   
          </Fragment> 
    );
}

export default Sample;