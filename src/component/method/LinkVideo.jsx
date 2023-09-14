import React, { useContext, useState } from "react";
import Context from "../utils/Context";
import { Card } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import "../../style/CardVideo.css";

function LinkVideo() {
  const { likeVideo, visibility } = useContext(Context);

  const localLike = localStorage.getItem("userLike");
  const [likedatalocal, setlikedatalocal] = useState(JSON.parse(localLike));

  return (
    <div>
      <div>
        <h3 className="text-center">Like Videos</h3>


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
