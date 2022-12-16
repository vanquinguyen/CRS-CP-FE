import React from "react";
import BookDriverPage from "../components/BookDriverPage";
import { withHeaderHOC } from "../components/Header/withHeaderHOC";

const BookDriver = () => {
  return (
    <div>
      <BookDriverPage />
    </div>
  );
};

export default withHeaderHOC(BookDriver);
