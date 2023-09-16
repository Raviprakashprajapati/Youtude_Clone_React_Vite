import React from "react";
import { Card } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { VscAccount } from "react-icons/vsc";
import "../../style/CardVideo.css"
function CardVideo({
  thumbnail,
  title,
  videoLength,
  view,
  publishTime,
  author,
  authorImage,
  videoId,
  channelDetailId
}) {
  function handleSetting(a, t) {
    alert(a + " - " + t);
  }

  return (
    
    
    <div>
    
        <Card
          className="video-card"
          style={{ backgroundColor: "black", border: "1px solid black" }}
        >
      <Link to={`/video/${videoId}`} style={{ textDecoration: "none" }}>
          <div className="video-duration-container">
            <Card.Img className="thumbnail" variant="top" src={thumbnail} />
            <p   style={{
      fontSize: "10px",
      position: "absolute",
      bottom: "0",
      right: "0",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "white",
      padding: "4px 8px",
    }} >
              {videoLength}
            </p>
          </div>
          </Link>
          <Card.Body style={{ backgroundColor: "black", color: "white" }}>
            <Card.Text className="card-body-all">
              <div className="d-flex justify-content-between">
                <h6 className="video-title"  style={{ fontSize: "12px" }}>{title}</h6>
                <span className="setting"
                 onClick={(e) => {
                    e.stopPropagation(); // Prevent the click from reaching the parent link
                    handleSetting(author, title);
                  }}
                 
                 >
                  <BsThreeDotsVertical />
                </span>
              </div>
              <div
                className="d-flex jsutify-content-around"
                style={{ fontSize: "10px" }}
              >
                <p className="video-views">{view} views</p>
                <p className="video-published" style={{ paddingLeft: "10px" }}>
                  {publishTime}
                </p>
              </div>
              
              <div className="video-info float-start">
                <div className="video-info-left" style={{ marginTop: "-10px" }}>

                  {/* channel Id */}

                 <Link to={`/channel/${channelDetailId}`} style={{textDecoration:"none"}} >
                 <div
                    style={{ fontSize: "14px" }}
                    className="d-flex justify-content-center"
                  >
                    {
                        authorImage?  <img
                        src={authorImage }
                        alt={author}
                        style={{
                          width: "20px",
                          height: "20px",
                          borderRadius: "50%",
                        }}
                      />

                        :
                        <VscAccount />

                    }

                  
                    <p
                      className="video-channel"
                      style={{ paddingLeft: "10px", fontSize: "11px",color:"white" }}
                    >
                    <b>  {author}</b>
                    </p>
                  </div>

                 </Link>



                </div>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      
    </div>
  );
}

export default CardVideo;
