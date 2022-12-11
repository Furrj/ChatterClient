import React, { Fragment } from "react";

import { ITodo } from "../views/MyTodos";
import Todo from "./Todo";

interface IProps {
  data: ITodo[];
  renderAgain: () => void;
  userID: string;
}

const Listings: React.FC<IProps> = ({ data, renderAgain, userID }) => {
  const createTodos = (): JSX.Element[] => {
    return data.map((el) => {
      return (
        <Todo
          key={el._id}
          todo={el}
          renderAgain={renderAgain}
          userID={userID}
        />
      );
    });
  };

  return <Fragment>{createTodos()}</Fragment>;
};

export default Listings;
