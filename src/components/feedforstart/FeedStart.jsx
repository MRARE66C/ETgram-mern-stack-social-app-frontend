import { useEffect, useState } from "react";
import Post from "../post/Post";
import PostStart from "../postforstart/PostStart";
import Share from "../share/Share";
import "./feedstart.css";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function FeedStart({username}) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts/profile/" + username)
        setPosts(res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        }
        ));
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        // You can set a state variable here to show an error message on the UI
      }
    }
    fetchPosts();
  }, [username]);


  return (
    <div className="feed">
      <div className="feedWrapper">
        {posts.map((p) => (
            <PostStart key={p._id} post={p} />  
        ))}
      </div>
    </div>
  );
}