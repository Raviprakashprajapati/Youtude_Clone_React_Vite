import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import  Navbar from "./component/utils/Navbar";
import Context from "./component/utils/Context";
import VideoDetail from "./component/detail/VideoDetail";
import YoutudeDetail from "./component/detail/YoutudeDetail";
import UserSubcriberChannel from "./component/method/UserSubcriberChannel";
import LinkVideo from "./component/method/LinkVideo";
import SaveVideo from "./component/method/SaveVideo";
import Home from "./component/category/Home";
import Gaming from "./component/category/Gaming";
import Movie from "./component/category/Movie";
import Music from "./component/category/Music";
import SearchBar from "./component/category/SearchBar";
import HistoryUser from "./component/method/HistoryUser";
import CommunityDetail from "./component/detail/CommunityDetail";

function App() {
  

  const [inputValueFromChild, setInputValueFromChild] = useState("");
  const [userChannel,setUserChannel] = useState([])
  const [likeVideo,setLikeVideo] = useState([])
  const [saveVideo,setSaveVideo] = useState([])
  const [visibility,setVisibility] = useState(false)
  const [historyUser,setHistoryUser] = useState([])

  let key =  import.meta.env.VITE_API_KEY
  // console.log(key)

    const handleChildButtonClick = (value) => {
        setInputValueFromChild(value); 
        console.log("aPP = ",inputValueFromChild);
    };

    // console.log(process.env.REACT_APP_KEY)


  return (
    <Context.Provider value={{inputValueFromChild,setInputValueFromChild,userChannel,setUserChannel,likeVideo,setLikeVideo,saveVideo,setSaveVideo,visibility,setVisibility
      ,historyUser,setHistoryUser
    }}>
      
      
      <BrowserRouter>
     <Navbar onButtonClick={handleChildButtonClick} />
     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchBar
          valueInput = {inputValueFromChild} />} />
          <Route path="/movie" element={<Movie/>} />
          <Route path="/gaming" element={<Gaming/>} />
          <Route path="/music" element={<Music/>} />
          <Route path="/video/:id" element={<VideoDetail/>} />
          
          <Route path="/channel/:id" element={<YoutudeDetail/>} />
          <Route path="/subcription" element={<UserSubcriberChannel/>} />
          <Route path="/like" element={<LinkVideo/>} />
          <Route path="/save" element={<SaveVideo/>} />
          <Route path="/history" element={<HistoryUser/>} />
          <Route path="/*" element={<h4 className="text-center">404 Page</h4>} />
        </Routes>
      </BrowserRouter>


    </Context.Provider>


  );
}

export default App;

// b5cc2a70a2msh4a42782835e5070p1fee5ajsn97ef17bc04d8
// 48120f3492msh11bf3f3ab32be20p1b9667jsnc8d5b20cb164