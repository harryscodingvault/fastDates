import React, { useEffect, useRef } from "react";
import "./CardItemsList.css";
import { useDispatch, useSelector } from "react-redux";

import CardItem from "../cardItem/CardItem";

import {
  getAllPlans,
  getUserPlans,
  refreshPlansList,
} from "../../features/plans/planSlice";

const CardItemsList = ({ plans }) => {
  const { success_message, refresh_plans } = useSelector((store) => store.plan);
  const dispatch = useDispatch();
  const thisRef = useRef();

  const onScroll = () => {
    const { scrollTop, scrollHeight, clientHeight } = thisRef?.current;
    console.log(scrollTop, scrollHeight, clientHeight, "height");
    if (scrollTop + clientHeight === scrollHeight) {
      console.log("reached bottom");
    }
  };

  const listPlans = plans?.map((plan, index) => {
    if (Object.keys(plan).length !== 0 && plan !== undefined) {
      return <CardItem data={plan} key={index} />;
    }
  });
  if (!plans.length) {
    return (
      <div className="cardItemsList-container">
        <h5>No plans to show</h5>
      </div>
    );
  }

  return plans ? (
    <div
      className="cardItemsList-container"
      ref={thisRef}
      onScroll={() => onScroll()}
    >
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
