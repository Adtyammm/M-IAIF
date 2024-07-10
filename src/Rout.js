import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./page/Auth/Login";
import Register from "./page/Auth/Register";
import Home from "./page/Home/Home";
import News from "./page/News/News";
import DataNews from "./page/components/DataNews";
import Discover from "./page/Discover/Discover";
import Survey from "./page/Survey/Survey";
import About from "./page/About/About";
import Profile from "./page/User/Profile";
import Header from "./page/components/Header";
import DataSurvey from "./page/components/DataSurvey";
import NewPost from "./page/Discover/NewPost";
import SliderComponent from "./page/components/SliderComponent";
import DetailStrukturOrganisasi from "./page/DetailStrukturOrganisasi/DetailStrukturOrganisasi";

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
        <Route path="/survey" element={<Survey />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/header" element={<Header />} />
        <Route path="/datasurvey" element={<DataSurvey />} />
        <Route path="/newpost" element={<NewPost />} />
        <Route path="/slider" element={<SliderComponent />} />
        <Route path="/organisasi" element={<DetailStrukturOrganisasi />} />
      </Routes>
    </>
  );
};

export default Rout;
