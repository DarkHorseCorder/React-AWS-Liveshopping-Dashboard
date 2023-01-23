import React, { Fragment , useEffect, useState} from 'react';
import Breadcrumb from '../common/breadcrumb/breadcrumb' 
import {Container,Row,Col,Card,CardHeader,CardBody , Button} from 'reactstrap';
import { Link } from "react-router-dom";
// import VodCard from "./VodCard/VodCard";
import * as config from "../../config";

// import LiveAPI from "../../live-stream-api"; 
import API from "../../get-video-api";
import FormatTimestamp from "../../utility/FormatTimestamp";

function sortByKey(array, key) {
  return array.sort(function(a, b) {
    var x = a[key]; var y = b[key];
    return ((x > y) ? -1 : ((x < y) ? 1 : 0));
  });
}

const  Sample = (props) => {
  const [scheduledresponse, setScheduledResponse] = useState({});
  const [recordedresponse, setRecordedResponse] = useState({});
  const [timerID, setTimerID] = useState(false);
  var currentUser = null;
  useEffect(()=>{
    currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if(currentUser == null)
    window.location.replace("/login");
  }, [])
  const fetchAPI = () => {
    // Call API and set the matched value if we're mounted
    const getVideosUrl = `${config.API_URL}/channel/${currentUser.username}/video`;
    fetch(getVideosUrl)
    .then(response => response.json())
    .then((json) => {
      var Videos = []
      var recordedVideos = [];
      var scheduledVideos = [];
      json.Items.map((video) => {
        if(video.Scheduled_Statu == false)
        {
          recordedVideos.push(video);
        }
        else
        {
          scheduledVideos.push(video);
        }
      })
      Videos.push(recordedVideos);
      Videos.push(scheduledVideos);
      return Videos
    })
    .then(Videos => {
      // console.log(Videos)
      const sortedScheduledVods = sortByKey(Videos[0], "CreatedOn")
      const sortedRecordedVods = sortByKey(Videos[1], "CreatedOn")
      setScheduledResponse(sortedScheduledVods);
      setRecordedResponse(sortedRecordedVods);
    })
    .catch((error) => {
      console.error(error);
    });
  }

  useEffect(() => {
    let mounted = true;
    if (!timerID && mounted) {
      fetchAPI();
      const timer = setInterval(() => {
        fetchAPI();
      }, config.POLL_DELAY_MS)
      setTimerID(timer);
    }

    // Set mounted to false & clear the interval when the component is unmounted
    return () => {
      mounted = false;
      clearInterval(timerID);
    }
  }, [timerID])

  
  const formattedScheduleAPIResponse = [];

  // Format Thumbnail, title, subtitle, hint into array of objects
  for (let index = 0; index < scheduledresponse.length; index++) {
    const vod = scheduledresponse[index];
    const time = FormatTimestamp(vod.length);
    const hintMeta = `${vod.views} views • ${time}`;
    formattedScheduleAPIResponse.push({
      id: vod.id,
      title: vod.Title,
      subtitle: vod.Subtitle,
      date : vod.CreatedOn,
      length : vod.Length,
      // hint: hintMeta,
      thumbnailUrl: vod.CurrentThumbnail,
      viewer : vod.Viewers
    });
  }
  const formattedRecordAPIResponse = [];
  for (let index = 0; index < recordedresponse.length; index++) {
    const Rvod = recordedresponse[index];
    const Rtime = FormatTimestamp(Rvod.length);
    const RhintMeta = `${Rvod.views} views • ${Rtime}`;
    formattedRecordAPIResponse.push({
      id: Rvod.id,
      title: Rvod.Title,
      subtitle: Rvod.Subtitle,
      date : "" + Rvod.Scheduled_date,
      length : Rvod.Length,
      // hint: hintMeta,
      thumbnailUrl: Rvod.CurrentThumbnail,
      viewer : Rvod.Viewers
    });
  }

    return (
         <Fragment>
         <Breadcrumb parent="Dashboard" title="Accueil" caption1 = "Votre" caption2 = "Dashboard" description = "GERER L'ENSEMBLE DE VOS SESSIONS LIVE"/>
         <Container fluid={true}>
            <Row>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <div className='row justify-content-between'>
                      <h5>LIVE Vidéo Programmé</h5>
                      {currentUser != null && currentUser.state_disable == true ?
                        <Link to = {'live'}><Button>Create New Live</Button></Link>
                        :
                        <></>
                      }
                    </div>
                    
                  </CardHeader>
                  <CardBody className='row'>
                    {formattedRecordAPIResponse.map((v, i) => {
                      return (
                        <figure className="col-xl-3 col-md-4 col-6" itemProp="associatedMedia" itemScope="" key={i}>
                          <Link to={`scheduledvideo/${v.id}`}>
                          {/* <a href="dashboard" itemProp="contentUrl" data-size="1600x950"> */}
                            <img className="img-thumbnail" src={require('../../assets/images/lightgallry/01.png')} itemProp="thumbnail" alt="Image description"></img>
                          {/* </a> */}
                          <figcaption itemProp="caption description">Titre : {v.title}</figcaption>
                          <figcaption itemProp="caption description">Schedule Date : {v.date}</figcaption>
                          </Link>
                        </figure>
                      );
                    })}
                  </CardBody>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col sm="12">
                <Card>
                  <CardHeader>
                    <h5>LIVE Vidéo Terminé</h5>
                  </CardHeader>
                  <CardBody className='row'>
                  {formattedScheduleAPIResponse.map((v, i) => {
                    return (
                      // <VodCard
                      //   key={v.id}
                      //   id={v.id}
                      //   title={v.title}
                      //   subtitle={v.subtitle}
                      //   hint={v.hint}
                      //   thumbnailUrl={v.thumbnailUrl}
                      //   linkType={props.linkType}
                      // />
                      
                      <figure className="col-xl-3 col-md-4 col-6" itemProp="associatedMedia" itemScope="" key={v.id} id={v.id}>
                        <Link to={`recordvideo/${v.id}`}>
                        {/* <a href="recordvideo" itemProp="contentUrl" data-size="1600x950"> */}
                          <img className="img-thumbnail" src={v.thumbnailUrl} itemProp="thumbnail" alt="Image description"></img>
                        {/* </a> */}
                        <figcaption itemProp="caption description">{v.title}</figcaption>
                        <figcaption itemProp="caption description">{v.subtitle}</figcaption>
                        <figcaption itemProp="caption description">Date : {v.date}</figcaption>
                        <figcaption itemProp="caption description">Length : {v.length}</figcaption>
                        <figcaption itemProp="caption description">Viewer : {v.viewer}</figcaption>
                        </Link>
                      </figure>
                      
                    );
                  })}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>   
          </Fragment> 
    );
}

export default Sample;