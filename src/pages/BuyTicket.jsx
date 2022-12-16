import React from "react";
import BuyTicketPage from "../components/BuyTicketPage";
import { withHeaderHOC } from "../components/Header/withHeaderHOC";

const BuyTicket = () => {
  return <BuyTicketPage />;
};

export default withHeaderHOC(BuyTicket);
