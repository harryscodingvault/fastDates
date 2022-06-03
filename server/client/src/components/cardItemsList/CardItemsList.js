import React, { useEffect } from "react";
import "./CardItemsList.css";
import { useDispatch, useSelector } from "react-redux";

import CardItem from "../cardItem/CardItem";
import { travels } from "../../data/data";
import { getAllPlans } from "../../features//plans/planSlice";

const CardItemsList = () => {
  const { isLoading, error_message, plans } = useSelector(
    (store) => store.plan
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPlans());
  }, []);

  const listPlans = plans?.map((plan) => (
    <CardItem data={plan} key={plan.plan_id} />
  ));
  if (!plans.length) {
    return (
      <div className="cardItemsList-container">
        <h5>Not jobs to display</h5>
      </div>
    );
  }

  return plans ? (
    <div className="cardItemsList-container">{listPlans}</div>
  ) : (
    <div className="cardItemsList-container">
      <div className="spinner"></div>
    </div>
  );
};

export default CardItemsList;
