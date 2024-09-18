import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import Users from "./pages/admin/Users";
import Collector from "./pages/admin/Collector";
import Register from './pages/Register';
import Login from './pages/Login';
import { useSelector } from "react-redux";
import Spinner from "./components/Spinner";
import "antd/dist/reset.css";
import Protectedroutes from "./components/Protectedroutes";
import PublicRoute from "./components/PublicRoute";
import Apply from "./pages/Apply";
import NotificationPage from "./pages/NotificationPage";
import Profile from "./pages/collector/Profile";
import EwasteCollection from "./pages/EwasteCollection";
import BookCollectorforuser from "./pages/admin/BookCollectorforuser";

function App() {
  const { loading } = useSelector(state => state.alerts);

  return (
    <>
      <Router>
        {loading ? (
          <Spinner />
        ) : (
          <Routes>
            <Route
              path="/"
              element={
                <Protectedroutes>
                  <HomePage />
                </Protectedroutes>
              }
            />
              <Route
              path="/admin/user"
              element={
                <Protectedroutes>
             <Users></Users>
                </Protectedroutes>
              }
            />

             <Route
              path="/admin/collector"
              element={
                <Protectedroutes>
             <Collector></Collector>
                </Protectedroutes>
              }
            />
            
            <Route
              path="/admin/allocatecollector"
              element={
                <Protectedroutes>
            <BookCollectorforuser></BookCollectorforuser>
                </Protectedroutes>
              }
            />
             <Route
              path="/apply-collection"
              element={
                <Protectedroutes>
               <Apply></Apply>
                </Protectedroutes>
              }
            />
             <Route
              path="/ewaste-collection"
              element={
                <Protectedroutes>
             <EwasteCollection></EwasteCollection>
                </Protectedroutes>
              }
            />
      <Route
              path="/notification"
              element={
                <Protectedroutes>
            <NotificationPage></NotificationPage>
                </Protectedroutes>
              }
            />
      <Route
              path="/collector/profile/:id"
              element={
                <Protectedroutes>
          <Profile></Profile>
                </Protectedroutes>
              }
            />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />
          </Routes>
        )}
      </Router>
    </>
  );
}

export default App;
