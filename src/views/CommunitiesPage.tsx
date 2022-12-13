import React from "react";
import { Routes, Route } from "react-router-dom";

import SportsCom from "./Communities/SportsCom";

const CommunitiesPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/sports" element={<SportsCom />} />
    </Routes>
  );
};

export default CommunitiesPage;
