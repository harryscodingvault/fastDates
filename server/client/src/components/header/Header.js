import React from "react";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../features/user/userSlice";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  return (
    <div className="header-container">
      <div className="title" onClick={() => navigate("/")}>
        <h2> FastDates </h2>
      </div>
      {user && (
        <div className="header-nav" onClick={() => navigate("/profile")}>
          <h5>Profile</h5>
        </div>
      )}
      {user ? (
        <div className="header-nav" onClick={() => dispatch(logoutUser())}>
          <h5>Logout</h5>
        </div>
      ) : (
        <div className="header-nav" onClick={() => navigate("/login")}>
          <h5>Login</h5>
        </div>
      )}
    </div>
  );
};

export default Header;
