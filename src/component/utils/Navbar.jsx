import React, { useState } from "react";
import "../../style/navbar.css";
import { Link, useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import logo from "../../image/main logo.png";
import logooffcanva from "../../image/offcanvaLogo.png";
import { BsSearch } from "react-icons/bs";
import { FcMenu } from "react-icons/fc";

import Offcanvas from "react-bootstrap/Offcanvas";

function Navbar({ onButtonClick }) {
  const navigate = useNavigate();
  const [inputData, setInputData] = useState("");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function handleButtonClick() {
    onButtonClick(inputData);
    navigate("/search");
  }

  function handleImage() {
    navigate("/");
  }

  return (
    <>
      <div className="mb-4">
        <div
          className=" d-sm-block  container-fluid "
          style={{ backgroundColor: "black" }}
        >
          <div className="row d-flex  align-items-center  justify-content-between">
            <div className="col-12 d-flex justify-content-between align-items-center">
              <img
                src={logo}
                style={{ width: "170px" }}
                alt=""
                onClick={handleImage}
              />

              <div>
                <Button variant="" onClick={handleShow}>
                  <FcMenu style={{ fontSize: "30px" }} />
                </Button>
              </div>
            </div>

            <div className="col-10 " style={{ margin: "0 auto" }}>
              <InputGroup className="mb-3">
                <Form.Control
                  placeholder="search..."
                  aria-label="Recipient's username"
                  aria-describedby="basic-addon2"
                  value={inputData}
                  onChange={(e) => setInputData(e.target.value)}
                />
                <Button
                  variant="outline-secondary"
                  id="button-addon2"
                  onClick={handleButtonClick}
                >
                  <BsSearch />
                </Button>
              </InputGroup>
            </div>

            <div className="col-12 d-flex  justify-content-evenly  ">
              <Link to="/">
                <Button style={{ fontSize: "15px" }} variant="secondary" link>
                  Home
                </Button>{" "}
              </Link>
              <Link to="/search">
                <Button style={{ fontSize: "15px" }} variant="secondary" link>
                  Search..
                </Button>{" "}
              </Link>
              <Link to="/gaming">
                <Button style={{ fontSize: "15px" }} variant="secondary" link>
                  Marvel
                </Button>{" "}
              </Link>
              <Link to="/movie">
                <Button style={{ fontSize: "15px" }} variant="secondary" link>
                  Movie
                </Button>{" "}
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Offcanvas
        show={show}
        onHide={handleClose}
        style={{ width: "250px", backgroundColor: "#343a40" }}
        className="text-white"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {/* <b style={{ color: "red" }}>YOUTUDE BAR</b> */}
            <img src={logooffcanva} style={{width:"150px"}} alt="" />
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column  ">
            <Link to="/">
              <Button
                style={{
                  fontSize: "15px",
                  padding: "8px 25px",
                  marginBottom: "10px",
                }}
                variant="dark"
                link
              >
                Home
              </Button>{" "}
            </Link>

           

          

            <Link to="/gaming">
              <Button
                style={{
                  fontSize: "15px",
                  padding: "8px 25px",
                  marginBottom: "10px",
                }}
                variant="dark"
                link
              >
                Marvel
              </Button>{" "}
            </Link>

            <Link to="/music">
              <Button
                style={{
                  fontSize: "15px",
                  padding: "8px 25px",
                  marginBottom: "10px",
                }}
                variant="dark"
                link
              >
                Music
              </Button>{" "}
            </Link>

            <Link to="/movie">
              <Button
                style={{
                  fontSize: "15px",
                  padding: "8px 25px",
                  marginBottom: "10px",
                }}
                variant="dark"
                link
              >
                Movies
              </Button>{" "}
            </Link>


            <Link to="/subcription">
              <Button
                style={{
                  fontSize: "15px",
                  padding: "8px 25px",
                  marginBottom: "10px",
                }}
                variant="dark"
                link
              >
                <b>
                  <svg
                    style={{ width: "20px" }}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#f9c639"
                      d="M7 1h10v2h4v9h-2V5h-2v2H7V5H5v16h7v2H3V3h4V1Zm2 4h6V3H9v2Zm11 8.75v1.376c.715.184 1.352.56 1.854 1.072l1.193-.689l1 1.732l-1.192.688a4.008 4.008 0 0 1 0 2.142l1.192.688l-1 1.732l-1.193-.689A4 4 0 0 1 20 22.874v1.376h-2v-1.376a3.996 3.996 0 0 1-1.854-1.072l-1.193.689l-1-1.732l1.192-.688a4.004 4.004 0 0 1 0-2.142l-1.192-.688l1-1.732l1.193.689A3.996 3.996 0 0 1 18 15.126V13.75h2Zm-2.751 4.283a1.991 1.991 0 0 0-.25.967c0 .35.091.68.25.967l.036.063a1.999 1.999 0 0 0 3.43 0l.036-.063A1.99 1.99 0 0 0 21 19c0-.35-.09-.68-.249-.967l-.036-.063a1.999 1.999 0 0 0-3.43 0l-.036.063Z"
                    />
                  </svg>{" "}
                  Subscriptions
                </b>
              </Button>{" "}
            </Link>

            <Link to="/like">
              <Button
                style={{
                  fontSize: "15px",
                  padding: "8px 25px",
                  marginBottom: "10px",
                }}
                variant="dark"
                link
              >
                <b>
                  <svg
                    style={{ width: "20px" }}
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill="#f9c639"
                      d="M5 9v12H1V9h4m4 12a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.06c.27.27.44.64.44 1.05l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21H9m0-2h9.03L21 12v-2h-8.79l1.13-5.32L9 9.03V19Z"
                    />
                  </svg>{" "}
                  Like Videos
                </b>
              </Button>{" "}
            </Link>

            <Link to="/save">
              <Button
                style={{
                  fontSize: "15px",
                  padding: "8px 25px",
                  marginBottom: "10px",
                }}
                variant="dark"
                link
              >
                <b>
                <svg style={{width:"22px"}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="none" stroke="#eab308" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5c-2 0-6 1.2-6 6v4l-2 2h5m3-12c4.8 0 6 4 6 6v4l2 2h-5M12 5V3M9 17v1c0 1 .6 3 3 3s3-2 3-3v-1m-6 0h6"/>
</svg>{" "}
                  Save Videos
                </b>
              </Button>{" "}
            </Link>

            <Link to="/history">
              <Button
                style={{
                  fontSize: "15px",
                  padding: "8px 25px",
                  marginBottom: "10px",
                }}
                variant="dark"
                link
              >
                <b>
                <svg style={{width:"22px"}}  viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#eab308" d="M12 21q-3.45 0-6.013-2.288T3.05 13H5.1q.35 2.6 2.313 4.3T12 19q2.925 0 4.963-2.038T19 12q0-2.925-2.038-4.963T12 5q-1.725 0-3.225.8T6.25 8H9v2H3V4h2v2.35q1.275-1.6 3.113-2.475T12 3q1.875 0 3.513.713t2.85 1.924q1.212 1.213 1.925 2.85T21 12q0 1.875-.713 3.513t-1.924 2.85q-1.213 1.212-2.85 1.925T12 21Zm2.8-4.8L11 12.4V7h2v4.6l3.2 3.2l-1.4 1.4Z"/>
</svg>

                 {" "}
                  History
                </b>
              </Button>{" "}
            </Link>




          </div>
          <p style={{position:"fixed",bottom:"0px",fontSize:"12px"}} >Created By - <a href="https://raviprakashprajapati.netlify.app/" target="blank" className=" text-white " ><b>Ravi</b></a> <br />
          </p>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default Navbar;
