import "./editprofile.css";
import { PermMedia } from "@material-ui/icons";
import { useState } from "react";
import axios from "axios";



export default function EditProfile() {
  return (
    <div className="editProfile">
        <div className="editProfileContainer">
            <div className="editProfileTitle">Edit Profile</div>
            <form className="editProfileForm">
                <div className="editProfileLeft">
                    <div className="editProfileItem">
                        <label>Display Name : </label>
                        <input type="text" placeholder="Your name" className="editProfileInput"/>
                    </div>
                    <div className="editProfileItem">
                        <label>City :</label>
                        <input type="text" placeholder="Your current city" className="editProfileInput"/>
                    </div>
                    <div className="editProfileItem">
                        <label>From :</label>
                        <input type="text" placeholder="Where are you from?" className="editProfileInput"/>
                    </div>
                    <div className="editProfileItem">
                        <label>Relationship :</label>
                        <select name="relationship" id="relationship" className="editProfileInput">
                            <option value="1">Single</option>
                            <option value="2">Married</option>
                            <option value="3">Dating</option>
                        </select>
                    </div>
                    <div className="editProfileItem">
                        <label>Description</label>
                        <input type="text" placeholder="Your Description" className="editProfileInputDescription"/>
                    </div>
                    <label htmlFor="file" className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                        <span className="shareOptionText">Upload Profile Image here</span>
                        <input style={{display: "none"}} type="file" id="file" accept=".png, .jpeg, .jpg" />
                    </label>
                    <button className="editProfileButton">Update</button>
                </div>
            </form>
        </div>
    </div>
  )
}
