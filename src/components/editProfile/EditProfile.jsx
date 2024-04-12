import "./editprofile.css";
import { PermMedia } from "@material-ui/icons";
import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate} from "react-router-dom";



export default function EditProfile() {
    const { user: currentUser, dispatch } = useContext(AuthContext);
    const [user, setUser] = useState(currentUser);
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate();
    const [profilePictureFile, setProfilePictureFile] = useState(null);
    const [coverPictureFile, setCoverPictureFile] = useState(null);

    useEffect(() => {
        setUser(currentUser);
    }, [currentUser]);

    const handleChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const handleFileUpload = (e, type) => {
        if (type === "profile") {
            setProfilePictureFile(e.target.files[0]);
        } else if (type === "cover") {
            setCoverPictureFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "UPDATE_START" });
        const newProfileData = {
            userId: user._id,
            displayName: user.displayName,
            city: user.city,
            from: user.from,
            relationship: user.relationship,
            desc: user.desc,
            profilePicture: user.profilePicture,
            coverPicture: user.coverPicture,
        }

        if(profilePictureFile){
            const data = new FormData();
            const fileName = Date.now() + profilePictureFile.name;
            data.append("name", fileName);
            data.append("file", profilePictureFile);
            newProfileData.profilePicture = fileName;
            try{
                await axios.post("/upload", data)
            }catch(err){
                console.log(err)
            }
        }
        if(coverPictureFile){
            const data = new FormData();
            const fileName = Date.now() + coverPictureFile.name;
            data.append("name", fileName);
            data.append("file", coverPictureFile);
            newProfileData.coverPicture = fileName;
            try{
                await axios.post("/upload", data)
            }catch(err){
                console.log(err)
            }
        }
        
        try {
            const res = await axios.put("/users/" + user._id, { ...newProfileData
             });
            setSuccess(true);
            dispatch({ type: "UPDATE_SUCCESS", payload: res.data });

            navigate('/login');
            localStorage.clear();
            window.location.reload();

        } catch (err) {
            dispatch({ type: "UPDATE_FAILURE" });
        }
        
    };

  return (
    <div className="editProfile">
        <div className="editProfileContainer">
            <div className="editProfileTitle">Edit Profile</div>
            <form className="editProfileForm" onSubmit={handleSubmit}>
                <div className="editProfileLeft">
                    <div className="editProfileItem">
                        <label>Display Name : </label>
                        <input 
                            type="text" 
                            placeholder="Your name" 
                            className="editProfileInput" 
                            name="displayName" 
                            value={user.displayName} 
                            onChange={handleChange}
                        />
                    </div>
                    <div className="editProfileItem">
                        <label>City :</label>
                        <input 
                            type="text" 
                            placeholder="Your current city" 
                            className="editProfileInput"
                            name="city"
                            value={user.city}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="editProfileItem">
                        <label>From :</label>
                        <input 
                            type="text" 
                            placeholder="Where are you from?" 
                            className="editProfileInput"
                            name="from"
                            value={user.from}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="editProfileItem">
                        <label>Relationship :</label>
                        <select name="relationship" 
                            id="relationship" 
                            className="editProfileInput"  
                            value = {user.relationship}
                            onChange={handleChange}>
                                <option value="1">Single</option>
                                <option value="2">Married</option>
                                <option value="3">Dating</option>
                        </select>
                        
                    </div>
                    <div className="editProfileItem">
                        <label>Description</label>
                        <input 
                            type="text" 
                            placeholder="Your Description" 
                            className="editProfileInputDescription"
                            name="desc"
                            value={user.desc}
                            onChange={handleChange}
                            />
                    </div>
                    <label htmlFor="profileImage" className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                        <span className="shareOptionText">Upload Profile Image here</span>
                        <input style={{display: "none"}} type="file" id="profileImage" accept=".png, .jpeg, .jpg" onChange={(e) => handleFileUpload(e, "profile")}/>
                    </label>
                    <label htmlFor="coverImage" className="shareOption">
                        <PermMedia htmlColor="tomato" className="shareIcon"/>
                        <span className="shareOptionText">Upload Cover Image here</span>
                        <input style={{display: "none"}} type="file" id="coverImage" accept=".png, .jpeg, .jpg" onChange={(e) => handleFileUpload(e, "cover")}/>
                    </label>
                    <button className="editProfileButton">Update</button>
                    {success && 
                            <span className="editProfileSuccess">
                                Profile has been updated successfully...
                            </span>
                        }
                </div>
            </form>
        </div>
    </div>
  )
}
