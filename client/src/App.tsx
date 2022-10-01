import React from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import { initializeApp } from "firebase/app";
import { setPersistence, getAuth, inMemoryPersistence } from "firebase/auth";
import { useLogin, LoadingScreen, AuthProvider } from "@hex-labs/core";
import Feed from "./components/feed/Feed";
import EditProfile from "./components/profile/EditProfile";
import TeamPage from "./components/team/TeamPage";

export const app = initializeApp({
  apiKey: "AIzaSyCsukUZtMkI5FD_etGfefO4Sr7fHkZM7Rg",
  authDomain: "auth.hexlabs.org",
});

setPersistence(getAuth(app), inMemoryPersistence);
axios.defaults.withCredentials = true;

const App: React.FC = () => {
  const [loading, loggedIn] = useLogin(app);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!loggedIn) {
    window.location.href = `https://login.hexlabs.org?redirect=${window.location.href}`;
    return <LoadingScreen />;
  }

  return (
    <AuthProvider app={app}>
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/edit-profile" element={<EditProfile />} />
        <Route path="/team/:teamId" element={<TeamPage />} />
      </Routes>
    </AuthProvider>
  );
};

export default App;
