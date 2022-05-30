import React from "react";
import "./Error.css";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <h2>Wrong way!</h2>
      <h5>Nothing to see in here</h5>
      <button className="btn" onClick={() => navigate("/")}>
        Go home
      </button>
    </div>
  );
};

export default Error;
