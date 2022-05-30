import React from "react";
import "./CardItemsList.css";

import CardItem from "../cardItem/CardItem";
import { travels } from "../../data/data";

const CardItemsList = () => {
  const renderList = travels.map((item) => (
    <CardItem data={item} key={item.id} />
  ));

  return <div className="cardItemsList-container">{renderList}</div>;
};

export default CardItemsList;
