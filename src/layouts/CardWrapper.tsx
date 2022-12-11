import React from "react";

interface IProps {
  children: React.ReactNode;
}

const CardWrapper: React.FC<IProps> = ({ children }) => {
  return (
    <div className="row">
      <div className="col-6 offset-3">{children}</div>
    </div>
  );
};

export default CardWrapper;
