import React, { useContext, useEffect, useState } from "react";
import "../../style/Home.css";
import CardVideo from "../detail/CardVideo";
import Loader from "../utils/Loader";
import Context from "../utils/Context";

function SearchBar({ valueInput }) {
  const [targetValue, setTargetValue] = useState("");
  const [isLoading,setIsLoading] = useState(true)

  const [data, setData] = useState([]);
  let { inputValueFromChild, setInputValueFromChild } = useContext(Context);
  let key = import.meta.env.VITE_API_KEY;
  console.log("context input: " + inputValueFromChild);

  useEffect(() => {
    setTargetValue(valueInput);
    console.log("seacrh bar = ", valueInput);

    fetchData(inputValueFromChild);
  }, [inputValueFromChild]);


  function fetchData(inputData) {
    const url = `https://youtube138.p.rapidapi.com/search/?q=${inputData}&hl=en&gl=US`;
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
        console.log("searchbar result - ", value);
        setData(value.contents);
        if(value.contents.length > 3)
        {
          setIsLoading(false)
        }

      });
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
    <div>
      <h3 className="text-center">Search your query</h3>

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
                  thumbnail={result.video?.thumbnails?.[0]?.url  || "https://i.ytimg.com/vi/uexN9gs5gvM/hq720.jpg?sqp=-oaymwE2COgCEMoBSFXyq4qpAygIARUAAIhCGAFwAcABBvABAfgB_g6AArgIigIMCAAQARgzIGUoXDAP&rs=AOn4CLAXhgqQXPVw9OKQCcgRagaJU0j71A"  }

                  title={result.video?.title || "Due to some Fetch problem we cannot able to load the title"}
                  videoLength={convertNumberToTime(result.video?.lengthSeconds) || "45:03"}
                  view={convertNumberToViews(result.video?.stats?.views) || "1.5 M"}
                  publishTime={result?.publishedTimeText || "4 months ago"}
                  author={result.video?.author?.title}
                  authorImage={result.video?.author?.avatar?.[0]?.url || "https://img.freepik.com/premium-vector/red-youtube-logo-social-media-logo_197792-1803.jpg?w=2000"}
                  channelDetailId={result.video?.author?.channelId}
                />
              </div>
            ))}
        </div>
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


  
    </div>
  );
}

export default SearchBar;
