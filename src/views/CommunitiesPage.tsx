import React from "react";
import { Routes, Route } from "react-router-dom";

//COMMUNITY PAGES
import SportsCom from "./Communities/SportsCom";
import PoliticsCom from "./Communities/PoliticsCom";
import MusicCom from "./Communities/MusicCom";
import NewsCom from "./Communities/NewsCom";
import MoviesCom from "./Communities/MoviesCom";
import TechCom from "./Communities/TechCom";

const CommunitiesPage: React.FC = () => {
  return (
    <Routes>
      <Route path="/sports" element={<SportsCom />} />
      <Route path="/pol" element={<PoliticsCom />} />
      <Route path="/music" element={<MusicCom />} />
      <Route path="news" element={<NewsCom />} />
      <Route path="/movies" element={<MoviesCom />} />
      <Route path="/tech" element={<TechCom />} />
    </Routes>
  );
};

export default CommunitiesPage;
