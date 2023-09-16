import React from 'react'
import { Link } from 'react-router-dom';

function HistoryCard({hImage,hTime,hDescription,hChannelName,hChannelId,hVideoId}) {

    function trimLength(text, maxLength) {
        if (text.length <= maxLength) {
          return text; // Return the original text if it's shorter than or equal to the maxLength
        } else {
          return text.substring(0, maxLength) + '...'; // Truncate the text and add ellipsis
        }
      }

     const convertNumberToTime = (number) => {
    let num = number || 545;
    const hours = Math.floor(num / 60);
    const minutes = num % 60;
    return `${hours} : ${minutes}`;
  };

  return (
    <>
    
    <div className="col-12 col-md-4 d-flex justify-content-around align-items-center gap-2 ">
        <Link to={`/video/${hVideoId}`} style={{textDecoration:"none"}} >
        <div style={{ position: "relative" }}>
                
                <img
                  src={hImage}
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
                  {convertNumberToTime(hTime)}
                </p>
              </div>
        </Link>
            <div className="p-1" >
              <p style={{ fontSize: "11px" }} > {trimLength(hDescription,80)}</p>
              {/* <p style={{ fontSize: "12px" }} > Lorem ipsum dolor sit amet consectetur adipis  ntyty ghgf </p> */}
              <div>
              <Link to={`/channel/${hChannelId}`} style={{textDecoration:"none"}} >
              <p style={{ fontSize: "13px" }} > <b>{hChannelName}</b></p>
              </Link>
              </div>
            </div>
          </div>

    
    
    
    </>
  )
}

export default HistoryCard
