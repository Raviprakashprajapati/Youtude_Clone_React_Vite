import React, { useContext, useEffect, useState } from "react";
import Context from "../utils/Context";
import "../../style/App.css";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function UserSubcriberChannel() {
  const { userChannel, visibility } = useContext(Context);
  // console.log("user subcribe channel", userChannel);

  const localSub = localStorage.getItem("userSubcribe");
  const [localSubcribe, setLocalSubcribe] = useState(JSON.parse(localSub));

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
  const imageWidth = windowWidth <= 768 ? 50 : 80; // 768px is a common mobile breakpoint
  const imageStyle = {
    width: `${imageWidth}px`,
  };

  function handleDeleteHistory(){
    if(localSubcribe.length)
    {
      // localStorage.removeItem('userHistory')
      localStorage.setItem("userSubcribe",JSON.stringify([]));
      toast("All Subcribe Videos Clear");
      window.location.reload();
    
    }}

  return (
    <div>
      <div>
        <h4 className="text-center mt-2 bg-5 mb-4 "> <svg style={{width:"25px"}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 5c-2 0-6 1.2-6 6v4l-2 2h5m3-12c4.8 0 6 4 6 6v4l2 2h-5M12 5V3M9 17v1c0 1 .6 3 3 3s3-2 3-3v-1m-6 0h6"/>
</svg> {" "} Subcribe Channel</h4>
      </div>


      {
        localStorage.getItem("userSubcribe") && visibility ?
        <>
         {localStorage.getItem("userSubcribe") ? null : (
        <div>
          <p className="text-center">No Channel Subcribe yet</p>
        </div>
      )}

      {visibility ? null : (
        <div>
          <p className="text-center">No Channel Subcribe yet</p>
        </div>
      )}

        </>
        :
        (
          <div>
          <p className="text-center">No Channel Subcribe yet</p>
        </div>

        )

      }


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
             
           <b> Clear </b>{" "}
           <svg style={{width:"20px"}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#ffffff" d="M19 15.59L17.59 17L14 13.41L10.41 17L9 15.59L12.59 12L9 8.41L10.41 7L14 10.59L17.59 7L19 8.41L15.41 12L19 15.59M22 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7c-.69 0-1.23-.36-1.59-.89L0 12l5.41-8.12C5.77 3.35 6.31 3 7 3h15m0 2H7l-4.72 7L7 19h15V5Z"/>
            </svg> 
            </button>
        )
        :null
      }


     




      {
        // localStorage("userSubcribe") ? "present" : null
        localStorage.getItem("userSubcribe") ? (
          visibility ? (
            <div className="container-fluid mb-5">
              <div className="row gap-3 d-flex justify-content-center align-items-center flex-wrap">
                {localSubcribe.map((i, index) => {
                  return (
                    <Link
                      to={`/channel/${i?.userChannelId}`}
                      key={index}
                      className=" d-flex justify-content-center align-items-center "
                      style={{ textDecoration: "none" }}
                    >
                      <div
                        style={{ cursor: "pointer" }}
                        className="col-11 col-md-8 bg-dark-subtle text-dark d-flex justify-content-between align-items-center p-3 rounded hoverforbg"
                      >
                        <div className="col-xs-12 col-md-6 mb-3 mb-md-0 text-center text-md-start">
                          <img
                            src={
                              i?.UserImageUser ||
                              "data:image/png;base64,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"
                            }
                            alt="Channel Image"
                            className="rounded-circle"
                            style={imageStyle}
                          />
                        </div>
                        <div className="col-xs-12 col-md-6 text-center text-md-start">
                          <div className="card-body">
                            <p style={{ fontSize: "20px" }}>
                              <b>{i?.UserName}</b>
                            </p>
                            <p style={{ fontSize: "20px", marginTop: "-15px" }}>
                              <b>{i.UserSubcribe}</b>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ) : null
        ) : null
      }
    </div>
  );
}

export default UserSubcriberChannel;
