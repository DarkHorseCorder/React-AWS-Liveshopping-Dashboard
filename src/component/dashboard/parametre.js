import React, { Fragment, useEffect, useState } from 'react';
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
  Input,

} from "reactstrap";



const  Sample = (props) => {

  var currentUser = JSON.parse(localStorage.getItem('currentUser'));
  var currentUserdata
  useEffect(()=>{
    try{
      console.log('currentUser============>' , typeof(currentUser))
      console.log('currentUser Id============>' , currentUser.id)
      fetch(`https://q1unaiuytb.execute-api.eu-west-1.amazonaws.com/user/${currentUser.id}`,{
        method : 'GET',
        header : {
          "Content-Type": "application/json",
        },
        
      })
      .then(response => response.json())
      .then((json)=> {
        console.log(json)
        if(json){
        currentUserdata = json.Item
        set_customer_username(currentUserdata.username)
        set_customer_bio(currentUserdata.bio)
        set_customer_email(currentUserdata.email)
        set_customer_website(currentUserdata.website)
        set_customer_business(currentUserdata.business)
        set_customer_firstname(currentUserdata.firstname)
        set_customer_lastname(currentUserdata.lastname)
        set_customer_billingaddress(currentUserdata.bilingaddress)
        set_customer_city(currentUserdata.city)
        set_customer_codepostal(currentUserdata.codepostal)
        set_customer_pays(currentUserdata.pays)
        set_customer_introstore(currentUserdata.introstore)
        }
      })
      ;
    }catch(err){
      console.log(err)
    }
  },[])
  //Profile
  const [customer_bio, set_customer_bio] = useState('');
  const [customer_email, set_customer_email] = useState('');
  const [customer_password, set_customer_password] = useState('');
  const [customer_password_confirm, set_customer_password_confirm] = useState('');
  const [customer_website, set_customer_website] = useState('');

  //Modify Profile
  const [customer_business, set_customer_business] = useState('');
  const [customer_username, set_customer_username] = useState('');
  const [customer_firstname, set_customer_firstname]= useState('');
  const [customer_lastname, set_customer_lastname] = useState('');
  const [customer_billingaddress, set_customer_billingaddress] = useState('');
  const [customer_city, set_customer_city] = useState('');
  const [customer_codepostal, set_customer_codepostal] = useState('');
  const [customer_pays, set_customer_pays] = useState(0);
  const [customer_introstore, set_customer_introstore] = useState('');


  const handle_customer_bio = (e) =>{
    e.preventDefault();
    set_customer_bio(e.target.value)
  }

  const handle_customer_email = (e) =>{
    e.preventDefault();
    set_customer_email(e.target.value)
  }

  const handle_customer_password = (e) =>{
    e.preventDefault();
    set_customer_password(e.target.value)
  }

  const handle_customer_password_confirm = (e) =>{
    e.preventDefault();
    set_customer_password_confirm(e.target.value)
  }

  const handle_customer_website = (e) =>{
    e.preventDefault();
    set_customer_website(e.target.value)
  }

  const handle_customer_business = (e) =>{
    e.preventDefault();
    set_customer_business(e.target.value)
  }

  const handle_customer_username = (e) =>{
    e.preventDefault();
    set_customer_username(e.target.value)
  }

  const handle_customer_firstname = (e) =>{
    e.preventDefault();
    set_customer_firstname(e.target.value)
  }

  const handle_customer_lastname = (e) =>{
    e.preventDefault();
    set_customer_lastname(e.target.value)
  }

  const handle_customer_billingaddress = (e) =>{
    e.preventDefault();
    set_customer_billingaddress(e.target.value)
  }

  const handle_customer_city = (e) =>{
    e.preventDefault();
    set_customer_city(e.target.value)
  }

  const handle_customer_codepostal = (e) =>{
    e.preventDefault();
    set_customer_codepostal(e.target.value)
  }

  const handle_customer_pays = (e) =>{
    e.preventDefault();
    set_customer_pays(e.target.value)
  }

  const handle_customer_introstore = (e) =>{
    e.preventDefault();
    set_customer_introstore(e.target.value)
  }

  const save_customer_profile = (e) =>{
    e.preventDefault();
    console.log(customer_billingaddress)
    try{
      fetch(`https://q1unaiuytb.execute-api.eu-west-1.amazonaws.com/user/${currentUser.id}`,{
        method : 'POST',
        header : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username : customer_username,
          email : customer_email,
          bio : customer_bio,
          website : customer_website,
          prodcategory : 1,
          password : customer_password,
          business : customer_business,
          firstname : customer_firstname,
          lastname : customer_lastname,
          bilingaddress : customer_billingaddress,
          city : customer_city,
          codepostal : customer_codepostal,
          pays : customer_pays,
          introstore : customer_introstore
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
         <Breadcrumb parent="Dashboard" title="Parametre" caption1 = "Votre" caption2 = "Dashboard" description = "GERER L'ENSEMBLE DE VOS SESSIONS LIVE"/>
         <Container fluid={true}>
            <Row>
              <Col sm="12" md="4">
                <Card>
                  <CardHeader>
                    <h5>Mon Profil</h5>
                  </CardHeader>
                  <CardBody>
                  <Form className="theme-form">
                    <div className="row mb-2">
                      <div className="col-auto">
                        <img className="img-70 rounded-circle" alt="" src={require("../../assets/images/user/7.jpg")} />
                      </div>
                      <div className="col">
                        <h3 className="mb-1">{JSON.parse(localStorage.getItem('currentUser')).username}</h3>
                        <p className="mb-4">DESIGNER</p>
                      </div>
                    </div>
                    <div className="form-group">
                      <h6 className="form-label">Bio</h6>
                      <Input 
                        type="textarea" 
                        className="form-control" 
                        rows="5" 
                        placeholder ="wbe designer avec de nombreuses possibilités"
                        value={customer_bio}
                        onChange={handle_customer_bio}
                        required="" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">E-mail</label>
                      <Input
                        className="form-control" 
                        type="email" 
                        placeholder="your-email@domain.com"
                        value={customer_email}
                        onChange = {handle_customer_email}
                        required=""
                        />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Mot de passe</label>
                      <Input 
                        className="form-control" 
                        type="password" 
                        value={customer_password}
                        onChange={handle_customer_password}
                        required="" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Confirm passe</label>
                      <Input 
                        className="form-control" 
                        type="password" 
                        value={customer_password_confirm}
                        onChange={handle_customer_password_confirm}
                        required="" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Site Web</label>
                      <Input 
                        className="form-control" 
                        type="text" 
                        placeholder="Please insert your shop site http://Uplor .com"
                        required=""
                        value={customer_website}
                        onChange={handle_customer_website} />
                    </div>
                    <div className="form-footer">
                      <label className="form-label"></label>
                      <Button 
                        className="btn btn-primary btn-block btn-pill"
                        onClick={save_customer_profile}>
                          Save
                      </Button>
                    </div>
                  </Form>
                  </CardBody>
                </Card>
              </Col>
              <Col sm="12" md="8">
                <Card>
                  <CardHeader>
                    <h5>Modifier le Profil</h5>
                  </CardHeader>
                  <CardBody>
                  <Row>
                    <Col md="5">
                      <div className="form-group">
                        <label className="form-label">Nom de l'entreprise</label>
                        <Input 
                          className="form-control" 
                          type="text" 
                          placeholder="Nom de l'entreprise"
                          value={customer_business}
                          onChange={handle_customer_business}
                          />
                      </div>
                    </Col>
                    <Col sm="6" md="5">
                      <div className="form-group">
                        <label className="form-label">Nom d'utilisateur</label>
                        <Input 
                          className="form-control" 
                          type="text" 
                          placeholder="utilisateur"
                          value={customer_username}
                          onChange={handle_customer_username} />
                      </div>
                    </Col>
                    <Col sm="6" md="6">
                      <div className="form-group">
                        <label className="form-label">Prénom</label>
                        <Input 
                          className="form-control" 
                          type="text" 
                          placeholder="Prénom"
                          value={customer_firstname}
                          onChange={handle_customer_firstname} />
                      </div>
                    </Col>
                    <Col sm="6" md="6">
                      <div className="form-group">
                        <label className="form-label">nom de famille</label>
                        <Input 
                          className="form-control" 
                          type="text" 
                          placeholder="Nom de famille"
                          value={customer_lastname}
                          onChange={handle_customer_lastname} />
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label">Adresse de facturation</label>
                        <Input 
                          className="form-control" 
                          type="text" 
                          placeholder="Adresse de facturation"
                          value={customer_billingaddress}
                          onChange={handle_customer_billingaddress} />
                      </div>
                    </Col>
                    <Col sm="6" md="4">
                      <div className="form-group">
                        <label className="form-label">Ville</label>
                        <Input 
                          className="form-control" 
                          type="text" 
                          placeholder="Ville"
                          value={customer_city}
                          onChange={handle_customer_city} />
                      </div>
                    </Col>
                    <Col sm="6" md="3">
                      <div className="form-group">
                        <label className="form-label">Code postal</label>
                        <Input 
                          className="form-control" 
                          type="number" 
                          placeholder="Code postal"
                          value={customer_codepostal}
                          onChange={handle_customer_codepostal} />
                      </div>
                    </Col>
                    <Col md="5">
                      <div className="form-group">
                        <label className="form-label">Pays</label>
                        <select className="form-control btn-square" value={customer_pays} onChange={handle_customer_pays}>
                          <option value="0">--Select--</option>
                          <option value="1">France</option>
                          <option value="2">Belgique</option>
                          <option value="3">Suisse</option>
                          </select>
                      </div>
                    </Col>
                    <Col md="12">
                      <div className="form-group">
                        <label className="form-label">A propos ma boutique en ligne</label>
                        <textarea 
                          className="form-control" 
                          rows="5" 
                          placeholder="Merci de donner une description de vos produits en vente"
                          value={customer_introstore} 
                          onChange={handle_customer_introstore} >
                        </textarea>
                      </div>
                    </Col>
                    <Col md="12" className="text-right">
                      <Button 
                        className="btn btn-primary btn-pill" 
                        type="submit"
                        onClick={save_customer_profile} >Mise A Jour du Profil</Button>
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

export default Sample;