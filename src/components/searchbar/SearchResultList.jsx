import React from 'react'
import "./searchresultlist.css";
import { useNavigate } from 'react-router-dom';

const SearchResultList = ({result}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const navigate = useNavigate();

    const goToProfile = (username) => {
        navigate(`/profile/${username}`);
    }

  return (
    <div className="resultList">
        {result.map((result) => (
            <div className="result">
                <img src={result.profilePicture ? PF+result.profilePicture : PF+"person/noAvatar.png"} alt="" className="resultImg" />
                <span className="resultName" onClick={() => goToProfile(result.username)}>{result.username}</span>
            </div>
        ))}
    </div>
  )
}

export default SearchResultList
