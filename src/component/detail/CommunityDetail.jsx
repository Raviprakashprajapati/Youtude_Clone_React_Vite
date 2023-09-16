import React from 'react'

function CommunityDetail({cImage,cAuthor,cPubhlish,cTitle,cPost,cLike,CComment}) {

    


  return (

    


    <div className='col-10 col-md-3 border rounded  d-flex justify-content-center align-items-center flex-column gap-2 p-3 ' >

        <div className='d-flex  w-100 justify-content-start align-items-center  ' >
        
        <div>    <img src={cImage || "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png?20220706172052" }  className='rounded-circle' style={{width:"25px"}}  alt="" /></div>
            <p className="mx-2" style={{fontSize:"12px"}} >{cAuthor || "Youtude"}</p>
            <p className="mx-2" style={{fontSize:"12px"}}>{cPubhlish || "1 year ago"}</p>
        </div>
        <div className='col-12 col-md-12' >
            <p style={{fontSize:"11px"}}>{cTitle || "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facere, corporis? Velit, minus. At id sint aliquid sed quam suscipit tempore?"}</p>
        </div>
        <div className='d-flex justify-content-center align-items-center'>
            <img src={cPost || "https://storage.googleapis.com/gweb-uniblog-publish-prod/original_images/youtube-logo.jpeg" } style={{width:"80%"}} className='rounded'  alt="" />
        </div>
        <div className='d-flex justify-content-center align-items-center '>
            <button>{cLike || "450"}Like</button>
            <button>{CComment || "65"}Comments</button>
        </div>


        
        
      
    </div>




 






  
  )
}

export default CommunityDetail

