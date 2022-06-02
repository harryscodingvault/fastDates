import React from "react";
import "./Profile.css";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { user } = useSelector((store) => store.user);
  const navigate = useNavigate();
  return (
    <div className="profile-container">
      <div className="profile-text-group">
        <h5>
          <span>Username:</span>
        </h5>
        <h5>{user.user.username}</h5>
      </div>
      <div className="profile-text-group">
        <h5>
          <span>Email:</span>
        </h5>
        <h5>{user.user.email}</h5>
      </div>
      <button className="btn" onClick={() => navigate("/profile/edit")}>
        Edit Profile
      </button>
    </div>
  );
};

export default Profile;
