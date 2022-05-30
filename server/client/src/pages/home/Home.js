import React from "react";
import CardItemsList from "../../components/cardItemsList/CardItemsList";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <button className="btn home-btn">
        <h5>New Plan?</h5>
      </button>
      <CardItemsList />
    </div>
  );
};

export default Home;
