import Nav from "./components/Nav";
import SearchBox from "./components/SearchBox";
import BookDisplay from "./pages/BookDisplay";
import CreateBook from "./pages/CreateBook";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  const user = "";
  return (
    <>
      <Nav />
      <SearchBox />
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/:username/home" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/:username/home" /> : <Register />}
        /> 
        <Route path="/:username/home" element={<Home />} />
        <Route path="/:username/explore" element={<Explore />} />
        <Route path="/:username/:bookname" element={<BookDisplay />} />
        <Route path="/:username/createbook/" element={<CreateBook />} />
      </Routes>
    </>
  );
}

export default App;
