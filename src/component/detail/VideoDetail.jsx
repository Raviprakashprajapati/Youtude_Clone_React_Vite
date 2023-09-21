
import React, { useContext, useEffect, useState } from "react";
import "../../style/Home.css";
import "../../style/App.css";
import Card from "react-bootstrap/Card";
import "../../style/VideoDetail.css";
import Accordion from "react-bootstrap/Accordion";
import { VscAccount } from "react-icons/vsc";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import "../../style/Accordan.css";
import "../../style/Uiverse.css"
import Context from "../utils/Context";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import YouTube from "react-youtube";


function VideoDetail() {
  const { userChannel, setUserChannel ,likeVideo,setLikeVideo,saveVideo,setSaveVideo,historyUser,setHistoryUser,visibility} = useContext(Context);
  const [data, setData] = useState([]);
  const [comment, setComment] = useState([]);
  const [otherVideo, setOtherVideo] = useState([]);
  const { id } = useParams();
  let key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchData();
    fetchComment();
    fetchOtherVideo();
  }, [id]);

  function fetchData() {
    const url = `https://youtube138.p.rapidapi.com/video/details/?id=${id}&hl=en&gl=US`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
      },
    };

try {

  
  fetch(url, options)
  .then((value) => {
    return value.json();
  })
  .then((value) => {
    console.log("videodetails-----", value);
    setData([value]);

  // save in hisroty
  let updateHisroty = {
    image:value?.thumbnails[3]?.url,
    channelName:value?.author?.title,
    description:value?.description,
    time:value?.lengthSeconds,
    channelId:value?.author?.channelId,
    videoId:value?.videoId
  }

 
   let localPrevData = JSON.parse(localStorage.getItem("userHistory")) || []
  
   const videoExist = localPrevData.some((item)=>item.videoId==updateHisroty.videoId)

   if(!videoExist)
   {

     localPrevData.push(updateHisroty)
     localStorage.setItem('userHistory',JSON.stringify(localPrevData))
   }
  
    
  });
  
} catch (error) {
  console.log("cannot fetch video details")
  
}


  }

  function fetchComment() {
    const url = `https://youtube138.p.rapidapi.com/video/comments/?id=${id}&hl=en&gl=US`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
      },
    };

   try {
    fetch(url, options)
    .then((value) => {
      return value.json();
    })
    .then((value) => {
      // console.log(value.comments)
      setComment(value.comments);
    });
    
   } catch (error) {
    
   }
  }

  function fetchOtherVideo() {
    const url = `https://youtube138.p.rapidapi.com/video/related-contents/?id=${id}&hl=en&gl=US`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
      },
    };

  try {
    fetch(url, options)
    .then((value) => {
      return value.json();
    })
    .then((value) => {
      console.log("other related video = ", value.contents);
      setOtherVideo(value.contents);
    });

  } catch (error) {
    
  }
  }

  // view formatting--

  function formatNumber(num) {
    // console.log("NUmber ",num)
    let number = isNaN(num) ? num : 12345;
    if (number >= 1000000) {
      return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
      return (number / 1000).toFixed(1) + "K";
    } else {
      return number.toString();
    }
  }

  function handleSetting(a, t) {
    alert(a + " - " + t);
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // Optional: Adds smooth scrolling effect
    });
  };


  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const [togleIndex, setTogleIndex] = useState(false);
  function handleIndex() {
    let tt = !togleIndex;
    setTogleIndex(tt);
  }

    // accordan opne 
    const [isOpen, setIsOpen] = useState(false);
    const toggleAccordion = () => {
      setIsOpen(!isOpen);
    };





  // views
  const convertNumberToViews = (number) => {
    let num = number || 565667
    if (num < 1000) {
      return num.toString(); // Display as-is if less than 1,000
    } else if (num < 1000000) {
      return (num / 1000).toFixed(1) + 'K'; // Display as K for thousands
    } else if (num < 1000000000) {
      return (num / 1000000).toFixed(1) + 'M'; // Display as M for millions
    } else {
      return (num / 1000000000).toFixed(1) + 'B'; // Display as B for billions
    }
  };


      
  function handleUserSubcribe(channelId, subscribe, imageUser, nameOfChannel) {

    let allUser = { userChannelId: channelId, UserSubscribe: subscribe, UserImageUser: imageUser, UserName: nameOfChannel };
  
  
    const localExist = JSON.parse(localStorage.getItem("userSubcribe")) || []

    const channelIdExistsIndex = localExist.findIndex((channel) => channel.userChannelId === allUser.userChannelId);

    if (channelIdExistsIndex === -1) {
      localExist.push(allUser)
      toast("Subscribed");
      localStorage.setItem('userSubcribe',JSON.stringify(localExist))
    } 
    else
    {
      // Channel is already subscribed, remove it from the userChannel array
      localExist.splice(channelIdExistsIndex,1);
      toast("UnSubscribed");
      localStorage.setItem('userSubcribe',JSON.stringify(localExist))
    }

   
  }
  

  
  function handleLike(likeTitle, likeVideoId, likeThumbnail, likeName, likeChannelId) {
    let allInfo = { likeTitle, likeVideoId, likeThumbnail, likeName, likeChannelId };

    const localExist = JSON.parse(localStorage.getItem("userLike")) || []
    const likeExistsIndex = localExist.findIndex((video) => video.likeVideoId === allInfo.likeVideoId);
  
    if (likeExistsIndex === -1) {
      localExist.push(allInfo)
      toast("👍 Like");
      localStorage.setItem('userLike',JSON.stringify(localExist))
    } else {
      // Video is already liked, remove it from the likeVideo array
      localExist.splice(likeExistsIndex,1)
      toast("👎 unLiked");
      localStorage.setItem('userLike',JSON.stringify(localExist))
    }
  }


  function handleSave(saveThumbnail,saveTitle,saveVideoId,saveViews,SavePublishTime,saveChannelId,saveChannelImage,saveChannelName)
  {
          // Create an object with video information
        let videoInfo = {
          saveThumbnail,
          saveTitle,
          saveVideoId,
          saveViews,
          SavePublishTime,
          saveChannelId,
          saveChannelImage,
          saveChannelName,
        };
        const localExist = JSON.parse(localStorage.getItem("userSaveVideo")) || []
        // Check if the video is already saved
        const videoExistsIndex = localExist.findIndex((video) => video.saveVideoId === videoInfo.saveVideoId);

        if (videoExistsIndex === -1) {
          
          localExist.push(videoInfo)
          toast("Saved");
          localStorage.setItem('userSaveVideo',JSON.stringify(localExist))
        } else {
          localExist.splice(videoExistsIndex,1);
          toast("unSaved");
          
          localStorage.setItem('userSaveVideo',JSON.stringify(localExist))
        }

        
    
  }



  // youtde video players
  const opts = {
    height: '330',
    width: '100%',
    playerVars: {
      autoplay: 1, // Change to 1 if you want the video to autoplay
    },
  };

  const optsLaptop = {
    height: '300',
    width: '100%',
    playerVars: {
      autoplay: 1, // Change to 1 if you want the video to autoplay
    },
  };
  























  return (

    <>

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
      // visibility 
      visibility ?
      (
        
    <div>
    {isMobile ? (
      // mobiles devices

      <div className=" search-container">
        <ul className="ul-container">
          {data &&
            data.map((result, index) => (
              // return card

              <Card className="video-card bg-dark " key={index}>
                <div className="video-duration-container">
                  {/* <div className="video-container-video" > */}
                  <YouTube videoId={id} opts={opts} />
                  {/* <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${id}`}
                    controls
                    width="100%"
                    height="100%"
                  /> */}

                  {/* </div> */}
                </div>

                <Card.Body
                  style={{ backgroundColor: "black", color: "white" }}
                >
                  <Card.Text>
                    <div className="d-flex justify-content-between">
                      <h6 className="video-title">{result.title}</h6>
                      <span
                        onClick={() =>
                          handleSetting(result.author.title, result.title)
                        }
                      >
                        <BsThreeDotsVertical />
                      </span>
                    </div>

                    <div className=" d-flex justify-content-between align-items-center ">
                      <p className="video-views">
                        {/* {formatNumber(result?.stats?.views)} views */}
                        {convertNumberToViews(result?.stats?.views )|| "1.3 M"} views
                      </p>
                      <p className="video-published">
                        {result.publishedDate}
                      </p>
                    </div>




                          {/* like and save buttons-- */}
                    <div className=" d-flex gap-3 align-items-center ">
                      <div>
                        {/* line btn */}
                      <button class="cssbuttons-io" onClick={()=>handleLike(result?.title,result?.videoId,result?.thumbnails?.[3]?.url,result?.author?.title,result?.author?.channelId)} >
                          <span><svg width="512" height="512" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#000000" d="M5 9v12H1V9h4m4 12a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.06c.27.27.44.64.44 1.05l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21H9m0-2h9.03L21 12v-2h-8.79l1.13-5.32L9 9.03V19Z"/>
                        </svg> Like</span>
                        </button>
                      </div>

                        <div className="ml-2" >
                          {/* save button */}
                        <button class="cssbuttons-io" onClick={()=>handleSave(
                          result?.thumbnails?.[3]?.url,
                          result?.title,
                          result?.videoId,
                          result?.stats?.views,
                          result.publishedDate,
                          result?.author?.channelId,
                          result?.author?.avatar[0]?.url,
                          result?.author?.title
                        
                          
                          )} >
                          <span><svg width="512" height="512" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" stroke="#000000" d="M4.5 14.5v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m3 0h-12a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1h8.586a1 1 0 0 1 .707.293l3.414 3.414a1 1 0 0 1 .293.707V13.5a1 1 0 0 1-1 1Z"/>
                        </svg>Save</span>
                        </button>
                        </div>

                    </div>

               
                    

                          {/* acccordin description */}
                    <div className="mb-3 mt-3 bg-dark col-12 col-md-10 col-lg-6">
                      
                      <Accordion
                        onClick={handleIndex}
                        className="bg-dark"
                        flush
                        defaultActiveKey={null}
                      >
                        <Accordion.Item eventKey="0" className="bg-dark">
                          <Accordion.Header
                            style={{ backgroundColor: "black" }}
                            className="bg-dark text-white"
                          >
                            Description text here...
                          </Accordion.Header>

                          <Accordion.Body className="bg-dark text-white">
                            <p
                              style={{ fontSize: "13px", overflow: "hidden" }}
                            >
                              {result?.description ? result.description : "this channel has no description" }
                            </p>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>



                   


                    </div>



                      {/* image youtude name subcribe */}
                    <div
                    
                     className="mt-2 mb-2 d-flex justify-content-between align-items-center    "
                    >
                      <div
                        
                        className="d-flex justify-content-between align-items-center    "
                      >
                        {/* youtude channel link */}
                        <hr />

                        {/* left subcide side */}
                       <div>
                       <Link
                          to={`/channel/${result?.author?.channelId}`}
                          style={{ textDecoration: "none",color:"white" }}
                        >
                          <div className="d-flex justify-content-evenly align-items-center ">
                            <div>
                              <img
                                style={{ borderRadius: "50%", width: "80%" }}
                                src={result?.author?.avatar[0]?.url}
                                alt=""
                              />
                            </div>
                            <div>
                              <p>
                                <span
                                  style={{
                                    fontSize: "13px",
                                    fontWeight: "bolder",
                                  }}
                                >
                                  <b>{result?.author?.title}</b>
                                </span>
                                <span style={{ fontSize: "13px" }}>
                                  {" "}
                                  <b>{result?.author?.stats.subscribersText}</b>
                                </span>
                              </p>
                            </div>
                          </div>
                        </Link>
                        
                       </div>



                        {/* subcribe btn */}
                        <div  >
                      <button class="subcssbuttons-io"  onClick={()=>handleUserSubcribe(result?.author?.channelId,result?.author?.stats.subscribersText,result?.author?.avatar[2]?.url,result?.author?.title)} >
                          <span>
                          <svg width="512" height="512" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#ffffff" d="M57.642 34.13a2.813 2.813 0 0 0-.343-.488c-4.105-7.481-7.799-8.649-10.767-9.585c-1.056-.333-2.054-.647-2.962-1.218c-4.398-2.768-6.365-6.5-7.947-9.5c-.213-.405-.419-.798-.625-1.174c-2.877-5.276-7.446-8.181-12.863-8.181c-1.108 0-2.252.122-3.405.36c-1.618-2.371-4.299-3.039-6.716-1.562c-2.419 1.477-3.188 4.179-2.023 6.87c-4.612 5.542-5.263 12.346-1.763 18.765c.206.377.424.766.65 1.167c1.664 2.952 3.735 6.626 3.799 12.055c.014 1.133-.229 2.211-.488 3.354c-.709 3.139-1.578 7.041 2.336 14.372c.056.293.151.57.294.83c.654 1.198 2.037 1.805 4.113 1.805c4.722 0 12.768-3.124 20.996-8.15c10.352-6.326 20.079-15.386 17.714-19.72M30.99 55.115c-.001.002-.006.002-.008.004h-.006c-3.653.694-7.167-1.343-8.69-4.729c1.816-1.891 8.241-6.897 13.161-9.475a8.648 8.648 0 0 1 2.045 4.294c.787 4.634-2.12 9.067-6.502 9.906m22.543-22.79c-4.725 0-12.771 3.124-21 8.15c-7.778 4.753-15.203 11.05-17.411 15.727c-2.299-5.204-1.674-8.038-1.054-10.781c.271-1.201.552-2.443.536-3.804c-.069-5.929-2.276-9.843-4.05-12.988a91.71 91.71 0 0 1-.639-1.142C6.68 21.552 7.368 15.5 11.853 10.446l.454-.51l-.328-.6c-.408-.751-1.544-3.324 1.036-4.899c.567-.347 1.126-.523 1.66-.523c1.058 0 2.06.727 2.75 1.994l.355.653l.72-.178a15.16 15.16 0 0 1 3.633-.462c4.749 0 8.613 2.481 11.174 7.176c.2.368.403.752.612 1.15c1.689 3.204 3.791 7.191 8.627 10.234c1.117.703 2.281 1.069 3.406 1.424c2.56.807 5.195 1.651 8.326 6.45a8.41 8.41 0 0 0-.745-.03"/>
                        </svg>
                         SUBCRIBE</span>
                        </button>
                      </div>





                    
                      </div>
                    </div>




                    <div className=" mb-3 d-flex justify-content-evenly  ">
                      <button className="btn btn-dark">
                        👍Like <span>{result?.stats?.likes}</span>
                      </button>
                      <button className="btn btn-dark">✍comments </button>
                    </div>

                    <div>
                      <div className="col-12 col-md-10 col-lg-6">
                        <Accordion
                          onClick={handleIndex}
                          style={{ zIndex: "1000", maxWidth: "100%" }}
                          defaultActiveKey={null}
                          className="bg-dark"
                        >
                          <Accordion.Item
                            eventKey="0"
                            className="bg-dark text-white"
                          >
                            <Accordion.Header className="bg-dark">
                              ✍comments <span> </span>{" "}
                              <span style={{ paddingLeft: "5px" }}>
                                {result?.stats?.comments}
                              </span>{" "}
                            </Accordion.Header>

                            <Accordion.Body style={{ overflowX: "scroll" }}>

                            {
                              comment?
                              (
                                <>
                                {
                              comment.length==0? "this channel has no comments yet"
                              :
                              <>
                                {/* all comments */}
                                <div>
                                {comment.map((i, index) => {
                                  return (
                                    <div
                                      key={index}
                                      style={{ maxWidth: "100%" }}
                                      className="m-1 d-flex justify-content-evenly align-items-center flex-wrap"
                                    >
                                      <div>
                                        <img
                                          style={{
                                            borderRadius: "50%",
                                            width: "50%",
                                          }}
                                          src={i?.author?.avatar[0]?.url}
                                        />
                                      </div>
                                      <div
                                        className="d-flex flex-column justify-content-evenly align-items-center "
                                        style={{ overflow: "hidden" }}
                                      >
                                        <p style={{ fontSize: "12px" }}>
                                          {i?.content}
                                        </p>
                                        <p style={{ fontSize: "12px" }}>
                                          {i?.publishedTimeText}
                                        </p>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              
                              </>
                            }

                                </>
                                

                              ):null
                            }

                            </Accordion.Body>

                          </Accordion.Item>
                        </Accordion>
                      </div>
                    </div>
                  </Card.Text>
                </Card.Body>
              </Card>
            ))}
        </ul>
      </div>
    ) : (



      <>



        {/* laptop devices */}
        <div className=" ">
          <ul className="ul-container col-12 col-lg-6">
            {data &&
              data.map((result, index) => (
                // return card

                <Card className="video-card bg-dark " key={index}>
                  <div className="video-duration-container">
                    {/* <div className="video-container-video" > */}
                    <YouTube videoId={id} opts={optsLaptop} />
                    {/* <ReactPlayer
                      url={`https://www.youtube.com/watch?v=${id}`}
                      controls
                      width="100%"
                      height="100%"
                    /> */}

                    {/* </div> */}
                  </div>

                  <Card.Body
                    style={{ backgroundColor: "black", color: "white" }}
                  >
                    <Card.Text>
                      <div className="d-flex justify-content-between">
                        <h6 className="video-title">{result.title}</h6>
                        <span
                          onClick={() =>
                            handleSetting(result.author.title, result.title)
                          }
                        >
                          <BsThreeDotsVertical />
                        </span>
                      </div>

                      <div className=" d-flex justify-content-between align-items-center ">
                        <p className="video-views">
                          {/* {formatNumber(result?.stats?.views)} views */}
                          {convertNumberToViews(result?.stats?.views )|| "1.3 M"} views
                        </p>
                        <p className="video-published">
                          {result.publishedDate}
                        </p>
                      </div>


                      {/* like and save buttons-- */}
                      <div className=" d-flex gap-3 align-items-center ">
                      <div>
                        {/* line btn */}
                      <button class="cssbuttons-io" onClick={()=>handleLike(result?.title,result?.videoId,result?.thumbnails?.[3]?.url,result?.author?.title,result?.author?.channelId)} >
                          <span><svg width="512" height="512" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#000000" d="M5 9v12H1V9h4m4 12a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.06c.27.27.44.64.44 1.05l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21H9m0-2h9.03L21 12v-2h-8.79l1.13-5.32L9 9.03V19Z"/>
                        </svg> Like</span>
                        </button>
                      </div>

                        <div className="ml-2" >
                          {/* save button */}
                        <button class="cssbuttons-io" onClick={()=>handleSave(
                          result?.thumbnails?.[3]?.url,
                          result?.title,
                          result?.videoId,
                          result?.stats?.views,
                          result.publishedDate,
                          result?.author?.channelId,
                          result?.author?.avatar[0]?.url,
                          result?.author?.title
                         
                          
                          )} >
                          <span><svg width="512" height="512" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                            <path fill="none" stroke="#000000" d="M4.5 14.5v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3m3 0h-12a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1h8.586a1 1 0 0 1 .707.293l3.414 3.414a1 1 0 0 1 .293.707V13.5a1 1 0 0 1-1 1Z"/>
                        </svg>Save</span>
                        </button>
                        </div>

                    </div>






                      <div
                        className="mt-3 mb-3 d-flex justify-content-between align-items-center    "
                      >
                        <div
                          className="d-flex justify-content-between align-items-center    "
                        >

                          {/* left side subcribe */}
                          <div>
                          <Link
                            to={`/channel/${result?.author?.channelId}`}
                            style={{ textDecoration: "none",color:"white" }}
                          >
                            <div className="d-flex justify-content-evenly align-items-center ">
                              <div>
                                <img
                                  style={{
                                    borderRadius: "50%",
                                    width: "80%",
                                  }}
                                  src={result?.author?.avatar[0]?.url}
                                  alt=""
                                />
                              </div>
                              <div>
                                <p>
                                  <span style={{ fontSize: "13px" }}>
                                    <b>{result?.author?.title}</b>
                                  </span>
                                  <span style={{ fontSize: "13px" }}>
                                    {" "}
                                  <b>  {result?.author?.stats.subscribersText}</b>
                                  </span>
                                </p>
                              </div>
                            </div>
                          </Link>

                          </div>
                         


                           {/* subcribe btn */}
                        <div style={{marginLeft:"100px"}} >
                      <button class="subcssbuttons-io"  onClick={()=>handleUserSubcribe(result?.author?.channelId,result?.author?.stats.subscribersText,result?.author?.avatar[2]?.url,result?.author?.title)} >
                          <span>
                          <svg width="512" height="512" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#ffffff" d="M57.642 34.13a2.813 2.813 0 0 0-.343-.488c-4.105-7.481-7.799-8.649-10.767-9.585c-1.056-.333-2.054-.647-2.962-1.218c-4.398-2.768-6.365-6.5-7.947-9.5c-.213-.405-.419-.798-.625-1.174c-2.877-5.276-7.446-8.181-12.863-8.181c-1.108 0-2.252.122-3.405.36c-1.618-2.371-4.299-3.039-6.716-1.562c-2.419 1.477-3.188 4.179-2.023 6.87c-4.612 5.542-5.263 12.346-1.763 18.765c.206.377.424.766.65 1.167c1.664 2.952 3.735 6.626 3.799 12.055c.014 1.133-.229 2.211-.488 3.354c-.709 3.139-1.578 7.041 2.336 14.372c.056.293.151.57.294.83c.654 1.198 2.037 1.805 4.113 1.805c4.722 0 12.768-3.124 20.996-8.15c10.352-6.326 20.079-15.386 17.714-19.72M30.99 55.115c-.001.002-.006.002-.008.004h-.006c-3.653.694-7.167-1.343-8.69-4.729c1.816-1.891 8.241-6.897 13.161-9.475a8.648 8.648 0 0 1 2.045 4.294c.787 4.634-2.12 9.067-6.502 9.906m22.543-22.79c-4.725 0-12.771 3.124-21 8.15c-7.778 4.753-15.203 11.05-17.411 15.727c-2.299-5.204-1.674-8.038-1.054-10.781c.271-1.201.552-2.443.536-3.804c-.069-5.929-2.276-9.843-4.05-12.988a91.71 91.71 0 0 1-.639-1.142C6.68 21.552 7.368 15.5 11.853 10.446l.454-.51l-.328-.6c-.408-.751-1.544-3.324 1.036-4.899c.567-.347 1.126-.523 1.66-.523c1.058 0 2.06.727 2.75 1.994l.355.653l.72-.178a15.16 15.16 0 0 1 3.633-.462c4.749 0 8.613 2.481 11.174 7.176c.2.368.403.752.612 1.15c1.689 3.204 3.791 7.191 8.627 10.234c1.117.703 2.281 1.069 3.406 1.424c2.56.807 5.195 1.651 8.326 6.45a8.41 8.41 0 0 0-.745-.03"/>
                        </svg>
                         SUBCRIBE</span>
                        </button>
                      </div>


                        </div>
                      </div>

                      <div className=" mb-3 d-flex justify-content-evenly  ">
                        <button className="btn btn-dark">
                          👍Like <span>{result?.stats?.likes}</span>
                        </button>
                        <button className="btn btn-dark">✍comments </button>
                      </div>

                      <div></div>
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
          </ul>
        </div>

        {/* desicption and comments */}

        {data &&
          data.map((result, index) => {
            return (
              <div
                className="col-5 "
                style={{
                  position: "absolute",
                  zIndex: "1000",
                  right: "20px",
                }}
              >
                <Accordion       defaultActiveKey={null}>
                  <Accordion.Item eventKey="0" className="bg-dark text-white">
                    <Accordion.Header className="bg-dark text-white">
                      Description text here...
                    </Accordion.Header>
                    <Accordion.Body className="bg-dark text-white">
                      <p style={{ fontSize: "13px", overflow: "hidden" }}>
                      {result?.description ? result.description : "this channel has no description" }
                      </p>
                    </Accordion.Body>
                  </Accordion.Item>
                  <br />
                  <Accordion.Item eventKey="1">
                    <Accordion.Header className="bg-dark text-white">
                      ✍comments <span> </span>{" "}
                      <span style={{ paddingLeft: "5px" }}>
                        {result?.stats?.comments}
                      </span>
                    </Accordion.Header>
                    <Accordion.Body className="bg-dark text-white">

                  {
                    comment? (
                        <>
                           {
                      comment.length==0 ?
                      "this channel has no comments yet"
                      :
                      (
                        <>
                         {/* all comments */}
                      <div>
                        {comment.map((i, index) => {
                          return (
                            <div
                              key={index}
                              style={{ maxWidth: "100%" }}
                              className="m-1 d-flex justify-content-evenly align-items-center flex-wrap"
                            >
                              <div>
                                <img
                                  style={{
                                    borderRadius: "50%",
                                    width: "50%",
                                  }}
                                  src={i?.author?.avatar[0]?.url}
                                />
                              </div>
                              <div
                                className="d-flex flex-column justify-content-evenly align-items-center "
                                style={{ overflow: "hidden" }}
                              >
                                <p style={{ fontSize: "12px" }}>
                                  {i?.content}
                                </p>
                                <p style={{ fontSize: "12px" }}>
                                  {i?.publishedTimeText}
                                </p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                        </>
                      )
                     }
                        </>
                    ):null
                  }

                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            );
          })}
      </>
    )}

    <br />





          {
            isMobile?
            <br />
            :null
          }
           {
            isMobile?
            <br />
            :null
          }
           {
            isMobile?
            <br />
            :null
          }






    {/* other videos */}

    {
      
      <div
        className=" container-fluid"
        style={{ marginTop: "700px", zIndex: "-1" }}
      >
        <div className="row d-flex justify-content-center align-items-center">
          <h3 className="text-center mb-3">Related videos</h3>

          {otherVideo &&
            otherVideo.map((result, index) => {
              return (
                <div
                  className="col-12 col-md-3"
                  style={togleIndex ? { zIndex: -1 } : null}
                >
                  <Link
                    key={index}
                    to={`/video/${result?.video?.videoId}`}
                    style={{ textDecoration: "none", zIndex: "-1" }}
                  >
                    <Card
                      onClick={scrollToTop}
                      className="video-card"
                      style={{
                        backgroundColor: "black",
                        border: "1px solid black",
                      }}
                    >
                      <div className="video-duration-container">
                        <Card.Img
                          className="thumbnail"
                          variant="top"
                          src={result.video?.thumbnails?.[1]?.url}
                        />
                        <p
                          className="video-duration video-length"
                          style={{ fontSize: "10px" }}
                        >
                          {/* {videoLength} */}
                        </p>
                      </div>
                      <Card.Body
                        style={{ backgroundColor: "black", color: "white" }}
                      >
                        <Card.Text className="card-body-all">
                          <div className="d-flex justify-content-between">
                            <h6
                              className="video-title"
                              style={{ fontSize: "12px" }}
                            >
                              {result.video?.title
                                ? result.video.title
                                : "Null"}
                            </h6>
                            <span
                              className="setting"
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent the click from reaching the parent link
                                handleSetting(
                                  result.video?.author,
                                  result?.video?.title
                                );
                              }}
                            >
                              <BsThreeDotsVertical />
                            </span>
                          </div>
                          <div
                            className="d-flex jsutify-content-around"
                            style={{ fontSize: "10px" }}
                          >
                            <p className="video-views">
                              {formatNumber(
                                result.video?.stats.views
                                  ? result.video?.stats.views
                                  : 123023
                              )}{" "}
                              views
                            </p>
                            <p
                              className="video-published"
                              style={{ paddingLeft: "10px" }}
                            >
                              {result.video?.publishedTimeText}
                            </p>
                          </div>

                          <div className="video-info float-start">
                            <div
                              className="video-info-left"
                              style={{ marginTop: "-10px" }}
                            >
                              <div
                                style={{ fontSize: "14px" }}
                                className="d-flex justify-content-center"
                              >
                                {result.video?.author?.avatar[0].url ? (
                                  <img
                                    src={result.video.author?.avatar[0].url}
                                    alt="image"
                                    style={{
                                      width: "20px",
                                      height: "20px",
                                      borderRadius: "50%",
                                    }}
                                  />
                                ) : (
                                  <VscAccount />
                                )}

                                <p
                                  className="video-channel"
                                  style={{
                                    paddingLeft: "10px",
                                    fontSize: "11px",
                                  }}
                                >
                                  {result.video?.author?.title
                                    ? result.video.author.title
                                    : "title"}
                                </p>
                              </div>
                            </div>
                          </div>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Link>
                </div>
              );
            })}
        </div>
      </div>
    }
  </div>

      )
      :

      <p className="text-center"  >Go TO Home Page</p>
    }
    
    
    
    </>




  );
}

export default VideoDetail;

