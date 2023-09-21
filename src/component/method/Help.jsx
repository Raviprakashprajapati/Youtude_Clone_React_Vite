import React from "react";
import YouTube from "react-youtube";

function Help() {

  

  return (
    <div className="container-fluid">
      <div className="row d-flex justify-content-center align-items-center">



        <div className=" mt-3 col-10 col-md-6   ">
          <p>
            {" "}
            Sorry ,But if our YouTube project has exceeded its API rate limit or
            not showing the content .
            <br />
            <br />
            So Please contact or DM to the project head to request a change in the API
            key .
            <br />
            <br />
             It takes only 1 minute to change the API key and then you can able to used Website again
            <br />
            <br />
            Because this API only give 100 Limits Per Month per ID.
            <br />
            <br />
            Contact to -{" "}
            <a href="https://raviprakashprajapati.netlify.app/" target="blank">
              Ravi
            </a>
          </p>
        </div>

      

      </div>
    </div>
  );
}

export default Help;
