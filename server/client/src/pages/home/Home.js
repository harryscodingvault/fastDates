import React from "react";
import CardItemsList from "../../components/cardItemsList/CardItemsList";
import "./Home.css";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((store) => store.user);

  return (
    <div className="home-container">
      {user && (
        <button className="btn home-btn">
          <h5>New Plan?</h5>
        </button>
      )}
      <CardItemsList />
    </div>
  );
};

export default Home;
