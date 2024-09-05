import Nav from "./components/Nav";
import SearchBox from "./components/SearchBox";
import BookDisplay from "./pages/BookDisplay";
import CreateBook from "./pages/CreateBook";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import ForgotPwd from "./pages/ForgotPwd";
import ErrorPage from "./pages/ErrorPage";
import NotFound from "./pages/NotFound";

function App() {
  const user = useAuthStore((state) => state.user);

  return (
    <>
      <Nav />
      <SearchBox />
      <Routes>
        <Route
          path="/login"
          element={
            user ? <Navigate to={`/${user?.username}/home`} /> : <Login />
          }
        />

        <Route
          path="/register"
          element={
            user ? <Navigate to={`/${user?.username}/home`} /> : <Register />
          }
        />

        <Route path="/forgot-password" element={<ForgotPwd />} />

        <Route path="/:username/home" element={<Home />} />
        <Route path="/:username/explore" element={<Explore />} />
        <Route path="/:username/book/:bookname" element={<BookDisplay />} />
        <Route path="/:username/createbook" element={<CreateBook />} />

        <Route path="*" element={user ? <NotFound /> : <ErrorPage />} />
      </Routes>
    </>
  );
}

export default App;
