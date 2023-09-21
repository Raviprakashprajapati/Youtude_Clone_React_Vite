import React, { useContext, useState } from "react";
import Context from "../utils/Context";
import { Card } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import "../../style/CardVideo.css";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function LinkVideo() {
  const { likeVideo, visibility } = useContext(Context);

  const localLike = localStorage.getItem("userLike");
  const [likedatalocal, setlikedatalocal] = useState(JSON.parse(localLike));

  function handleDeleteHistory(){
    if(likedatalocal.length)
    {
      // localStorage.removeItem('userHistory')
      localStorage.setItem("userLike",JSON.stringify([]));
      toast("All Like Videos Clear");
      window.location.reload();
    
    }}
  

  return (
    <div>
      <div>
        <h3 className="text-center"> <svg style={{width:"25px"}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ffffff" d="M5 9v12H1V9h4m4 12a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.06c.27.27.44.64.44 1.05l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21H9m0-2h9.03L21 12v-2h-8.79l1.13-5.32L9 9.03V19Z"/>
</svg> {" "} Like Videos</h3>


      {
        localStorage.getItem("userLike")  && visibility
        ?

        <>
        {localStorage.getItem("userLike") ? null : (
              <div>
                <p className="text-center">No Like Video yet</p>
              </div>
            )}
    
            {
              visibility ? null: (   <div>
                <p className="text-center">No Like Video yet</p>
              </div>)
            }
        
        </>


        :
        (
          <div>
          <p className="text-center">No Like Video yet</p>
        </div>

        ) 

      }


      {/* delete linke */}
      <ToastContainer position="top-right"
      autoClose={500}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark" />


      {
        visibility?
        (
          <button className="btn btn-danger mx-3 mt-3 mb-3"style={{fontSize:"13px"}} onClick={handleDeleteHistory}  >
             
           <b> Clear</b>{" "}
           <svg style={{width:"20px"}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#ffffff" d="M19 15.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12L19 15.59M22 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7c-.69 0-1.23-.36-1.59-.89L0 12l5.41-8.12C5.77 3.35 6.31 3 7 3h15m0 2H7l-4.72 7L7 19h15V5Z"/>
            </svg> 
            </button>
        )
        :null
      }


       



      </div>









      {

localStorage.getItem("userLike")?
(
  
    visibility ? (
      <div className=" container-fluid">
        <div className="row d-flex justify-content-center align-items-center">
          {likedatalocal.map((i, index) => {
            return (
              <div key={index} className="col-12 col-md-3">
                <Card
                  className="video-card"
                  style={{
                    backgroundColor: "black",
                    border: "1px solid black",
                  }}
                >
                  <Link
                    to={`/video/${i.likeVideoId}`}
                    style={{ textDecoration: "none" }}
                  >
                    <div className="video-duration-container">
                      <Card.Img
                        className="thumbnail"
                        variant="top"
                        src={
                          i.likeThumbnail ||
                          "https://lh3.googleusercontent.com/3zkP2SYe7yYoKKe47bsNe44yTgb4Ukh__rBbwXwgkjNRe4PykGG409ozBxzxkrubV7zHKjfxq6y9ShogWtMBMPyB3jiNps91LoNH8A=s500"
                        }
                      />
                      {/* <p className="video-duration video-length" style={{ fontSize: "10px" }}>
              {videoLength}
            </p> */}
                    </div>
                  </Link>
                  <Card.Body
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    <Card.Text className="card-body-all">
                      <div className="d-flex justify-content-between">
                        <h6
                          className="video-title"
                          style={{ fontSize: "12px" }}
                        >
                          {i.likeTitle ||
                            "Due to some problem in etching title cannot be available"}
                        </h6>
                        <span
                          className="setting"
                          //  onClick={(e) => {
                          //     e.stopPropagation();
                          //     handleSetting(author, title);
                          //   }}
                        >
                          <BsThreeDotsVertical />
                        </span>
                      </div>
                    </Card.Text>
                  </Card.Body>
                </Card>
                {/* </Link> */}
              </div>
            );
          })}
        </div>
      </div>
    ) : null


  
):null
      
      }




    </div>
  );
}

export default LinkVideo;
