import React,{useState,useEffect} from 'react';
import './Main.css'
import { Button,Form,Alert,Container,Row,Col,Navbar,Card,Nav,Stack,Accordion,Modal,Table,Popover,OverlayTrigger  } from 'react-bootstrap';
import { useHistory,useLocation } from 'react-router-dom';
import logo from '../logo.png';
import Axios from 'axios'

var accountNo;
var setstatement;



function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        dialogClassName="modal-90w">

        <Modal.Header closeButton>
        <Container >
        <Row>
        <Col sm={8}>
          <Modal.Title id="contained-modal-title-vcenter">
           Statement
          </Modal.Title>
          </Col>
          <Col sm={4} id="contained-modal-title-vcenter">
          <h6>
           Account No: {accountNo}
          </h6>
          </Col>
          </Row>
        </Container>
        </Modal.Header>

        <Modal.Body>
          {/* <p>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </p> */}
<Table responsive striped bordered hover>
  <thead>
    <tr>
      <th>Date</th>
      <th>Description</th>
      <th>Transaction No</th>
      <th>Credit/Debit</th>
      <th>Closing Balance</th>
    </tr>
  </thead>
  <tbody>
{setstatement}
  
    
  </tbody>

</Table>

        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  


function MainPage(){
    let history=useHistory();
    const location = useLocation();

    
    const[navLink,setnavLink]=useState("account_summary");
    const[userName,setUserName]=useState("") ;
    const[userID,setUserID]= useState("");
    const[accordion_item,setaccordion_item]= useState('');
    const[isAccordionItem,setisAccordionItem]=useState(false);
    const[validated, setValidated] = useState(false);
    const[modalShow, setModalShow] = React.useState(false);
    const[transferStatus, setTransferStatus] = useState("");
    const[transferStatusShow,setTransferStatusShow]=useState(false);

    const [uAccountNo, setuAccountNo] = useState("");
    const [bAccountNo, setbAccountNo] = useState("");
    const [amount, setamount] = useState("");
    const [remarks, setremarks] = useState("");

    const name = window.$name;

    const call=(val)=>{
        setnavLink(val);
    }

    useEffect(()=>{
        setUserName(location.state.detail.split("^")[1]);
        setUserID(location.state.detail.split("^")[0]);
        getAPIData(location.state.detail.split("^")[0]);
    },[])

    

    const getAPIData=(user_ID)=>{
        
          Axios.post('http://localhost:3001/get_account',{
          userid:user_ID
        }).then((response)=>{
            console.log(response.data);
            if(!response.data.status){
                console.log(response.data.message);
            } else{
                console.log(response.data);
                setisAccordionItem(true);
                setaccordion_item(response.data.data);
            }
        })
    }

    const viewStatement=(accountno)=>{
        
        Axios.post('http://localhost:3001/get_statement',{
          userid:userID,
          accountno:accountno
        }).then((response)=>{
            if(!response.data.status){
                //console.log(response.data.message);
                alert(response.data.message);
            } else{
                accountNo=accountno;
                setstatement=response.data.data.map((data,index)=>{
                    return( {setstatement} && <tr key={index}><td key={data.trans_Date }>{data.trans_Date}</td><td key={data.remarks }>{data.remarks}</td><td key={data.id}>{data.Id}</td><td> <div dangerouslySetInnerHTML={{__html:data.trans_type}}></div> </td><td key={data.closing_on_trans}>{data.closing_on_trans }</td></tr>)
                  });
                setModalShow(true)
            }
        })
    }

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }else{
          post();
        }
        setValidated(true);
      };

      const post=()=>{
        if(validated){
          Axios.post('http://localhost:3001/insert_tarnsfer_Fund',{
            u_userID:userID,
            u_accountname:userName,
          u_accountno:uAccountNo,
          b_accountno:bAccountNo,
          amount:amount,
          remarks:remarks,
        }).then((response)=>{
            if(!response.data.status){
              setTransferStatus(response.data.message);
              setTransferStatusShow(true);
            } else{
            setTransferStatus(response.data.message);
              setTransferStatusShow(true);
             // resetForm();
              getAPIData(userID);
            }
        console.log(response);
        })
      }
    }

   const resetForm = (event) => {
    setValidated(false);
    document.getElementById('formTransferFund').reset();
      }
    return (<div>

<Navbar bg='light'>
  <Container>
    <Navbar.Brand href="#home"><img src={logo} className='Page-logo' alt="logo"></img></Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse className="justify-content-end">
      <Navbar.Text>
      <Button style={{fontWeight:'bolder',fontSize:'2vmin',width:'200%'}} variant="outline-secondary" onClick={()=>history.push( '/login')}>Logout</Button>
      </Navbar.Text>
    </Navbar.Collapse>
  </Container>
</Navbar>
        <Container >
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
            <Row >
            <div><span className='UserName'>Greeting {userName}!</span></div>
            </Row>
            <Row >
                <Col >
                  <div className='Main-cardView' >

                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    
                        <div  >
                        <Container >  
                        <Row>
                        <Col sm="3">
                        {/* <Stack direction='horizontal' gap={3}> */}
                        <div >
                        <Container >  
                            <Col>
                                <Row>
                                    <Nav variant="pills" defaultActiveKey="account_summary" className="flex-column" onSelect={(selectedKey) => call(selectedKey)}>
                                        <Nav.Link eventKey="account_summary" >Account Summary</Nav.Link>
                                        <Nav.Link eventKey="fund_transfer" >Transfer Fund</Nav.Link>
                                    </Nav>
                                </Row>
                            </Col>
                          </Container>  
                        </div>
                        </Col>
                        <Col>
                       
                            <div className="">
                                <Col>

                                {/* Account Summary */}
                                    {navLink === 'account_summary' && 
                                     <Container >
                                        <Row>
                                            <h5>Account Summary</h5>
                                            <br/>
                                            <br/>
                                        </Row>

                                        <Row className="justify-content-center">
                                        <Container > 
                                        <Col >
                                        <Accordion >
                                            {isAccordionItem && accordion_item.map((data,index)=>(

                                                        <div key={index}>
                                                        <Accordion.Item eventKey={index} >
                                                        <Accordion.Header>
                                                        <Container>
                                                         <Row>
                                                            <Col sm=""><h5 className='Accordion-header'>{data.AccountType}</h5></Col>
                                                            <Col ><h5>Closing balance:{' '} <span style={{color:"rgb(0, 81, 136)"}}>Rs.{data.Closing_Balance}/-</span></h5> </Col>
                                                        </Row>
                                                        </Container>
                                                        </Accordion.Header>
                                                        <Accordion.Body>
                                                        <Container >
                                                            {data.AccountType!=="Credit Account" &&
                                                            <div>
                                                            <Container>
                                                            <Row>
                                                            <Col  >
                                                            <span> Account No. :</span>
                                                            <span>{data.AccountNo} </span>
                                                            </Col>
                                                            <Col >
                                                            <span> Name :</span>
                                                            <span>{data.UserID} </span>
                                                            </Col>
                                                            </Row> 
                                                            <Row>
                                                            <Col >
                                                            <span className='Accordio-header'> Branch :</span>
                                                            <span>{data.Branch} </span>
                                                            </Col>
                                                            <Col >
                                                            <span className='Accordio-header'> IFSC Code :</span>
                                                            <span>{data.IFSCCode} </span>
                                                            </Col>
                                                            </Row>
                                                            <br/>
                                                            <Row>
                                                            <Col >
                                                            <Button  variant="success" onClick={()=>viewStatement(data.AccountNo)}>View Statement</Button>{' '}
                                                            </Col>
                                                            </Row>
                                                            </Container><br/><br/> 
                                                            </div>}

                                                            {data.AccountType==="Credit Account" &&
                                                            <div>
                                                            <Row>
                                                            <Col>
                                                            <span> Card Number :</span>
                                                            <span>{data.AccountNo} </span>
                                                            </Col>
                                                            <Col>
                                                            <span className='Accordio-header'> Type :</span>
                                                            <span>{data.Card_type} </span>
                                                           
                                                            </Col>
                                                            </Row> 
                                                            <Row>
                                                            <Col>
                                                            <span> Name :</span>
                                                            <span>{data.UserID} </span>
                                                            </Col>
                                                            </Row>
                                                            <br/>
                                                            <Row>
                                                            <Col>
                                                            <Button  variant="success" onClick={()=>viewStatement(data.AccountNo)}>View Statement</Button>
                                                            </Col>
                                                            </Row>
                                                            </div>}

                                                          {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod */}
                                                         </Container>
                                                        </Accordion.Body>
                                                      </Accordion.Item>

                                                      {/* <Accordion.Item eventKey="1">
                                                        <Accordion.Header>Accordion Item #2</Accordion.Header>
                                                        <Accordion.Body>
                                                          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                          tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
                                                          veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
                                                          commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
                                                          velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                                                          cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
                                                          est laborum.
                                                        </Accordion.Body>
                                                      </Accordion.Item> */}
                                                      </div>

                                            ))}


                                        </Accordion>
                                        </Col>
                                        </Container >
                                        </Row>
                                     </Container>
                                    }

                                {/* Transfer Fund */}
                                    {navLink === 'fund_transfer' && 
                                    <Container >
                                        <Row>
                                          <Col>
                                            <h5>Fund Transfer</h5>
                                            </Col>
                                            <Col>
                                            {transferStatusShow && <span style={{color:"rgb(255, 185, 0)"}}> {transferStatus}</span>}</Col>
                                            <br/>
                                            <br/>
                                        </Row>

                                        <Row className="justify-content-center">
                                        <Container > 
                                        <Form id="formTransferFund" noValidate validated={validated}>
                                            
                                            <Form.Group as={Row} className="mb-4" controlId="formPlaintextEmail">
                                            <Col sm="4">
                                                <Form.Label >
                                                     Choose an Account
                                                </Form.Label>
                                                </Col>
                                                <Col >
                                                    <Form.Select required onChange={(e)=>{setuAccountNo(e.target.value)}}>
                                                    <option key = 'blankChoice' hidden value=''> --Select your account-- </option>
                                                    {isAccordionItem && accordion_item.map((option)=>(
                                                        <option  value={option.AccountNo}>{option.AccountType} </option>
                                                    ))}

                                                    </Form.Select>
                                                    <Form.Control.Feedback type="invalid">
                                                    Please select you account.
                                                </Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-4" controlId="formPlaintextPassword">
                                            <Col sm="4">
                                                <Form.Label >
                                                    Beneficiary Account
                                                </Form.Label>
                                                </Col>
                                                <Col >
                                                    <Form.Control type="text" placeholder="Beneficiary account" onChange={(e)=>{setbAccountNo(e.target.value)}} required />
                                                
                                                <Form.Control.Feedback type="invalid">
                                                    Please provide Beneficiary account.
                                                </Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-4" controlId="formPlaintextPassword" >
                                            <Col sm="4">
                                                <Form.Label >
                                                   Amount
                                                </Form.Label>
                                                </Col>
                                                <Col >
                                                    <Form.Control type="text" placeholder="Amount" required  onChange={(e)=>{setamount(e.target.value)}}/>
                                                
                                                <Form.Control.Feedback type="invalid">
                                                    Please add amount.
                                                </Form.Control.Feedback>
                                                </Col>
                                            </Form.Group>

                                            <Form.Group as={Row} className="mb-12" controlId="formPlaintextPassword">
                                            <Col sm="4">
                                                <Form.Label >
                                                   Remarks
                                                </Form.Label>
                                                </Col>
                                                <Col >
                                                    <Form.Control as="textarea" rows={3} placeholder="Remarks" onChange={(e)=>{setremarks(e.target.value)}}  />
                                                </Col>
                                            </Form.Group>

                                            <br/>
                                            <div as={Row} className="mb-12">
                                            <Col ></Col>
                                            <Col sm="6">

                                                <Button variant="outline-secondary" size="lg" onClick={resetForm}>
                                                            Reset
                                                 </Button>{' '}
                                                <Button variant="success" size="lg" onClick={handleSubmit} >
                                                            Send
                                                </Button>

                                            </Col>
                                            </div>

                                        </Form>
                                        </Container>
                                        </Row>
                                    </Container>
                                    }
                                </Col>
                            </div>

                        {/* </Stack> */}
                        </Col>
                        </Row>
                        </Container>
                        </div>
                  </div>
                </Col>
            </Row>
        </Container>

        <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)} />             
        
      </div>
    );
}
export default MainPage;