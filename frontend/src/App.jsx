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
        <Route path="/decider" element={<Home />} />
        <Route path="/decider/explore" element={<Explore />} />
        <Route path="/decider/:bookname" element={<BookDisplay />} />
        <Route path="/decider/createbook/" element={<CreateBook />} />
      </Routes>
    </>
  );
}

export default App;
