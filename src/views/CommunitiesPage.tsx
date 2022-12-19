import React from "react";
import { Routes, Route } from "react-router-dom";

//COMMUNITY PAGES
import SportsCom from "./Communities/SportsCom";
import PoliticsCom from "./Communities/PoliticsCom";
import MusicCom from "./Communities/MusicCom";
import NewsCom from "./Communities/NewsCom";
import MoviesCom from "./Communities/MoviesCom";
import TechCom from "./Communities/TechCom";

//TS
import { IPost } from "./MainFeed";
import { IUser } from "../App";

interface IProps {
  userInfo: IUser;
  darkMode: boolean;
  data: IPost[];
  fetchData: () => void;
}

const CommunitiesPage: React.FC<IProps> = ({
  data,
  userInfo,
  darkMode,
  fetchData,
}) => {
  return (
    <Routes>
      <Route
        path="/sports"
        element={
          <SportsCom
            data={data}
            userInfo={userInfo}
            darkMode={darkMode}
            fetchData={fetchData}
          />
        }
      />
      <Route path="/pol" element={<PoliticsCom />} />
      <Route path="/music" element={<MusicCom />} />
      <Route path="news" element={<NewsCom />} />
      <Route path="/movies" element={<MoviesCom />} />
      <Route path="/tech" element={<TechCom />} />
    </Routes>
  );
};

export default CommunitiesPage;
