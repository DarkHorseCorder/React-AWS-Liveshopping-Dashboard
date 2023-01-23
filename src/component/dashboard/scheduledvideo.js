import React, { Fragment , useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import Breadcrumb from '../common/breadcrumb/breadcrumb' 
import {Container,Row,Col,Card, CardBody} from 'reactstrap';
import { isEmpty } from "lodash"
import styles from "./AdminVideo.module.css";
import VideoPlayer from "./VideoPlayer/LiveVideoPlayer";
import {
    Button,
    Form,
    Label,
    Input,
  } from "reactstrap";

import * as config from "../../config";

function NotFoundError() {
    return (
        <>
            <h1>Error: Video not found</h1>
        </>
    );
}


const  ScheduledVideo = () => {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    let { id } = useParams();
    const [productions, setProductions] = useState('')
    const [channelArn, setChannelArn] = useState('')
    const [playbackURL, setPlayBackURL] = useState('')
    const [response, setResponse] = useState(false);
    const [apiFetched, setApiFetched] = useState(false);
    const [alreadyPassed, setAlreadyPassed] = useState(false)
    const [diff_day, setDiffDay] = useState('')
    const [diff_hour, setDiffHour] = useState('')
    const [diff_min, setDiffMin] = useState('')
    const [diff_sec, setDiffSec] = useState('')


    const setDiffTime = () => {
      if(response.Scheduled_date)
      {
        const SDate = new Date(response.Scheduled_date)
        const CDate = new Date()
        const diffMilSec = SDate.getTime() - CDate.getTime()
        // console.log(diffMilSec)
        setDiffDay(Math.trunc(diffMilSec/(1000 * 60 * 60 * 24)))
        setDiffHour(Math.trunc((diffMilSec%(1000 * 60 * 60 * 24))/(1000 * 60 * 60)))
        setDiffMin(Math.trunc((diffMilSec%(1000 * 60 * 60))/(1000 * 60)))
        setDiffSec(Math.trunc((diffMilSec%(1000 * 60))/(1000)))
      }
    }

    const fetchAPI = () => {
      // Call API and set the matched value if we're mounted
      const getVideoUrl = `${config.API_URL}/channel/${currentUser.username}/video/${id}`;
      fetch(getVideoUrl)
        .then(response => response.json())
        .then((json) => {
          if (json.Item) {
            setResponse(json.Item);
            setApiFetched(true);
            setProductions(json.Item.Productions)
            if(new Date(json.Item.Scheduled_date).getTime() < new Date().getTime()){
              setAlreadyPassed(true)
            }
            
            else
            setInterval(setDiffTime, 1000)
          }
          else {
            setResponse(null)
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
    useEffect(() => {
        // Set mounted to true so that we know when first mount has happened
        let mounted = true;
        if (mounted && !apiFetched) {
            fetchAPI()
        }
        // Set mounted to false when the component is unmounted
        return () => { 
          mounted = false 
          clearInterval(setDiffTime)
        };
    }, [fetchAPI]);

    useEffect(()=>{
      const getChannelUrl = `${config.API_URL}/channel/${currentUser.username}`;
      fetch(getChannelUrl)
        .then(response => response.json())
        .then((json) => {
          console.log(json.Item);
          setPlayBackURL(json.Item.channel_playbackURL)
          setChannelArn(json.Item.channel_arn)
        })
        .catch((error) => {
          console.error(error);
        });
    },[])
    
    if (response === null) return <NotFoundError/>
    if (isEmpty(response)) return (
        <section className="full-width screen-height fl fl-j-center fl-a-center">
        <h1> Loading ...</h1>
        </section>
    )

    

    function renderSourceType(sourcetype)
    {
      if(sourcetype == "1"){
        return "OBS Studio";
      }
      else if(sourcetype == "2"){
        return "Mobile";
      }
      else
        return "Video pre-recorded" ;
    }

    function addProduction (i) {
      // e.preventDefault();
      console.log(productions[i], channelArn);
      let current_prod = productions[i]
      try{
          fetch(`${config.API_URL}/channel/${currentUser.username}/l_video`,{
            method : 'PUT',
            header : {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              production_item_articleURL : current_prod.production_item_articleURL,
              production_item_delivery : current_prod.production_item_delivery,
              production_item_description : current_prod.production_item_description,
              production_item_discount : current_prod.production_item_discount,
              production_item_image_path : current_prod.production_item_image_path,
              production_item_name : current_prod.production_item_name,
              production_item_price : current_prod.production_item_price,
              channel_arn : channelArn,
            })
          })
          .then(response => console.log(response.json()))
          ;
        }catch(err){
          console.log(err)
        }
    }
    return (
         <Fragment>
         <Breadcrumb parent="Dashboard / scheduledvideo" title={id} caption1 = "Scheduled" caption2 = "Video" description = ""/>
         <Container fluid={true}>
            <Row>
              <Col sm="12">
                <Card>
                  <CardBody>
                    <Row>
                        <Col sm="12" md="4">
                          {alreadyPassed? 
                          <h3>Your video stream is already timed out</h3>
                          : 
                          <>
                            <h3>Your video stream comes in</h3>
                            <h3>{diff_day}D: {diff_hour}H : {diff_min}M : {diff_sec}S</h3>
                            <VideoPlayer
                                controls={true}
                                muted={true}
                                videoStream={playbackURL}
                            />
                          </>
                          }
                        </Col>
                        <Col sm="12" md="8">
                            <h3>Scheduled Video Detail</h3>
                            <Row>
                              <Col sm="6">
                                <h5>Title : <span>{response.Title}</span></h5>
                                <h5>SubTitle : <span>{response.SubTitle}</span></h5>
                                <h5>Scheduled Video Host : <span>{response.Scheduled_video_host}</span></h5>
                                <h5>Scheduled Date : <span>{response.Scheduled_date}</span></h5>
                                <h5>Source Type : <span>
                                  {renderSourceType(response.SourceType)}
                                    </span></h5>
                              </Col>
                              <Col sm="6">
                                <h5>Allow replay : <span>{response.AllowreplaySetting ? "Yes" : "No"}</span></h5>
                                <h5>Hidden live chat : <span>{response.ChatSetting ? "Yes" : "No"}</span></h5>
                                <h5>Hidden hitcounter : <span>{response.HitcounterSetting ? "Yes" : "No"}</span></h5>
                                <h5>Hidden chat while replay : <span>{response.ReplaySetting ? "Yes" : "No"}</span></h5>
                              </Col>
                            </Row>
                            <h3>Productions to insert as metadata</h3>
                            <Row className='pt-3 mx-0'>
                                {response.Productions.map((metadata_production, i) => {
                                  return (
                                    <Col sm="4" onClick={() => addProduction(i)} key={i}>
                                      <figure itemProp="associatedMedia" itemScope="">
                                        <img className="img-thumbnail" src={`${metadata_production.production_item_image_path}`} itemProp="thumbnail" alt="Image description"></img>
                                        <figcaption itemProp="caption description">Name : {metadata_production.production_item_name}</figcaption>
                                        <figcaption itemProp="caption description">Price : {metadata_production.production_item_price}</figcaption>
                                        <figcaption itemProp="caption description">Discount : {metadata_production.production_item_discount}</figcaption>
                                        <figcaption itemProp="caption description">Delivery : {metadata_production.production_item_delivery}</figcaption>
                                        <figcaption itemProp="caption description"><a href={`${metadata_production.production_item_articleURL}`}>Article URL : {metadata_production.production_item_articleURL}</a></figcaption>
                                      </figure>
                                    </Col>
                                  );
                                })}
                            </Row>
                        </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>   
          </Fragment> 
    );
}

export default ScheduledVideo;