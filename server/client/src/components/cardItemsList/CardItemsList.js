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

  useEffect(() => {}, []);

  const renderList = travels.map((item) => (
    <CardItem data={item} key={item.id} />
  ));

  return <div className="cardItemsList-container">{renderList}</div>;
};

export default CardItemsList;
