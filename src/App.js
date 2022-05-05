import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Movies from "./components/Movies";
import AddMovie from "./components/AddMovie";
import EditMovie from "./components/EditMovie";
import Members from "./components/Members";
import EditMember from "./components/EditMember";
import AddMember from "./components/AddMember";
import SpecificMovie from "./components/SpecificMovie";
import Register from "./components/Register";
import "./App.css";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/homepage" element={<HomePage />}>
          <Route path="movies" element={<Movies />} />
          <Route path="addmovie" element={<AddMovie />} />
          <Route path="editmovie/:id" element={<EditMovie />} />
          <Route path="members" element={<Members />} />
          <Route path="editmember/:id" element={<EditMember />} />
          <Route path="addmember" element={<AddMember />} />
          <Route path="movie/:id" element={<SpecificMovie />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
