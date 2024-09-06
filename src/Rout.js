import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "./page/About/About";
import Login from "./page/Auth/Login";
import Register from "./page/Auth/Register";
import DataNews from "./page/components/DataNews";
import DataSurvey from "./page/components/DataSurvey";
import Header from "./page/components/Header";
import SliderComponent from "./page/components/SliderComponent";
import DetailStrukturOrganisasi from "./page/DetailStrukturOrganisasi/DetailStrukturOrganisasi";
import DetailDiscover from "./page/Discover/DetailDiscover";
import Discover from "./page/Discover/Discover";
import NewDiscover from "./page/Discover/NewDiscover";
import Home from "./page/Home/Home";
import News from "./page/News/News";
import Survey from "./page/Survey/Survey";
import Profile from "./page/User/Profile";

const Rout = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<DataNews />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover/:id" element={<DetailDiscover />} />
        <Route path="/survey" element={<Survey />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/header" element={<Header />} />
        <Route path="/datasurvey" element={<DataSurvey />} />
        <Route path="/newpost" element={<NewDiscover />} />
        <Route path="/slider" element={<SliderComponent />} />
        <Route path="/organisasi" element={<DetailStrukturOrganisasi />} />
      </Routes>
    </>
  );
};

export default Rout;
