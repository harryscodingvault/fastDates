import React from "react";
import "./CardItemsList.css";
import { useSelector } from "react-redux";

import CardItem from "../cardItem/CardItem";

const CardItemsList = ({ plans }) => {
  const { success_message } = useSelector((store) => store.plan);

  const listPlans = plans
    ?.filter((plan) => {
      return Object.keys(plan).length !== 0 && plan !== undefined;
    })
    .map((plan, index) => {
      return <CardItem data={plan} key={index} />;
    });

  if (!plans.length) {
    return (
      <div className="cardItemsList-container">
        <h5>No plans to show</h5>
      </div>
    );
  }

  return plans ? (
    <div className="cardItemsList-container">
      {success_message.origin === "deletePlan" && (
        <div className="alert alert-success">{success_message.message}</div>
      )}
      {listPlans}
    </div>
  ) : (
    <div className="cardItemsList-container">
      <div className="spinner"></div>
    </div>
  );
};

export default CardItemsList;
