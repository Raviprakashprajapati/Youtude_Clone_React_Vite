import React, { useContext, useEffect, useState } from "react";
import "../../style/Home.css";
import "../../style/App.css";
import CardVideo from "../detail/CardVideo";
import Loader from "../utils/Loader";
import Context from "../utils/Context";

function Trending() {
  const [data, setData] = useState([]);
  let key = import.meta.env.VITE_API_OMAR;
  const [nextUrl, setNextUrl] = useState("");
  const [isLoading,setIsLoading] = useState(true)
  const {visibility,setVisibility} = useContext(Context);
  useEffect(() => {
    fetchData();
  }, []);

  function fetchData() {


    const url = 'https://youtube-v2.p.rapidapi.com/trending/?lang=en&country=in&section=Now';
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': key,
            'X-RapidAPI-Host': 'youtube-v2.p.rapidapi.com'
        }
    };

    if(visibility)
    {
        fetch(url, options)
      .then((value) => {
        return value.json();
      })
      .then((value) => {
        
        console.log("trending result - ", value);
        setData(value.videos);
    //    setIsLoading(false)
        if(visibility)
        {
            if(value.number_of_videos > 3)
            {
              setIsLoading(false)
            //   setVisibility(true);
            }
        }
      });
    }
  }

  


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
        <h3 className="text-center">Trending </h3>
      </div>


      {
        isLoading ?  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <Loader />
      </div>
      :
        <>

            {
                visibility?
      
                (
                  <div className=" container-fluid">
                  <div className="row d-flex justify-content-center align-items-center">
                    {data &&
                      data.map((result, index) => (
                        <div className="col-12 col-md-3" key={index}>
                          <CardVideo
                            videoId={result?.video_id}
                            thumbnail={
                              result?.thumbnails?.[2]?.url
                                ||  "https://i.ytimg.com/vi/gZ5LyFuTyTg/hq720.jpg?sqp=-oaymwEjCOgCEMoBSFryq4qpAxUIARUAAAAAGAElAADIQj0AgKJDeAE=&rs=AOn4CLBlw33AcBcYbWNbVLkZgMeaxK2pJA"
                            }
                            title={
                              result?.title ||
                              "Due to some issues in fetch data Title cannot be available"
                            }
                            videoLength={result?.video_length || "45:1"}
                            view={convertNumberToViews(result?.number_of_views) || 576576}
                            publishTime={result?.published_time || "1 day ago"}
                            author={result?.author || "YOutude"}
                            authorImage={
                         
                                "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052"
                            }
                            channelDetailId={result?.channel_id}
                          />
                        </div>
                      ))}
                  </div>
                </div>
          
                ):null
            }

        </>
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

export default Trending;
