import React, {useState, useEffect, Fragment } from 'react';
import Breadcrumb from '../common/breadcrumb/breadcrumb' 
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import AWS from 'aws-sdk'


const  Live = (props) => {
  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const ID = 'AKIAT2WQ2Z7UOZBDFSHN';
  const SECRET = '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';
  const S3_BUCKET  = 'ivs-liveshopping-s3bucket/productions/' + currentUser.username;
  const REGION ='eu-west-1';
  AWS.config.update({
    accessKeyId: ID,
    secretAccessKey: SECRET
  })
  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET},
    region: REGION,
  })
  const [progress , setProgress] = useState(0);
  const [currentChannelinfo, setCurrentChannelInfo] = useState('');
  //This is part for schedule list
  const [scheduleVideo_title , setScheduleVideoTitle] = useState('');
  const [scheduleVideo_description , ssetScheduleVideoDescription] = useState('');
  const [scheduleVideo_date , setScheduleVideoDate] = useState('');
  const [scheduleVideo_time , setScheduleVideoTime] = useState('');
  const [scheduleVideo_host , setScheduleVideoHost] = useState('');
  const [agree_policy, setAgreePolicy] = useState(false);

  //This is part for video setting part
  const [livechatsetting , setLiveChatSetting] = useState(false);
  const [showreplaysetting , setShowPlaySetting] = useState(false);
  const [hitcountersetting , setHitCounterSetting] = useState(false);
  const [allowreplaysetting , setAllowReplaySetting] = useState(false);
  //This is part for source type
  const [videosourcetype , setVideoSourceType] = useState(0);
  const [videosource , setVideoSource] = useState()
  
  //This is part for production list
  const [productions, setProductions] = useState([]);
  const [production_item_name, setProductionItemName] = useState('')
  const [production_item_description, setProductionItemDescription] = useState('')
  const [production_item_price, setProductionItemPrice] = useState('')
  const [production_item_delivery, setProductionItemDelivery] = useState('')
  const [production_item_discount, setProductionItemDiscount] = useState('')
  const [production_item_articleURL, setProductionItemArticleURL] = useState('')
  const [production_item_image, setProductionItemImage] = useState(null)
  const [production_item_image_path, setProductionItemImagePath] = useState('')

  const [productionshow_perpage, setProductionShowPerPage] = useState(10)

  const addProductionItem = async () => {
    if(!production_item_name || !production_item_description || !production_item_price || !production_item_delivery || !production_item_discount || !production_item_articleURL || production_item_image == null){
      if(!production_item_name)
        document.getElementById("invalid_prod_article").style.display = "block"
      if(!production_item_description)
        document.getElementById("invalid_prod_description").style.display = "block"
      if(!production_item_price)
        document.getElementById("invalid_prod_price").style.display = "block"
      if(!production_item_delivery)
        document.getElementById("invalid_prod_delivery").style.display = "block"
      if(!production_item_discount)
        document.getElementById("invalid_prod_discountprice").style.display = "block"
      if(!production_item_articleURL)
        document.getElementById("invalid_prod_url").style.display = "block"
      if(!production_item_image)
        document.getElementById("invalid_prod_imagefile").style.display = "block"
    }
    else{
      console.log(production_item_image_path)
      var currentProduction = {};
      await uploadFile(production_item_image)
      currentProduction.production_item_name = production_item_name;
      currentProduction.production_item_description = production_item_description;
      currentProduction.production_item_price = production_item_price;
      currentProduction.production_item_delivery = production_item_delivery;
      currentProduction.production_item_discount = production_item_discount;
      currentProduction.production_item_articleURL = production_item_articleURL;
      currentProduction.production_item_image_path = "https://ivs-liveshopping-s3bucket.s3.eu-west-1.amazonaws.com/productions/" + currentUser.username + "/" + production_item_image_path;
      console.log(currentProduction);
      setProductions([...productions, currentProduction]);
    }
  }

  const handelScheduleVideo = () => {
    if(!scheduleVideo_title || !scheduleVideo_description || !scheduleVideo_host || agree_policy === false || videosourcetype === 0 || (videosourcetype===3 && !videosource)){
      if(!scheduleVideo_title)
        document.getElementById('invalid_title').style.display = 'block';
      if(!scheduleVideo_description)
        document.getElementById('invalid_description').style.display = 'block';
      if(!scheduleVideo_host)
        document.getElementById('invalid_host').style.display = 'block';
      if(agree_policy === false)
        document.getElementById("invalid_agree").style.display = "block";
      if(videosourcetype === 0)
        document.getElementById("invalid_videotype").style.display = "block";
      if(videosourcetype===3 && !videosource){
        document.getElementById("invalid_filesource").style.display = "block"
        console.log("first")

      }
    }
    else{
      let scheduled_video ={};
      scheduled_video.scheduled_video_title = scheduleVideo_title;
      scheduled_video.scheduled_video_description = scheduleVideo_description;
      scheduled_video.scheduled_video_host = scheduleVideo_host;
      scheduled_video.scheduled_video_livechatsetting = livechatsetting;
      scheduled_video.scheduled_video_showreplaysetting = showreplaysetting;
      scheduled_video.scheduled_video_hitcountersetting = hitcountersetting;
      scheduled_video.scheduled_video_allowreplaysetting = allowreplaysetting;
      scheduled_video.scheduled_video_sourcetype = videosourcetype;
      scheduled_video.scheduled_video_source = videosource;
      scheduled_video.scheduled_video_production = productions;
      console.log(scheduled_video)
      try{
        fetch(`https://n85552qzm5.execute-api.eu-west-1.amazonaws.com/channel/${currentUser.username}/video`,{
          method : 'PUT',
          header : {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            scheduled_video_title : scheduleVideo_title,
            scheduled_video_description : scheduleVideo_description,
            scheduled_video_date : scheduleVideo_date,
            scheduled_video_time : scheduleVideo_time,
            scheduled_video_host : scheduleVideo_host,
            scheduled_video_livechatsetting : livechatsetting,
            scheduled_video_showreplaysetting : showreplaysetting,
            scheduled_video_hitcountersetting : hitcountersetting,
            scheduled_video_allowreplaysetting : allowreplaysetting,
            scheduled_video_sourcetype : videosourcetype,
            scheduled_video_source : videosource,
            scheduled_video_production : productions,
          })
        })
        .then(response => console.log(response.json()))
        ;
      }catch(err){
        console.log(err)
      }
    }
  }
  useEffect(()=>{
    // setCurrentUser(JSON.parse(localStorage.getItem('currentUser')))
    try {
      fetch(`https://n85552qzm5.execute-api.eu-west-1.amazonaws.com/channel/${currentUser.username}`,{
        method : 'GET',
        header : {
          "Content-Type": "application/json",
        },
        
      })
      .then(response => response.json())
      .then((json)=> {
        console.log(json)
        setCurrentChannelInfo(json.Item)
      })
    } catch (error) {
      console.log(error)
    }
  },[])

  const handleFileInputChange = (e) => {
    setProductionItemImage(e.target.files[0]);
    console.log(e.target.files[0]);
    setProductionItemImagePath("" + currentUser.username + new Date().valueOf().toString() + e.target.files[0].name);
  }

  const uploadFile = async (file) => {

    const params = {
        ACL: 'public-read',
        Body: file,
        Bucket: S3_BUCKET,
        Key: production_item_image_path
    };
    console.log(params.Key)
    let result = await myBucket.putObject(params).promise()
    console.log(result);
  }
    return (
         <Fragment>
         <Breadcrumb parent="Dashboard" title="Live" caption1 = "Votre" caption2 = "Dashboard" description = "GERER L'ENSEMBLE DE VOS SESSIONS LIVE"/>
         <Container fluid={true}>
            <Row>
              <Col sm="12" md="6">
                <Card>
                  <CardHeader>
                    <h5>Programmez Votre LIVE Vidéo</h5><span>Commencer dès maintenant à programmer votre session LIVE vidéo . Consulter notre guide utilisateur pour plus d'information.</span>
                  </CardHeader>
                  <CardBody>
                  <Form 
                    className="needs-validation" 
                    noValidate=""
                  >
                      <div className="form-row">
                        <Col md="4 mb-3">
                          <Label htmlFor="validationCustom01">Titre</Label>
                          <Input 
                            className="form-control" 
                            type="text" 
                            placeholder="Titre" 
                            required=""
                            value={scheduleVideo_title}
                            onChange = {
                              (e) => {
                                document.getElementById('invalid_title').style.display = 'none';
                                setScheduleVideoTitle(e.target.value)
                              }
                            }
                          />
                          <div id="invalid_title" className="invalid-feedback">Merci d'entrer une title valide.</div>
                        </Col>
                      </div>
                      <div className="form-row">
                        <Col md="12 mb-6">
                          <Label htmlFor="exampleFormControlTextarea4">Description</Label>
                            <Input 
                              type='textarea'
                              className="form-control" 
                              placeholder="Description" 
                              rows="3"
                              value={scheduleVideo_description}
                              onChange = {
                                (e) => {
                                  document.getElementById('invalid_description').style.display = 'none';
                                  ssetScheduleVideoDescription(e.target.value)
                                }
                              }
                            />
                          <div id="invalid_description" className="invalid-feedback">Merci d'entrer une description valide.</div>
                        </Col>
                      </div>
                      <div className="form-group form-row">
                        <Label className="col-sm-3 col-form-Label">Time Only</Label>
                        <div className="col-xl-5 col-sm-7 col-lg-8">
                          <Input 
                            className="form-control btn-pill" 
                            type="time" 
                            value={scheduleVideo_time}
                            onChange = {
                              (e) => {
                                setScheduleVideoTime(e.target.value)
                                document.getElementById('invalid_time').style.display = 'none';
                              }
                            }
                          />
                        </div>
                        <div id="invalid_time" className="invalid-feedback">Merci d'entrer une time valide.</div>
                      </div> 
                      <div className="form-group form-row">
                        <Label className="col-sm-3 col-form-Label">Date Only</Label>
                        <div className="col-xl-5 col-sm-7 col-lg-8">
                          <Input 
                            className="form-control btn-pill" 
                            type="date"
                            value={scheduleVideo_date}
                            onChange = {
                              (e) => {
                                setScheduleVideoDate(e.target.value)
                                document.getElementById('invalid_date').style.display = 'none';
                              }
                            }
                          />
                        </div>
                        <div id="invalid_date" className="invalid-feedback">Merci d'entrer une date valide.</div>
                      </div> 
                      <div className="form-row">
                        <Col md="6 mb-3">
                          <Label htmlFor="validationCustom03">Host</Label>
                          <Input 
                            className="form-control" 
                            type="text" 
                            placeholder="Host" 
                            required=""
                            value={scheduleVideo_host}
                            onChange = {
                              (e) => {
                                document.getElementById('invalid_host').style.display = 'none';
                                setScheduleVideoHost(e.target.value)
                              }
                            }
                          />
                          <div id="invalid_host" className="invalid-feedback">Merci de donner un host valide.</div>
                        </Col>
                      </div>
                      <div className="form-group">
                        <div className="form-check">
                          <div className="checkbox p-0">
                            <Input 
                              type="checkbox" 
                              required=""
                              value={agree_policy}
                              id="policyCheck"
                            />
                            <Label 
                              className="form-check-Label" 
                              htmlFor="policyCheck"
                              onClick = {
                                (e) => {
                                  setAgreePolicy(!agree_policy)
                                  document.getElementById("invalid_agree").style.display = "none"
                                  console.log(agree_policy)
                                }
                              }
                            >
                                Je suis d'accord avec les conditions générales d'utilisation
                            </Label>
                          </div>
                          <div id="invalid_agree" className="invalid-feedback">Vous devez cocher la case avant validation.</div>
                        </div>
                      </div>
                      {/* <Button className="btn btn-primary" type="submit">Valider</Button> */}
                    </Form>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>
                    <h5>Paramêtre Du Lecteur Vidéo</h5><span>Commencer dès maintenant à programmer votre session LIVE vidéo . Consulter notre guide utilisateur pour plus d'information.</span>
                  </CardHeader>
                  <CardBody>
                  <Form>
                      <div className="form-row">
                        <div className="form-group">
                          <div className="media">
                            <Label className="col-form-Label m-r-10">Cacher le chat en live</Label>
                            <div className="media-body text-right  icon-state">
                              <Label className="switch">
                                <Input 
                                  type="checkbox" 
                                  value={livechatsetting} 
                                  onChange = {(e) => {setLiveChatSetting(e.target.checked)}} 
                                />
                                <span className="switch-state"></span>
                              </Label>
                            </div>
                          </div>
                          <div className="media">
                            <Label className="col-form-Label m-r-10">Cacher le chat lors du replay</Label>
                            <div className="media-body text-right  icon-state">
                              <Label className="switch">
                                <Input type="checkbox"  value={showreplaysetting} onChange = {(e) => {setShowPlaySetting(e.target.checked)}} /><span className="switch-state"></span>
                              </Label>
                            </div>
                          </div>
                          <div className="media">
                            <Label className="col-form-Label m-r-10">Cacher le compteur de visites</Label>
                            <div className="media-body text-right icon-state">
                              <Label className="switch">
                                <Input type="checkbox" value={hitcountersetting} onChange = {(e) => {setHitCounterSetting(e.target.checked)}} /><span className="switch-state"></span>
                              </Label>
                            </div>
                          </div>
                          <div className="media">
                            <Label className="col-form-Label m-r-10">Autoriser le replay</Label>
                            <div className="media-body text-right icon-state">
                              <Label className="switch">
                                <Input type="checkbox" value={allowreplaysetting} onChange = {(e) => {setAllowReplaySetting(e.target.checked)}} /><span className="switch-state"></span>
                              </Label>
                            </div>
                          </div>
                        </div>
                      </div>
                      </Form>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>
                    <h5>Source De Votre Vidéo</h5><span>Vous pouvez soit streamer votre live depuis votre smartphone, soit streamer depuis votre ordianteur en utilisant un logiciel comme OBS, ou alors déposer une vidéo pré-enregistrer.</span>
                  </CardHeader>
                  <CardBody>
                  <Form>
                      <div className="form-row">
                        <div className="form-group">
                          <Label htmlFor="validationDefault03">Vous pouvez choisir ici la source de votre vidéo à diffuser</Label>
                          <Input 
                            type="select" 
                            className="custom-select" 
                            required=""  
                            value={videosourcetype} 
                            onChange={
                              (e) => {
                                setVideoSourceType(e.target.value)
                                if(e.target.value == 0){
                                  document.getElementById("invalid_videotype").style.display = "block"
                                }
                                else document.getElementById("invalid_videotype").style.display = "none"
                              }
                            }
                          >
                            <option value="">Choisissez la source de la vidéo</option>
                            <option value="1">Application smartphone</option>
                            <option value="2">OBS sur ordinateur</option>
                            <option value="3">Vidéo pré-enregistrée</option>
                          </Input>
                          <div id="invalid_videotype" className="invalid-feedback">Example invalid custom select feedback</div>
                        </div>
                        {
                          videosourcetype == 3 ?
                            <div className="custom-file m-b-20">
                              <Input 
                                className="custom-file-input" 
                                type="file" 
                                required="" 
                                onChange={
                                  (e)=> {
                                    setVideoSource(e.target.files[0])
                                    document.getElementById("invalid_filesource").style.display = "none"
                                  }
                                }  
                              />
                              <Label className="custom-file-label" htmlFor="validatedCustomFile">Choisir votre fichier vidéo au format .mp4...</Label>
                              <div id="invalid_filesource" className="invalid-feedback">Example invalid custom file feedback</div>
                            </div>
                          :
                          <></>
                        }
                      </div>
                      {/* <Button className="btn btn-primary" type="submit">Valider</Button> */}
                    </Form>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>
                    <h5>Code D'ingestion Du Stream</h5><span>Copier / coller l'url du serveur RTMP dans votre logiciel de stream ou sur une application de stream de votre smartphone.</span>
                  </CardHeader>
                  <CardBody>
                    <Form className="needs-validation" noValidate="">
                      <div className="form-row">
                        <Col md="12 mb-6">
                          <Label htmlFor="validationCustom03">Serveur RTMP</Label>
                          <Input readOnly className="form-control" type="text" placeholder="rtmps://8be14badebca.global-contribute.live-video.net:443/app/" required="" value={currentChannelinfo.channel_ingestserver}/>
                        </Col>
                      </div>

                      <div className="form-row">
                        <Col md="12 mb-6">
                          <Label htmlFor="validationCustom03">Clé de stream</Label>
                          <Input readOnly className="form-control" type="text" placeholder="sk_eu-west-1_J7RjK5VttCW6_smPa4C8khzuGjCAaZ8bJE2AdniEG4i" required="" value={currentChannelinfo.streamkey}/>
                        </Col>
                      </div>

                      <div className="form-row">
                        <Col md="12 mb-6">
                          <Label htmlFor="validationCustom03">Playback URL</Label>
                          <Input readOnly className="form-control" type="text" placeholder="https://6978a891354b.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.263504711656.channel.ON1mIX5kLymP.m3u8" required="" value={currentChannelinfo.channel_playbackURL}/>
                        </Col>
                      </div>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" md="6">
                <Card>
                  <CardHeader>
                    <h5>Produits À Mettre En Avant</h5><span>Ces produits apparaitront sur la vidéo LIVE de votre session . Vous pourrez promouvoir ceux-ci dans votre live.</span>
                  </CardHeader>
                  <CardBody>
                  <Form className="needs-validation" noValidate="">
                      <div className="form-row">
                        <Col md="4 mb-3">
                          <Label htmlFor="validationCustom01">Nom de l'article</Label>
                          <Input 
                            className="form-control" 
                            type="text" 
                            value={production_item_name} 
                            onChange = {
                              (e) => {
                                setProductionItemName(e.target.value)
                                document.getElementById("invalid_prod_article").style.display = "none"
                              }
                            } 
                            placeholder = "Veuillez insérer le nom de l'article du produit" 
                            required=""
                          />
                          <div id="invalid_prod_article"  className="invalid-feedback">Merci d'entrer une article valide.</div>
                        </Col>
                      </div>
                      <div className="form-row">
                        <Col md="6 mb-3">
                          <Label htmlFor="exampleFormControlTextarea4">Désignation</Label>
                          <Input 
                            type="textarea" 
                            className="form-control" 
                            placeholder="designation" 
                            value={production_item_description}
                            onChange = {(e) => 
                              {
                                setProductionItemDescription(e.target.value)
                                document.getElementById("invalid_prod_description").style.display = "none"
                              }
                            }
                            rows="3"
                          />
                          <div id="invalid_prod_description"  className="invalid-feedback">Merci d'entrer une désignation valide.</div>
                        </Col>
                       </div>
                       <div className="form-row">
                        <Col md="6 mb-3">
                          <Label htmlFor="exampleFormControlTextarea4">Prix</Label>
                          <Input 
                            className="form-control" 
                            placeholder="Prix" 
                            rows="3"
                            value = {production_item_price}
                            onChange = {(e) => 
                              {
                                setProductionItemPrice(e.target.value)
                                document.getElementById("invalid_prod_price").style.display = "none"
                              }
                            }
                          />
                          <div id="invalid_prod_price" className="invalid-feedback">Merci d'entrer une désignation valide.</div>
                        </Col>
                       </div>
                       <div className="form-row">
                        <Col md="6 mb-3">
                          <Label htmlFor="exampleFormControlTextarea4">Remise</Label>
                          <Input 
                            className="form-control" 
                            placeholder="Remise" 
                            rows="3"
                            value={production_item_delivery}
                            onChange = {(e) => 
                              {
                                setProductionItemDelivery(e.target.value)
                                document.getElementById("invalid_prod_delivery").style.display = "none"
                              }
                            }
                          />
                          <div id="invalid_prod_delivery" className="invalid-feedback">Merci d'entrer une désignation valide.</div>
                        </Col>
                       </div>
                       <div className="form-row">
                        <Col md="6 mb-3">
                          <Label htmlFor="exampleFormControlTextarea4">Prix avec remise</Label>
                          <Input 
                            className="form-control" 
                            placeholder="Prix avec remise" 
                            rows="3"
                            value={production_item_discount}
                            onChange = {(e) => 
                              {
                                setProductionItemDiscount(e.target.value)
                                document.getElementById("invalid_prod_discountprice").style.display = "none"
                              }
                            }
                          />
                          <div id="invalid_prod_discountprice" className="invalid-feedback">Merci d'entrer une désignation valide.</div>
                        </Col>
                       </div>
                      <div className="form-row">
                        <Col md="6 mb-3">
                          <Label htmlFor="validationCustom03">Url de l'article</Label>
                          <Input 
                            className="form-control" 
                            type="text" 
                            placeholder="url" 
                            required=""
                            value={production_item_articleURL}
                            onChange = {(e) => 
                              {
                                setProductionItemArticleURL(e.target.value)
                                document.getElementById("invalid_prod_url").style.display = "none"
                              }
                            }
                          />
                          <div id="invalid_prod_url" className="invalid-feedback">Merci de donner une url valide.</div>
                        </Col>
                       </div>
                      <div className="form-row">
                          <Col md="6 mb-3">
                            <Label htmlFor="validationCustom04">Image de l'article</Label>
                          </Col>
                          <div className="custom-file">
                          <Input 
                            className="custom-file-input"
                            type="file" 
                            required=""                      
                            onChange={(e) => 
                              {
                                handleFileInputChange(e)
                                document.getElementById("invalid_prod_imagefile").style.display = "none"
                              }
                            }
                          />
                          <Label className="custom-file-label" htmlFor="validatedCustomFile">Choisir votre fichier image au format .jpg</Label>
                          <div id="invalid_prod_imagefile" className="invalid-feedback">Invalid custom file feedback</div>
                        </div>
                      </div>
                      <div className="form-group">
                      </div>
                      <Button className="btn btn-primary m-t-20" type="button" onClick={addProductionItem}>Ajouter l'article</Button>
                    </Form>
                  </CardBody>
                  <CardBody>
                  <div className="table-responsive product-table">
                      <div id="basic-1_wrapper" className="dataTables_wrapper no-footer">
                        <div className="dataTables_length" id="basic-1_length">
                          <label>
                            Show 
                            <select name="basic-1_length" aria-controls="basic-1" className="" value={productionshow_perpage} onChange = {e => {setProductionShowPerPage(e.target.value)}}>
                              <option value="10">10</option>
                              <option value="25">25</option>
                              <option value="50">50</option>
                              <option value="100">100</option>
                            </select> 
                            entries
                          </label>
                        </div>
                        <div id="basic-1_filter" className="dataTables_filter">
                          <label>Search:
                            <Input type="search" className="" placeholder="" aria-controls="basic-1"/>
                          </label>
                        </div>
                        <table className="display dataTable no-footer" id="basic-1" role="grid" aria-describedby="basic-1_info">
                          <thead>
                            <tr role="row">
                              <th className="sorting" tabIndex="0" aria-controls="basic-1" rowSpan="1" colSpan="1" aria-label="Image: activate to sort column ascending" style={{width: "64.5px"}}>Image</th>
                              <th className="sorting_asc" tabIndex="0" aria-controls="basic-1" rowSpan="1" colSpan="1" aria-label="Description: activate to sort column descending" style={{width: "165.297px"}} aria-sort="ascending">Description</th>
                              <th className="sorting" tabIndex="0" aria-controls="basic-1" rowSpan="1" colSpan="1" aria-label="Prix: activate to sort column ascending" style={{width: "27.7031px"}}>Prix</th>
                              <th className="sorting" tabIndex="0" aria-controls="basic-1" rowSpan="1" colSpan="1" aria-label="Remise: activate to sort column ascending" style={{width: "53.9219px"}}>Remise</th>
                              <th className="sorting" tabIndex="0" aria-controls="basic-1" rowSpan="1" colSpan="1" aria-label="Prix remisé: activate to sort column ascending" style={{width: "52.2031px"}}>Prix remisé</th>
                              <th className="sorting" tabIndex="0" aria-controls="basic-1" rowSpan="1" colSpan="1" aria-label="Action: activate to sort column ascending" style={{width: "132.875px"}}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {productions.length > 0 ? 
                              productions.map((production) => (
                                <tr key={production.production_item_image_path} role="row" className="odd">
                                  <td className=""><img src={production.production_item_image_path} alt="" style={{width : '50px', height : '50px'}} /></td>
                                  <td className="sorting_1">
                                    <h6> {production.production_item_name} </h6>
                                    <p>{production.production_item_description}</p>
                                  </td>
                                  <td className="">${production.production_item_price}</td>
                                  <td className="font-success">{production.production_item_delivery}</td>
                                  <td>{production.production_item_discount}</td>
                                  <td>
                                    <button className="btn btn-danger btn-xs" type="button" data-original-title="btn btn-danger btn-xs" title="">Supprimer</button>
                                    <button className="btn btn-success btn-xs" type="button" data-original-title="btn btn-danger btn-xs" title="">Effacer</button>
                                  </td>
                                </tr>
                              ))
                            : <tr  role="row" className="odd">
                                <td colSpan={6}>
                                  Insert the products please...
                                </td>
                              </tr>
                            }
                          </tbody>
                        </table>
                        <div className="dataTables_info" id="basic-1_info" role="status" aria-live="polite">Showing 1 to 6 of {productions.length} entries</div>
                        <div className="dataTables_paginate paging_simple_numbers" id="basic-1_paginate">
                          <a className="paginate_button previous disabled" aria-controls="basic-1" data-dt-idx="0" tabIndex="0" id="basic-1_previous">Previous</a>
                          <span>
                            <a className="paginate_button current" aria-controls="basic-1" data-dt-idx="1" tabIndex="0">1</a>
                          </span>
                          <a className="paginate_button next disabled" aria-controls="basic-1" data-dt-idx="2" tabIndex="0" id="basic-1_next">Next</a>
                          </div>
                        </div>
                    </div>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader>
                    <h5>Pour terminer la programmation vidéo.</h5>
                  </CardHeader>
                  <CardBody>
                    <Button className="btn btn-primary" type="submit" onClick={handelScheduleVideo}>Enregistrer le programme vidéo</Button>
                  </CardBody>
                </Card>
              </Col>
              
            </Row>
          </Container>   
          </Fragment> 
    );
}

export default Live;