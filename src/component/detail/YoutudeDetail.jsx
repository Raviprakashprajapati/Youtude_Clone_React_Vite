import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CardVideo from "../detail/CardVideo";
import Accordion from "react-bootstrap/Accordion";
import Button from 'react-bootstrap/Button';
import Context from "../utils/Context";
import CommunityDetail from "./CommunityDetail";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function YoutudeDetail() {
  const [communityVisible,setCommunityVisible] = useState(false);
  const [communityId,setCommunityId] = useState("");
  const [communityData,setCommunityData] = useState([]);
  const [communityAandI,setCommunityAuthorAndImage] = useState({});
  const { visibility,userChannel,setUserChannel } = useContext(Context);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [dataVideo, setDataVideo] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [saveName, setSaveName] = useState([]);
  // const {} = useContext(Context)
  // console.log("youtude channel id = ", id);
  let key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchYoutudeChannel();
    
  }, []);

  useEffect(() => {
    fetchChannelVideo();
  }, []);

  useEffect(()=>{
    fetchCommunity()
  },[communityVisible])

  function fetchYoutudeChannel() {
    const url = `https://youtube138.p.rapidapi.com/channel/details/?id=${id}&hl=en&gl=US`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        console.log(value);
        setData(value);
        setSaveName([value?.title, id]);
      });
  }

  function fetchChannelVideo(next = null) {
    const url = next
      ? `https://youtube138.p.rapidapi.com/channel/videos/?id=${id}&hl=en&gl=US`
      : `https://youtube138.p.rapidapi.com/channel/videos/?id=${id}&cursor=${nextUrl}&hl=en&gl=US`;
    // const url = `https://youtube138.p.rapidapi.com/channel/videos/?id=${id}&hl=en&gl=US`;
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": key,
        "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
      },
    };

    fetch(url, options)
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        setDataVideo(value.contents);
        setNextUrl(value.cursorNext);
        console.log(" channel id video =  ", value);
      });
  }

  function fetchCommunity(){
    let key = import.meta.env.VITE_API_KEY;
    const url = `https://youtube138.p.rapidapi.com/channel/community/?id=${communityId}`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'youtube138.p.rapidapi.com'
        }
    };
    fetch(url, options)
    .then((value)=>{
      return value.json();
    })
    .then((value)=>{
      setCommunityData(value.contents)
    })
  }

  function hanldeNext() {
    console.log(nextUrl);
    fetchChannelVideo(nextUrl);
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const imageWidth = windowWidth <= 768 ? "100" : "50"; // 768px is a common mobile breakpoint
  const imageStyle = {
    width: `${imageWidth}%`,
  };

  const convertNumberToTime = (number) => {
    let num = number || 545;
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours} : ${minutes}`;
  };

  const convertNumberToViews = (number) => {
    let num = number || 45646;

    if (num < 1000) {
      return num.toString(); // Display as-is if less than 1,000
    } else if (num < 1000000) {
      return (num / 1000).toFixed(1) + "K"; // Display as K for thousands
    } else if (num < 1000000000) {
      return (num / 1000000).toFixed(1) + "M"; // Display as M for millions
    } else {
      return (num / 1000000000).toFixed(1) + "B"; // Display as B for billions
    }
  };

  function trimLength(text, maxLength) {
    if (text.length <= maxLength) {
      return text; // Return the original text if it's shorter than or equal to the maxLength
    } else {
      return text.substring(0, maxLength) + "..."; // Truncate the text and add ellipsis
    }
  }

  function handleCommunity(channelKeId,author,image)
  {

    setCommunityVisible(!communityVisible);
    setCommunityId(channelKeId)
    setCommunityAuthorAndImage({author,image})

  }



      
  function handleUserSubcribe(channelId, subscribe, imageUser, nameOfChannel) {

    let allUser = { userChannelId: channelId, UserSubscribe: subscribe, UserImageUser: imageUser, UserName: nameOfChannel };
    // console.log("channelId: " + channelId);
  
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
      // true
      visibility
      ?
      <div>

      <div className="container">
        <div className="fixed-button">
          <button
            style={{ fontSize: "12px" }}
            className="btn btn-danger"
            onClick={hanldeNext}
          >
            Next
          </button>
        </div>
      </div>

      {/* channel details */}

      <div className="container-fluid bg-dark ">
        <div className="row ">
          <div className="col-sm-12 col-md-8   mx-auto ">
            <div
              className=" d-flex justify-content-center flex-column "
              style={{ backgroundColor: "#3d4147", color: "white" }}
            >
              <img
                src={data.banner?.mobile[0]?.url}
                className="mx-auto "
                alt=""
                style={imageStyle}
              />

              <div className="d-flex justify-content-center align-items-center flex-column  gap-4 mt-4 ">
                <div className="d-flex justify-content-evenly align-items-center gap-4 ">
                  {/* <img src={data?.avatar[0]?.url } className='rounded-5 ' alt="" /> */}
                  <img
                    style={{ width: "50px" }}
                    src={
                      data?.avatar?.[0]?.url
                        ? data.avatar[0].url
                        : "https://img.freepik.com/premium-vector/red-youtube-logo-social-media-logo_197792-1803.jpg"
                    }
                    className="rounded-5 "
                    alt=""
                  />

                  <div className=" border-2 border-dark p-3 rounded ">
                    <h4>{data?.title}</h4>
                    <p>{data?.username}</p>
                    <p>{data?.country}</p>
                  </div>
                </div>
                     {/* subcribe btn */}
                     <div  >
                      <button class="subcssbuttons-io" onClick={()=>handleUserSubcribe(data?.channelId,data?.stats.subscribersText, data?.avatar?.[0]?.url,data?.title)}   >
                          <span>
                          <svg width="512" height="512" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
                            <path fill="#ffffff" d="M57.642 34.13a2.813 2.813 0 0 0-.343-.488c-4.105-7.481-7.799-8.649-10.767-9.585c-1.056-.333-2.054-.647-2.962-1.218c-4.398-2.768-6.365-6.5-7.947-9.5c-.213-.405-.419-.798-.625-1.174c-2.877-5.276-7.446-8.181-12.863-8.181c-1.108 0-2.252.122-3.405.36c-1.618-2.371-4.299-3.039-6.716-1.562c-2.419 1.477-3.188 4.179-2.023 6.87c-4.612 5.542-5.263 12.346-1.763 18.765c.206.377.424.766.65 1.167c1.664 2.952 3.735 6.626 3.799 12.055c.014 1.133-.229 2.211-.488 3.354c-.709 3.139-1.578 7.041 2.336 14.372c.056.293.151.57.294.83c.654 1.198 2.037 1.805 4.113 1.805c4.722 0 12.768-3.124 20.996-8.15c10.352-6.326 20.079-15.386 17.714-19.72M30.99 55.115c-.001.002-.006.002-.008.004h-.006c-3.653.694-7.167-1.343-8.69-4.729c1.816-1.891 8.241-6.897 13.161-9.475a8.648 8.648 0 0 1 2.045 4.294c.787 4.634-2.12 9.067-6.502 9.906m22.543-22.79c-4.725 0-12.771 3.124-21 8.15c-7.778 4.753-15.203 11.05-17.411 15.727c-2.299-5.204-1.674-8.038-1.054-10.781c.271-1.201.552-2.443.536-3.804c-.069-5.929-2.276-9.843-4.05-12.988a91.71 91.71 0 0 1-.639-1.142C6.68 21.552 7.368 15.5 11.853 10.446l.454-.51l-.328-.6c-.408-.751-1.544-3.324 1.036-4.899c.567-.347 1.126-.523 1.66-.523c1.058 0 2.06.727 2.75 1.994l.355.653l.72-.178a15.16 15.16 0 0 1 3.633-.462c4.749 0 8.613 2.481 11.174 7.176c.2.368.403.752.612 1.15c1.689 3.204 3.791 7.191 8.627 10.234c1.117.703 2.281 1.069 3.406 1.424c2.56.807 5.195 1.651 8.326 6.45a8.41 8.41 0 0 0-.745-.03"/>
                        </svg>
                         SUBCRIBE</span>
                        </button>
                      </div>
                <div className=" w-80    d-flex justify-content-center align-items-center flex-column ">
                  <div className="border p-3 rounded  border-dark mb-3 mt-2 ">
                    <p>{data?.stats?.subscribersText}</p>
                    <p>{data.stats?.videosText}</p>
                    <p>{data?.stats?.views} Views </p>
                  </div>

                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Description</Accordion.Header>
                      <Accordion.Body>
                        <p>
                          {data?.description
                            ? data.description
                            : "this channel has no description"}
                        </p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <p className="mt-2 " >{data?.joinedDateText || "24,Jan 2019" } </p>
                  
                  <div className="mb-3"  >
                  <Button variant="light" onClick={()=>handleCommunity(data.channelId,data?.title,data?.avatar?.[0]?.url)}  > { communityVisible?"Go To Videos" : "Go To Community Post" }</Button>
                  </div>

             




                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     






              {
                communityVisible? (
                   
                  <>
                  <div className=" container-fluid mt-3 mb-3">
    <div className="row d-flex justify-content-center align-items-center gap-3">
      <p className="mt-2 mb-2 text-center " >Community Post</p>
                  
                  {
                    communityData.map((i,index)=>{
                      return (
                        <CommunityDetail
                        key={index}
                        cImage={communityAandI.image}
                        cAuthor={communityAandI.author}
                        cPubhlish={i?.post?.publishedTimeText}
                        cTitle={i?.post?.text}
                        cPost={i?.post?.attachment?.images?.[0]?.source?.[1]?.url}
                        cLike={i?.post?.stats?.likes}
                        CComment={i?.post?.stats?.comments}
                        
                        />
                      )
                    })

                  }
                  

                  </div>
                  </div>
                 
                  
                  </>
                )
                :
                <>
                
      <h4 className="text-center    mt-5 mb-5 ">Channel videos</h4>
      {
        <div className=" container-fluid">
          <div className="row d-flex justify-content-center align-items-center gap-3">
            {dataVideo &&
              dataVideo.map((i, index) => {
                return (
                  <div
                    className="col-12 col-md-4 d-flex justify-content-around align-items-center gap-2 "
                    key={index}
                  >
                    <Link
                      to={`/video/${i?.video?.videoId}`}
                      style={{ textDecoration: "none" }}
                    >
                      <div style={{ position: "relative" }}>
                        <img
                          src={
                            i.video?.thumbnails[3]?.url ||
                            "https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6.jpg"
                          }
                          alt=""
                          style={{ width: "200px" }}
                          className="rounded"
                        />
                        <p
                          style={{
                            fontSize: "12px",
                            position: "absolute",
                            bottom: "0", // Align to the bottom
                            right: "0", // Align to the left
                            backgroundColor: "rgba(0, 0, 0, 0.7)", // Background color
                            color: "white", // Text color
                            padding: "4px 8px", // Padding
                          }}
                        >
                          {convertNumberToTime(i?.video?.lengthSeconds)}
                        </p>
                      </div>
                    </Link>
                    <div className="p-1">
                      <p style={{ fontSize: "11px" }}>
                        {" "}
                        {trimLength(i.video?.title, 70)}
                      </p>

                      <div>
                        <p style={{ fontSize: "12px" }}>
                          {convertNumberToViews(i.video?.stats?.views) ||
                            "1.3 M"}{" "}
                          views
                        </p>
                        <p style={{ fontSize: "12px" }}>
                          {i.video?.publishedTimeText}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      }

                </>
              }












    </div>
      :
      <p className="text-center" >Go To Home Page</p>
    }
    
    </>
 
  );
}

export default YoutudeDetail;
