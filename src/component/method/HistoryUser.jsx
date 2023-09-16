import React, { useContext, useState } from "react";
import Context from "../utils/Context";
import HistoryCard from "../detail/HistoryCard";

function HistoryUser() {
  const { visibility } = useContext(Context);
  const localHistory = localStorage.getItem("userHistory");
  const [historydatalocal, setHistorydatalocal] = useState(
    JSON.parse(localHistory)
  );

  return (
    <div>
      <div>
        <h3 className="text-center mb-3 ">History</h3>

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
