import React, { useContext, useEffect, useState } from "react";
import "../../style/Home.css";
import "../../style/App.css";
import CardVideo from "../detail/CardVideo";
import Loader from "../utils/Loader";
import Context from "../utils/Context";

function Home() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [nextUrl, setNextUrl] = useState("");
  const {visibility,setVisibility} = useContext(Context);
  let key = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    fetchData();
  }, []);



  function fetchData(next = null) {
    const url = next
      ? `https://youtube138.p.rapidapi.com/home/?cursor${next}&hl=en&gl=US`
      : `https://youtube138.p.rapidapi.com/home/?hl=en&gl=US`;

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
        console.log("Home", value);
        setData(value.contents);
        setNextUrl(value.cursorNext);

        if (value.contents.length > 3) {
          setIsLoading(false);
          setVisibility(true);
        }

      });
  }

  function handleSetting(a, t) {
    alert(a + " - " + t);
  }

  //   handle next
  function hanldeNext() {
    console.log(nextUrl);
    fetchData(nextUrl);
  }

  const convertNumberToTime = (number) => {
    let num = number || 545;
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours} : ${minutes}`;
  };

  const convertNumberToViews = (number) => {
    let num = number || 5465656;
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
    <>
      <div>
        <h3 className="text-center">Home</h3>

        {isLoading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "50vh",
            }}
          >
            <Loader />
          </div>
        ) : (
          <div className=" container-fluid">
            <div className="row d-flex justify-content-center align-items-center">
              {data &&
                data.map((i, index) => (
                  <div className="col-12 col-md-3" key={index}>
                    <CardVideo
                      videoId={i.video?.videoId}
                      thumbnail={
                        i.video?.thumbnails[0]?.url ||
                        "https://i.ytimg.com/vi/rg8pCyrZYaA/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLBcUcgk0N-q_NWjLP-rF4qgILqEgw"
                      }
                      title={
                        i.video?.title ||
                        "Due to some issues in fetch data Title cannot be available"
                      }
                      videoLength={
                        convertNumberToTime(i?.video?.lengthSeconds) || "56:6"
                      }
                      view={
                        convertNumberToViews(i.video?.stats?.views) || 456546
                      }
                      publishTime={i.video?.publishedTimeText}
                      author={i.video?.author?.title || "YOutude"}
                      authorImage={i.video?.author?.avatar[0]?.url}
                      // channelLink={i.video?.author?.channelId}
                      channelDetailId={i.video?.author?.channelId}
                    />
                  </div>
                ))}
            </div>
          </div>
        )}

        {isLoading ? null : (
          <div className="fixed-button">
            <button
              style={{ fontSize: "12px" }}
              className="btn btn-danger"
              onClick={hanldeNext}
            >
              Next
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div
          style={{
            position: "fixed",
            bottom: "6px",
            left: "0",
            right: "0",
            textAlign: "center",
          }}
        >
          <p className="text-center" style={{ fontSize: "12px" }}>
            Due To Over Use We Cannot Fetch Data{" "}
          </p>
        </div>
      ) : null}

      
    </>
  );
}

export default Home;
