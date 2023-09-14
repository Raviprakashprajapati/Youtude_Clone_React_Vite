import React, { useContext, useState } from "react";
import Context from "../utils/Context";
import CardVideo from "../detail/CardVideo";

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

  return (
    <div>
      <div className="mb-3">
        <h3 className="text-center">Save Videos</h3>

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
