import React from 'react';
import {Container,Col} from 'reactstrap'
import {Settings} from 'react-feather'
import chatdata from '../../../data/chatMember'
const Rightsidebar = (props) => {

    var images = require.context('../../../assets/images', true);

    const dynamicImage = (image) => {
      return images(`./${image}`);
    }

    return (
        <div className="right-sidebar" id="right_side_bar">
          <div>
            <Container className="p-0">
              <div className="modal-header p-l-20 p-r-20">
                <Col sm="8" className="p-0">
                  <h6 className="modal-title font-weight-bold">Contacts Status</h6>
                </Col>
                <Col sm="4" className="text-right p-0"><Settings className="mr-2" /></Col>
              </div>
            </Container>
            <div className="friend-list-search mt-0">
              <input type="text" placeholder="search friend"/><i className="fa fa-search"></i>
            </div>
            <div className="p-l-30 p-r-30">
              <div className="chat-box">
                <div className="people-list friend-list custom-scrollbar">
                  <ul className="list custom-scrollbar">
                  {chatdata.map((member,i) => {
                     return(
                           
                              <li className="clearfix" key={i}>
                                 
                                <img className="rounded-small user-image" src={dynamicImage(member.thumb)} alt=""/>
                                <div className="status-circle online"></div>
                                <div className="about">
                                  <div className="name">{member.name}</div>
                                  <div className="status">{member.status}</div>
                                </div>
                                
                              </li>
                            
                          )
                     })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
    );
}

export default Rightsidebar;