import React from "react";
import { Routes, Route } from "react-router-dom";
import Content from "./components/auth/Content";

const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Content />} />
    </Routes>
  );
};

export default App;
