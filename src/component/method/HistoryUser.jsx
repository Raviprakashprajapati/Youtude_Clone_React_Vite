import React, { useContext, useEffect, useState } from "react";
import Context from "../utils/Context";
import HistoryCard from "../detail/HistoryCard";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function HistoryUser() {
  const { visibility } = useContext(Context);
  const localHistory = localStorage.getItem("userHistory");
  const [historydatalocal, setHistorydatalocal] = useState(
    JSON.parse(localHistory)
  );
 

  function handleDeleteHistory(){
      if(historydatalocal.length)
      {
        // localStorage.removeItem('userHistory')
        localStorage.setItem("userHistory",JSON.stringify([]));
        toast("All History Clear");
        window.location.reload();
      
      }
      
    
  }

  return (
    <div>
      <div>
        <h3 className="text-center mb-3 "> 
        <svg style={{width:"25px"}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ffffff" d="M13 3a9 9 0 0 0-9 9H1l3.89 3.89l.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7s-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42A8.954 8.954 0 0 0 13 21a9 9 0 0 0 0-18zm-1 5v5l4.28 2.54l.72-1.21l-3.5-2.08V8H12z"/>
</svg> {" "} History</h3>

        {localStorage.getItem("userHistory") && visibility ? (
          <>
            {localStorage.getItem("userHistory") ? null : (
              <div>
                <p className="text-center">No History Video yet</p>
              </div>
            )}

            {visibility ? null : (
              <div>
                <p className="text-center">No History Video yet</p>
              </div>
            )}
          </>
        ) : (
          <div>
            <p className="text-center">No History Video yet</p>
          </div>
        )}
      </div>


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
        visibility?
        (
          <button className="btn btn-danger mx-3 mt-3 mb-3"style={{fontSize:"13px"}} onClick={handleDeleteHistory}  >
             
           <b> Clear History</b>{" "}
           <svg style={{width:"20px"}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#ffffff" d="M19 15.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12L19 15.59M22 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7c-.69 0-1.23-.36-1.59-.89L0 12l5.41-8.12C5.77 3.35 6.31 3 7 3h15m0 2H7l-4.72 7L7 19h15V5Z"/>
            </svg> 
            </button>
        )
        :null
      }



          {
          localStorage.getItem("userHistory") ? (
            visibility ? (
              <div className=" container-fluid">
                <div className="row d-flex justify-content-center align-items-center gap-3">
                  {historydatalocal.map((i, index) => {
                    return <HistoryCard
                        key={index}
                    hImage={i?.image || "https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6.jpg"}
                    hTime={i?.time || 456}
                    hDescription={i?.description || "due to inconsistency descriptioon data cannot be fetch    "}
                    hChannelName={i?.channelName || "no Data"}
                    hChannelId={i?.channelId}
                    hVideoId={i?.videoId}
                    
                    />;
                  })}
                </div>
              </div>
            ) : null
          ) : null
          }


        </div>
 
  );
}

export default HistoryUser;
