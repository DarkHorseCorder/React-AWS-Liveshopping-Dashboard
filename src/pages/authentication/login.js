import React, { useEffect, useState} from 'react';
import {
  Container,
  Row,
  Col,
  CardBody,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
  Alert,
} from "reactstrap";
// import { Redirect } from 'react-router';


const Login = (props) => {
  // const [loading, setLoading] = useState(false);
  // const [response, setResponse] = useState(false);

  const [login_username, set_login_username] = useState('');
  const [login_password, set_login_password] = useState('');

  const [register_username, set_register_username] = useState('');
  const [register_password, set_register_password] = useState('');
  const [register_confirm_password, set_register_confirm_password] = useState('');
  const [register_email, set_register_email ] = useState('');
  const [register_telephone, set_register_telephone] = useState('');
  const [register_website, set_register_website] = useState('');
  const [register_prodcategory, set_register_prodcategory] = useState('');

  useEffect(() => {
    localStorage.setItem('currentUser','null');
  }, []);

  const toggleform = () => {
    document.querySelector(".cont").classList.toggle("s--signup");
  };

  const sendDataToParent = (login_data) => {
    console.log(login_data)
    localStorage.setItem('currentUser',login_data);
    console.log('currentUser=========>' , JSON.parse(localStorage.getItem('currentUser')));
  }

  const userlogin =(event) =>{
    event.preventDefault();
    // setLoading(true);
    try{
      fetch('https://q1unaiuytb.execute-api.eu-west-1.amazonaws.com/user/login',{
        method : 'POST',
        header : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username : login_username,
          password : login_password
        })
      })
        .then(response => response.json())
        .then((json) => {
          console.log(json)
          if(json.Count >= 1){
            sendDataToParent(JSON.stringify(json.Items[0]))
            window.location.href = `${process.env.PUBLIC_URL}/dashboard/accueil`;
          // return <Redirect to={`${process.env.PUBLIC_URL}/dashboard/accuil`} />
          console.log("test")
          }
          else{
            document.getElementById('login_alert').style.display = 'block';
            setTimeout(()=>{document.getElementById('login_alert').style.display = 'none';}, 3000)
          }
          
        //     const users = json.Items.map(item => item.username);
        //     console.log(users)
            // this.setstate()
        });
    } catch(err){
      console.log(err)
    }
  }

  const user_register = async (event) =>{
    event.preventDefault();
    if(register_password === register_confirm_password)
    try{
      fetch('https://q1unaiuytb.execute-api.eu-west-1.amazonaws.com/user',{
        method : 'PUT',
        header : {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username : register_username,
          email : register_email,
          telephone : register_telephone,
          website : register_website,
          prodcategory : register_prodcategory,
          password : register_password
        })
      })
      .then(response => console.log(response.json()))
      ;
    }catch(err){
      console.log(err)
    }
    else{
      document.getElementById('password_alert').style.display = 'block';
      setTimeout(()=>{document.getElementById('password_alert').style.display = 'none';}, 3000)
    }
  }
  //handle input event
  const handle_login_username = (event) =>{
    event.preventDefault()
    set_login_username(event.target.value)
  }
  const handle_login_password = (event) =>{
    event.preventDefault()
    set_login_password(event.target.value)
  }
  const handle_register_username = (event) =>{
    event.preventDefault()
    set_register_username(event.target.value)
  }
  const handle_register_email = (event) =>{
    event.preventDefault()
    set_register_email(event.target.value)
  }
  const handle_register_password = (event) =>{
    event.preventDefault()
    set_register_password(event.target.value)
  }
  const handle_register_telephone = (event) =>{
    event.preventDefault()
    set_register_telephone(event.target.value)
  }
  const handle_register_website = (event) =>{
    event.preventDefault()
    set_register_website(event.target.value)
  }
  const handle_register_prodcategory = (event) =>{
    event.preventDefault()
    set_register_prodcategory(event.target.value)
  }
  const handle_register_confirm_password = (event) =>{
    event.preventDefault()
    set_register_confirm_password(event.target.value)
  }
  return (
    <div className="page-wrapper">
      <Container fluid={true} className="p-0">
        {/*  <!-- login page start--> */}
        <div className="authentication-main m-0">
          <Row>
            <Col md="12">
              <div className="auth-innerright">
                <div className="authentication-box">
                  <CardBody className="h-100-d-center">
                    <div className="cont text-center b-light">
                      <div>
                        <Form className="theme-form">
                          <h4>LOGIN</h4>
                          <h6>Entrer le nom d'utilisateur et le mot de passe qui vous ont été communiqué lors de votre validation de compte</h6>
                          <FormGroup>
                            <Label className="col-form-label pt-0">
                              Votre nom d'utilisateur
                            </Label>
                            <Input
                              className="btn-pill"
                              type="text"
                              required=""
                              value={login_username}
                              onChange={handle_login_username}
                            />
                          </FormGroup>
                          <FormGroup>
                            <Label className="col-form-label">Mot de passe</Label>
                            <Input
                              className="btn-pill"
                              type="password"
                              required=""
                              value={login_password}
                              onChange={handle_login_password}
                            />
                          </FormGroup>
                          <div className="checkbox p-0">
                            <Input id="checkbox1" type="checkbox" />
                            <Label for="checkbox1">Se souvenir de moi</Label>
                          </div>
                          <FormGroup className="form-row mt-3 mb-0">
                            <Button color="primary btn-block" onClick={userlogin}>ME CONNECTER</Button>
                          </FormGroup>
                          
                        </Form>
                      </div>
                      <div className="sub-cont">
                        <div className="img">
                          <div className="img__text m--up">
                            <h2>Vous voulez en savoir plus sur nos offres</h2>
                            <p>
                            Contacter nous pour plus d'informations
                            </p>
                          </div>
                          <div className="img__text m--in">
                            <h2>Vous voulez vous lancer dans le LIVE SHOPPING?</h2>
                            <p>
                              Contactez un de nos experts pour débuter votre première campagne!
                            </p>
                          </div>
                          <div className="img__btn" onClick={toggleform}>
                            <span className="m--up">CONTACTER NOUS</span>
                            <span className="m--in">JE ME CONNECTE</span>
                          </div>
                        </div>
                        <div>
                          <Form className="theme-form">
                            <h4 className="text-center">LIVE SHOPPING</h4>
                            <h6 className="text-center">
                              Remplissez ce formulaire pour contacter un de nos experts
                            </h6>
                            <Row form>
                              <Col md="6">
                                <FormGroup>
                                  <Input
                                    className="btn-pill"
                                    type="text"
                                    placeholder="Nom"
                                    value={register_username}
                                    onChange={handle_register_username}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="6">
                                <FormGroup>
                                  <Input
                                    className="btn-pill"
                                    type="text"
                                    placeholder="E-mail"
                                    value={register_email}
                                    onChange={handle_register_email}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="12">
                                <FormGroup>
                                  <Input
                                    className="btn-pill"
                                    type="text"
                                    placeholder="Téléphone"
                                    value={register_telephone}
                                    onChange={handle_register_telephone}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="12">
                                <FormGroup>
                                  <Input
                                    className="btn-pill"
                                    type="text"
                                    placeholder="Site web de l'entreprise"
                                    value={register_website}
                                    onChange={handle_register_website}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="6">
                                <FormGroup>
                                  <Input
                                    className="btn-pill"
                                    type="password"
                                    placeholder="Password"
                                    value={register_password}
                                    onChange={handle_register_password}
                                  />
                                </FormGroup>
                              </Col>
                              <Col md="6">
                                <FormGroup>
                                  <Input
                                    className="btn-pill"
                                    type="password"
                                    placeholder="Confirm Password"
                                    value={register_confirm_password}
                                    onChange={handle_register_confirm_password}
                                  />
                                </FormGroup>
                              </Col>
                            </Row>
                            <FormGroup>
                              <select className="custom-select" required="" value={register_prodcategory} onChange={handle_register_prodcategory}>
                                <option value="">Catégorie de produit que vous vendez</option>
                                <option value="1">Electronique</option>
                                <option value="2">Bricolage</option>
                                <option value="3">Automobile</option>
                                <option value="4">Cosmétique</option>
                                <option value="5">Vêtement Homme</option>
                                <option value="6">Vêtement Femme</option>
                                <option value="7">Chaussure</option>
                                <option value="8">Fleurs</option>
                              </select>
                            </FormGroup>
                            
                            <Row form>
                              <Col sm="4">
                                <Button color="primary" type="submit" onClick={user_register}>
                                  VALIDER
                                </Button>
                              </Col>
                              <Col sm="8">
                                <div className="text-left mt-2 m-l-20">
                                  Etes-vous déjà client?  
                                  <a
                                    className="btn-link text-capitalize"
                                    href="login.html"
                                  >
                                    Login
                                  </a>
                                </div>
                              </Col>
                            </Row>
                          </Form>
                        </div>
                      </div>
                    </div>
                  </CardBody>
                  <Alert color="danger dark" id='password_alert' style={{position :'absolute', bottom : '0px', right : '5%', display: 'none'}}>
                      <p>The password is incorrect</p>
                  </Alert>
                  <Alert color="danger dark" id='login_alert' style={{position :'absolute', bottom : '0px', right : '5%', display: 'none'}}>
                      <p>The username and password is incorrect</p>
                  </Alert>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        {/* <!-- login page end--> */}
      </Container>
    </div>
  );
};

export default Login;
