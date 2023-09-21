import React, { useContext, useState } from "react";
import Context from "../utils/Context";
import CardVideo from "../detail/CardVideo";
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function SaveVideo() {
  const { saveVideo, setSaveVideo, visibility } = useContext(Context);

  const localSaveVideo = localStorage.getItem("userSaveVideo");
  const [localSave, setLocalSave] = useState(JSON.parse(localSaveVideo));

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

  function handleDeleteHistory(){
    if(localSave.length)
    {
      // localStorage.removeItem('userHistory')
      localStorage.setItem("userSaveVideo",JSON.stringify([]));
      toast("All Save Videos Clear");
      window.location.reload();
    
    }}

  return (
    <div>
      <div className="mb-3">
        <h3 className="text-center"> <svg style={{width:"25px"}} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path fill="#ffffff" d="M7 1h10v2h4v9h-2V5h-2v2H7V5H5v16h7v2H3V3h4V1Zm2 4h6V3H9v2Zm11 8.75v1.376c.715.184 1.352.56 1.854 1.072l1.193-.689l1 1.732l-1.192.688a4.008 4.008 0 0 1 0 2.142l1.192.688l-1 1.732l-1.193-.689A4 4 0 0 1 20 22.874v1.376h-2v-1.376a3.996 3.996 0 0 1-1.854-1.072l-1.193.689l-1-1.732l1.192-.688a4.004 4.004 0 0 1 0-2.142l-1.192-.688l1-1.732l1.193.689A3.996 3.996 0 0 1 18 15.126V13.75h2Zm-2.751 4.283a1.991 1.991 0 0 0-.25.967c0 .35.091.68.25.967l.036.063a1.999 1.999 0 0 0 3.43 0l.036-.063A1.99 1.99 0 0 0 21 19c0-.35-.09-.68-.249-.967l-.036-.063a1.999 1.999 0 0 0-3.43 0l-.036.063Z"/>
</svg> {" "}Save Videos</h3>

      {
        localStorage.getItem("userSaveVideo") && visibility ?
        <>
        {localStorage.getItem("userSaveVideo") ? null : (
          <div>
            <p className="text-center">No Save Video yet</p>
          </div>
        )}

        {visibility ? null : (
          <div>
            <p className="text-center">No Save Video yet</p>
          </div>
        )}
        </>
        :
        (
          <div>
          <p className="text-center">No Save Video yet</p>
        </div>

        )

      }


      {/* clear save video */}
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



        
      </div>



            {
              localStorage.getItem("userSaveVideo") ?
              (
                visibility ? (
                  <div className=" container-fluid">
                    <div className="row d-flex justify-content-center align-items-center">
                      {localSave &&
                        localSave.map((i, index) => (
                          <div className="col-12 col-md-3" key={index}>
                            <CardVideo
                              videoId={i.saveVideoId}
                              thumbnail={
                                i.saveThumbnail ||
                                "https://lh3.googleusercontent.com/3zkP2SYe7yYoKKe47bsNe44yTgb4Ukh__rBbwXwgkjNRe4PykGG409ozBxzxkrubV7zHKjfxq6y9ShogWtMBMPyB3jiNps91LoNH8A=s500"
                              }
                              title={
                                i.saveTitle ||
                                "Due to some issues in fetch data Title cannot be available"
                              }
                              videoLength={"23:06"}
                              view={convertNumberToViews(i.saveViews) || 456546}
                              publishTime={i.SavePublishTime}
                              author={i.saveChannelName || "YOutude"}
                              authorImage={
                                i.saveChannelImage ||
                                "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-png%2Fyoutube-logo&psig=AOvVaw1mium_o3lMa0QKaCY1KIyy&ust=1694673920243000&source=images&cd=vfe&opi=89978449&ved=0CBAQjRxqFwoTCPjmkbr-poEDFQAAAAAdAAAAABAI"
                              }
                              channelDetailId={i.saveChannelId}
                            />
                          </div>
                        ))}
                    </div>
                  </div>
                ) : null

              ):null
            }

      
    </div>
  );
}

export default SaveVideo;
