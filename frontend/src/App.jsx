import Nav from "./components/Nav";
import SearchBox from "./components/SearchBox";
import BookDisplay from "./pages/BookDisplay";
import CreateBook from "./pages/CreateBook";
import Explore from "./pages/Explore";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <Nav />
      <SearchBox />
      <Routes>
        <Route path="/:username" element={<Home />} />
        <Route path="/:username/explore" element={<Explore />} />
        <Route path="/:username/:bookname" element={<BookDisplay />} />
        <Route path="/:username/createbook/" element={<CreateBook />} />
      </Routes>
    </>
  );
}

export default App;
