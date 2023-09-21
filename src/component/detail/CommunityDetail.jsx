import React from "react";

function CommunityDetail({
  cImage,
  cAuthor,
  cPubhlish,
  cTitle,
  cPost,
  cLike,
  CComment,
}) {
  return (
    <div className="col-10 col-md-3 border rounded  d-flex justify-content-center align-items-center flex-column gap-2 p-3 ">
      <div className="d-flex  w-100 justify-content-start align-items-center  ">
        <div>
          {" "}
          <img
            src={
              cImage ||
              "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052"
            }
            className="rounded-circle"
            style={{ width: "25px" }}
            alt=""
          />
        </div>
        <p className="mx-2" style={{ fontSize: "12px" }}>
          {cAuthor || "Youtude"}
        </p>
        <p className="mx-2" style={{ fontSize: "12px" }}>
          {cPubhlish || "1 year ago"}
        </p>
      </div>
      <div className="col-12 col-md-12">
        <p style={{ fontSize: "11px" }}>
          {cTitle ||
            "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere, corporis? Velit, minus. At id sint aliquid sed quam suscipit tempore?"}
        </p>
      </div>
      <div className="d-flex justify-content-center align-items-center">
        <img
          src={
            cPost ||
            "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/youtube-logo.jpeg"
          }
          style={{ width: "80%" }}
          className="rounded"
          alt=""
        />
      </div>

      <div className="d-flex justify-content-between align-items-center ">
        <button
          className="btn-dark border border-dark bg-dark text-white  p-2 rounded "
          style={{ fontSize: "12px" }}
        >
          {cLike || "450"}{" "}
          <svg
            style={{ width: "22px" }}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffffff"
              d="M5 9v12H1V9h4m4 12a2 2 0 0 1-2-2V9c0-.55.22-1.05.59-1.41L14.17 1l1.06 1.06c.27.27.44.64.44 1.05l-.03.32L14.69 8H21a2 2 0 0 1 2 2v2c0 .26-.05.5-.14.73l-3.02 7.05C19.54 20.5 18.83 21 18 21H9m0-2h9.03L21 12v-2h-8.79l1.13-5.32L9 9.03V19Z"
            />
          </svg>
        </button>
        <button
          className="btn-dark border border-dark bg-dark text-white mx-4  p-2 rounded "
          style={{ fontSize: "12px" }}
        >
          {CComment || "40"}{" "}
          <svg
            style={{ width: "22px" }}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#ffffff"
              d="M3 15H1V3a2 2 0 0 1 2-2h16v2H3v12m9 8a1 1 0 0 1-1-1v-3H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-4.1l-3.7 3.71c-.2.18-.44.29-.7.29H12M9 9v2h10V9H9m0 4v2h8v-2H9Z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default CommunityDetail;
