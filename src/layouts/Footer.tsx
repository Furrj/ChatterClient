import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className={`footer bg-dark py-2 fixed-bottom`}>
      <div className={`container`}>
        <span className="text-info">
          <span className="me-2">&copy;2022</span>Jackson Furr
        </span>
      </div>
    </footer>
  );
};

export default Footer;
