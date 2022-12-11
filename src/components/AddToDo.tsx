import { Fragment } from "react";

interface IProps {
  click: (e: React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}

const AddTodo: React.FC<IProps> = ({ click }) => {
  return (
    <Fragment>
      <div
        className="card m-3"
        style={{ width: "30%", backgroundColor: "aquamarine" }}
        onClick={click}
      >
        <div className="card-body addTodo">
          <h1 className="card-text">+</h1>
        </div>
      </div>
    </Fragment>
  );
};

export default AddTodo;
