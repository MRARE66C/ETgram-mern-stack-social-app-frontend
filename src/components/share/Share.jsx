import "./share.css";
import {PermMedia, Label,Room, EmojiEmotions, Cancel} from "@material-ui/icons"
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useRef, useState } from "react";
import axios from "axios";


export default function Share() {
  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);

  const sumbitHandler = async (e) => {
    e.preventDefault()
    const newPost = {
      userId: currentUser._id,
      desc: desc.current.value
    }
    if(file){
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try{
        await axios.post("/upload", data)
      }catch(err){
        console.log(err)
      }
    }

    try{
      await axios.post("/posts", newPost)
      window.location.reload();
    }catch(err){
      console.log(err)
    }
  }
  
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            className="shareProfileImg"
            src={currentUser.profilePicture ? PF + currentUser.profilePicture : PF + "person/noAvatar.png"}
            alt=""
          />
          <input
            placeholder={"What's in your mind " + currentUser.username + "?"}
            className="shareInput"
            ref = {desc}
          />
        </div>
        <hr className="shareHr"/>
        {file && (
          <div className="shareImgContainer">
            <img className="shareImg" src={URL.createObjectURL(file)} alt=""/>
            <Cancel className="shareCancelImg" onClick={() => setFile(null)}/>
          </div>
        )}
        <form className="shareBottom" onSubmit={sumbitHandler}>
            <div className="shareOptions">
                <label htmlFor="file" className="shareOption">
                    <PermMedia htmlColor="tomato" className="shareIcon"/>
                    <span className="shareOptionText">Photo</span>
                    <input style={{display: "none"}} type="file" id="file" accept=".png, .jpeg, .jpg" onChange={(e) => setFile(e.target.files[0])}/>
                </label>
            </div>
            <button className="shareButton" type = "submit">Share</button>
        </form>
      </div>
    </div>
  );
}
