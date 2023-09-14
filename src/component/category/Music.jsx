import React, { useContext, useEffect, useState } from "react";
import "../../style/Home.css";
import "../../style/App.css";
import CardVideo from "../detail/CardVideo";
import Loader from "../utils/Loader";


function Music() {
  const [data, setData] = useState([]);
  let key = import.meta.env.VITE_API_KEY;
  const [nextUrl, setNextUrl] = useState("");
  const [isLoading,setIsLoading] = useState(true)
  useEffect(() => {
    fetchData("Music");
  }, []);

  function fetchData(inputData, next = null) {


    const url = next
      ? `https://youtube138.p.rapidapi.com/search/?q=music&cursor=${nextUrl}&hl=en&gl=US`
      : `https://youtube138.p.rapidapi.com/search/?q=${inputData}&hl=en&gl=US`;

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
        // console.log("key is " , key)
        console.log("Music result - ", value);
        setData(value.contents);
        setNextUrl(value.cursorNext);
        if(value.contents.length > 3)
        {
          setIsLoading(false)
        }
      });
  }

  //   handle next
  function hanldeNext() {
    console.log(nextUrl);
    fetchData("Music", nextUrl);
  }

  function handleSetting(a, t) {
    alert(a + " - " + t);
  }

  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);




  const convertNumberToTime = (number) => {
    let num = number || 545
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours} : ${minutes}`;
  };

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



  









  return (
    <>
      <div>
        <h3 className="text-center">Musics </h3>
      </div>




    {
       isLoading ?  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
       <Loader />
     </div>
     :
     (
      <div className=" container-fluid">
      <div className="row d-flex justify-content-center align-items-center">
        {data &&
          data.map((result, index) => (
            <div className="col-12 col-md-3" key={index}>
              <CardVideo
                videoId={result.video?.videoId}
                thumbnail={
                  result.video?.thumbnails?.[0]?.url
                    ? result.video.thumbnails[0].url
                    : "https://i.ytimg.com/vi/gZ5LyFuTyTg/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBlw33AcBcYbWNbVLkZgMeaxK2pJA"
                }
                title={
                  result.video?.title ||
                  "Due to some issues in fetch data Title cannot be available"
                }
                videoLength={convertNumberToTime(result.video?.lengthSeconds) || "45:1"}
                view={convertNumberToViews(result.video?.stats?.views) || 576576}
                publishTime={result.video?.publishedTimeText || "1 day ago"}
                author={result.video?.author?.title || "YOutude"}
                authorImage={
                  result.video?.author?.avatar?.[0].url
                    ? result.video.author.avatar[0].url
                    : "https://wallpaperaccess.com/thumb/812150.jpg"
                }
                channelDetailId={result.video?.author?.channelId}
              />
            </div>
          ))}
      </div>
    </div>
     )
    }



  

     {
      isLoading?null:(
        <div
        className="btn-fixed"
        style={{ position: "fixed", bottom: "20px", right: "20px" }}
      >
        <button
          style={{ fontSize: "12px" }}
          class="btn btn-danger float-right"
          onClick={hanldeNext}
        >
          Next
        </button>
      </div>

      )
     }

      
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

export default Music;
