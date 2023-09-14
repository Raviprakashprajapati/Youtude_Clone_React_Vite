import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardVideo from "../detail/CardVideo";
import Accordion from "react-bootstrap/Accordion";

function YoutudeDetail() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [dataVideo, setDataVideo] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [saveName, setSaveName] = useState([]);
  console.log("youtude channel id = ", id);
  let key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchYoutudeChannel();
  }, []);

  useEffect(() => {
    fetchChannelVideo();
  }, []);

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

      <div className="container-fluid bg-dark">
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
                    style={{width:"50px"}}
                    src={
                      data?.avatar?.[0]?.url
                        ? data.avatar[0].url
                        : "https://img.freepik.com/premium-vector/red-youtube-logo-social-media-logo_197792-1803.jpg"
                    }
                    className="rounded-5 "
                    alt=""
                  />

                  <div>
                    <h4>{data?.title}</h4>
                    <p>{data?.username}</p>
                    <p>{data?.country}</p>
                  </div>
                </div>
                <div className=" w-80    d-flex justify-content-center align-items-center flex-column ">

                  <div className="border p-3 rounded  border-danger mb-2 mt-2 " >
                  <p>{data?.stats?.subscribersText}</p>
                  <p>{data.stats?.videosText}</p>
                  <p>{data?.stats?.views} Views </p>
                  </div>

                  <Accordion defaultActiveKey="0">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>Description</Accordion.Header>
                      <Accordion.Body>
                        <p>{data?.description ? data.description : "this channel has no description"  }</p>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>

                  <p>{data?.joinedDateText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


      

      <h4 className="text-center    mt-5 mb-5 ">Channel videos</h4>
      {
        <div className=" container-fluid">
          <div className="row d-flex justify-content-center align-items-center">
            {dataVideo &&
              dataVideo.map((i, index) => (
                <div className="col-12 col-md-3" key={index}>
                  <CardVideo
                    videoId={i.video?.videoId}
                    thumbnail={i.video?.thumbnails[2]?.url}
                    title={i.video?.title}
                    videoLength={
                      convertNumberToTime(i?.video?.lengthSeconds) || "56:01"
                    }
                    view={
                      convertNumberToViews(i.video?.stats?.views) || "1.3 M"
                    }
                    publishTime={i.video?.publishedTimeText}
                    author={saveName[0]}
                    channelDetailId={saveName[1]}
                    authorImage={
                      "data:image/png;base64,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"
                    }
                  />
                </div>
              ))}
          </div>
        </div>
      }
    </div>
  );
}

export default YoutudeDetail;
