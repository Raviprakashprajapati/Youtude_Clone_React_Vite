import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CardVideo from "../detail/CardVideo";
import Accordion from "react-bootstrap/Accordion";
import Button from 'react-bootstrap/Button';
import Context from "../utils/Context";
import CommunityDetail from "./CommunityDetail";

function YoutudeDetail() {
  const [communityVisible,setCommunityVisible] = useState(false);
  const [communityId,setCommunityId] = useState("");
  const [communityData,setCommunityData] = useState([]);
  const [communityAandI,setCommunityAuthorAndImage] = useState({});
  const { visibility } = useContext(Context);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [dataVideo, setDataVideo] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [saveName, setSaveName] = useState([]);
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
    fetchData(nextUrl);
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





  return (
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
  );









  // return (
  //   <>

  //   {
  //     visibility?
  //     <div>

  //     <div className="container">
  //       <div className="fixed-button">
  //         <button
  //           style={{ fontSize: "12px" }}
  //           className="btn btn-danger"
  //           onClick={hanldeNext}
  //         >
  //           Next
  //         </button>
  //       </div>
  //     </div>

  //     {/* channel details */}

  //     <div className="container-fluid bg-dark">
  //       <div className="row ">
  //         <div className="col-sm-12 col-md-8   mx-auto ">
  //           <div
  //             className=" d-flex justify-content-center flex-column "
  //             style={{ backgroundColor: "#3d4147", color: "white" }}
  //           >
  //             <img
  //               src={data.banner?.mobile[0]?.url}
  //               className="mx-auto "
  //               alt=""
  //               style={imageStyle}
  //             />

  //             <div className="d-flex justify-content-center align-items-center flex-column  gap-4 mt-4 ">
  //               <div className="d-flex justify-content-evenly align-items-center gap-4 ">
  //                 {/* <img src={data?.avatar[0]?.url } className='rounded-5 ' alt="" /> */}
  //                 <img
  //                   style={{width:"50px"}}
  //                   src={
  //                     data?.avatar?.[0]?.url
  //                       ? data.avatar[0].url
  //                       : "https://img.freepik.com/premium-vector/red-youtube-logo-social-media-logo_197792-1803.jpg"
  //                   }
  //                   className="rounded-5 "
  //                   alt=""
  //                 />

  //                 <div className=" border-2 border-dark p-3 rounded " >
  //                   <h4>{data?.title}</h4>
  //                   <p>{data?.username}</p>
  //                   <p>{data?.country}</p>
  //                 </div>
  //               </div>
  //               <div className=" w-80    d-flex justify-content-center align-items-center flex-column ">

  //                 <div className="border p-3 rounded  border-dark mb-2 mt-2 " >
  //                 <p>{data?.stats?.subscribersText}</p>
  //                 <p>{data.stats?.videosText}</p>
  //                 <p>{data?.stats?.views} Views </p>
  //                 </div>

  //                 <Accordion defaultActiveKey="0">
  //                   <Accordion.Item eventKey="0">
  //                     <Accordion.Header>Description</Accordion.Header>
  //                     <Accordion.Body>
  //                       <p>{data?.description ? data.description : "this channel has no description"  }</p>
  //                     </Accordion.Body>
  //                   </Accordion.Item>
  //                 </Accordion>

  //                 <p>{data?.joinedDateText}</p>
  //               </div>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>

  //     <h4 className="text-center    mt-5 mb-5 ">Channel videos</h4>
  //     {

  //                           <div className=" container-fluid">
  //                   <div className="row d-flex justify-content-center align-items-center gap-3">

  //                       {
  //                         dataVideo && dataVideo.map((i,index)=>{
  //                           return(
  //                             <div className="col-12 col-md-4 d-flex justify-content-around align-items-center gap-2 " key={index}>

  //                             <Link to={`/video/${i?.video?.videoId}`} style={{textDecoration:"none"}} >
  //                             <div style={{ position: "relative" }}>

  //                                     <img
  //                                       src={i.video?.thumbnails[3]?.url || "https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6.jpg"}
  //                                       alt=""
  //                                       style={{ width: "200px" }}
  //                                       className="rounded"
  //                                     />
  //                                     <p
  //                                       style={{
  //                                         fontSize: "12px",
  //                                         position: "absolute",
  //                                         bottom: "0", // Align to the bottom
  //                                         right: "0", // Align to the left
  //                                         backgroundColor: "rgba(0, 0, 0, 0.7)", // Background color
  //                                         color: "white", // Text color
  //                                         padding: "4px 8px", // Padding
  //                                       }}
  //                                     >
  //                                       {convertNumberToTime(i?.video?.lengthSeconds)}
  //                                     </p>
  //                                   </div>
  //                             </Link>
  //                                 <div className="p-1" >
  //                                   <p style={{ fontSize: "11px" }} > {trimLength(i.video?.title,70) }</p>

  //                                   <div>

  //                                   <p style={{ fontSize: "12px" }} >{convertNumberToViews(i.video?.stats?.views) || "1.3 M" } views</p>
  //                                   <p style={{ fontSize: "12px" }} >{i.video?.publishedTimeText } </p>

  //                                   </div>
  //                                 </div>
  //                               </div>
  //                           )
  //                         })
  //                       }

  //                     </div>
  //                     </div>

  //     }
  //   </div>

  //     :
  //     <p className="text-center">Go TO Home Page</p>
  //   }

  //   </>

  // );
}

export default YoutudeDetail;
